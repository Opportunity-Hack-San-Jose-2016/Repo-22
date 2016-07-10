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
            email:docs[i].email
            };

          organizations.push(org);
        }
        return res.status(200).json(organizations);       
      });
    });

}