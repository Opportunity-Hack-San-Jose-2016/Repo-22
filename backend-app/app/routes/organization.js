/*
Router for 'volunteer'.
It handles the requests for
(1) Creating a new refugee - /api/boats - POST
(2) Retrieving all boats - /api/boats - GET
*/

var Organization = require('../models/organizationModel'); //to use boats schema
var Service = require('../models/serviceModel');
var validator = require('validator'); // for data validator
var errorResponse = require('./errorResponse');
var redisClient = require('../routes/redisConn');
var jwt = require('jsonwebtoken');

module.exports = function(app){

    app.post('/api/organizations/create', function(req, res){

        //parse request body
        var input = req.body.organization;
        
        var orgName = req.body.organization.name;
        var orgLocations = req.body.organization.locations;
        var orgServices = req.body.organization.services;
        var contactPerson = req.body.organization.contactPerson;
        var contactNumber = req.body.organization.contactNumber;
        var email = req.body.organization.email;

        //Validate if request body is not malfunctioned json
        if(input)
        {
            //store in the database

            if((validator.isNull(orgName))) 
              // || (validator.isNull(orgLocations))
              // || (validator.isNull(orgService)))
            {
              return res.status(422).json(errorResponse("Missing data for the request.", 503));
            }

            var organization = new Organization({
              name : orgName,
              services : orgServices,
              locations : orgLocations,
              email: email,
              contactPerson : contactPerson,
              contactNumber : contactNumber,
            });

            organization.save(function(err, doc) {
              if(err) return res.status(500).json(errorResponse(err, 500));
              res.status(201).json({status:"true"});
            });
        } else {
          return res.status(422).json(errorResponse("error parsing data", 422));
        }
    });

    app.post('/api/organizations/signIn', function(req,res){

        if(!req.body.name){
            return res.status(400).json(errorResponse('name is required!', 400));
        }
        if(!req.body.password){
            return res.status(400).json(errorResponse('password  required!', 400));
        }
        console.log(req.body.name);
        Organization.findOne({ name : req.body.name}, function(error, data){
                console.log(data);
                if(error) return res.status(503).json(errorResponse(error, 503));;
                if(data !== null){

                    if(req.body.password == data.password){
                        var myToken = jwt.sign({ username : req.body.name }, 'Medair help app');

                        redisClient.get(data.name, function(err,datareply){

                            if(datareply!==null) {
                                return res.status(200).json({token:datareply, id:data.name});
                            }
                            else {
                                redisClient.set(data.name, myToken, function(err,reply){
                                    console.log("reply from redis -> "+reply);
                                    if(reply!=null) {
                                       return res.status(200).json({token:myToken, userid:data.name});
                                    }
                                    else {
                                        return res.status(503).json(errorResponse('Redis Service is unavailable', 503));
                                    }
                                });
                            } 
                        });

                    }
                }
            else
                return res.status(401).json(errorResponse('Invalid Input!', 401));
            });
    });

    app.put('/api/organizations/:name/logout', function(req, res) {
        var name = req.params.name;

        redisClient.del(name, function(err, reply) {
            if(err) return res.status(401).json(errorResponse('Invalid Input!', 401));
            else {
                return res.status(200).json({logout:"true"});
            }
        });
    });

    app.get('/api/organizations/getAll', function(req, res){
      Organization.find({}, function(err, docs) {

        var organizations = [];

        for (var i = 0; i < docs.length; i++) {
          var org = {
            name : docs[i].name,
            locations : docs[i].locations,
            services : docs[i].services,
            contactPerson:docs[i].contactPerson,
            contactNumber:docs[i].contactNumber,
            email:docs[i].email,
            org:docs[i].id
            };

          organizations.push(org);
        }
        return res.status(200).json(organizations);       
      });
    });

}