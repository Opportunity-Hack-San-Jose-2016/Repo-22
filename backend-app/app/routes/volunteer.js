/*
Router for 'users'.
It handles the requests for
(1) Creating a new refugee - /api/boats - POST
(2) Retrieving all boats - /api/boats - GET
*/

var Volunteer = require('../models/volunteerModel'); //to use boats schema
// var validator = require('validator'); // for data validator
var errorResponse = require('./errorResponse');
var redisClient = require('../routes/redisConn');
var jwt = require('jsonwebtoken');

module.exports = function(app){

    app.post('/api/volunteer/create', function(req, res){

        //validating Parameters

        // var body = JSON.parse(req.body.volunteer);
        var body = req.body.volunteer;

        if(body) {

            var newVolunteer = new Volunteer({
                email : body.email,
                Name : body.name,
                organizationId : body.organizationId,
                contactNumber : body.contactNumber,
                password: body.password
            });
            console.log("Now creating a record");
            newVolunteer.save(function(err, doc) {
                if(err) return res.status(422).json(errorResponse(err, 422));
                return res.status(201).json(doc);
            });

        } else {
            return res.status(422).json(errorResponse("error parsing data", 422));
        }
    });

    app.post('/api/volunteer/signIn', function(req,res){

        if(!req.body.email){
            return res.status(400).json(errorResponse('email required!', 400));
        }
        if(!req.body.password){
            return res.status(400).json(errorResponse('password  required!', 400));
        }

        Volunteer.findOne({ email : req.body.email }, function(error, data){

                if(error) return res.status(503).json(errorResponse(error, 503));;

                if(data !== null){

                    if(req.body.password == data.password){
                        var myToken = jwt.sign({ username : req.body.email }, 'Medair help app');

                        redisClient.get(data.id, function(err,datareply){

                            if(datareply!==null) {
                                return res.status(200).json({token:datareply, id:data.email});
                            }
                            else {
                                redisClient.set(data.email, myToken, function(err,reply){
                                    console.log("reply from redis -> "+reply);
                                    if(reply!=null) {
                                       return res.status(200).json({token:myToken, userid:data.email});
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

    app.put('/api/volunteer/:email/logout', function(req, res) {
        var email = req.params.email;

        redisClient.del(email, function(err, reply) {
            if(err) return res.status(401).json(errorResponse('Invalid Input!', 401));
            else {
                return res.status(200).json({logout:"true"});
            }
        });
    });
/*
    URL:http://localhost:3000/api/volunteer/getAll
    Type: GET
    Response:
        [
          {
            "id": "e6c09899-4cd6-4495-a4d1-e28a3f5f2284",
            "username": "",
            "password": "",
            "Name": "Vishv Brahmbhatt",
            "organizationId": "org1234",
            "contactNumber": "1234343434"
          }
        ]   

*/

    app.get("/api/volunteer/getAll/", function(req, res) {

        Volunteer.find({}, function(err, volunteers) {

            var volunteerArr = [];

            for (var i = 0; i < volunteers.length; i++) {
              var volunteer = {
                id : volunteers[i].id,
                username : volunteers[i].username,
                password : volunteers[i].password,
                Name : volunteers[i].Name,
                organizationId : volunteers[i].organizationId,
                contactNumber : volunteers[i].contactNumber,
                };

              volunteerArr.push(volunteer);
            }
        return res.status(200).json(volunteerArr);
                
        });
    });
}