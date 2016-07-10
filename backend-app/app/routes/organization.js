/*
Router for 'users'.
It handles the requests for
(1) Creating a new refugee - /api/boats - POST
(2) Retrieving all boats - /api/boats - GET
*/

var refugee = require('../models/refugeeModel'); //to use boats schema
var Service = require('../models/serviceModel');
var validator = require('validator'); // for data validator
var errorResponse = require('./errorResponse');

module.exports = function(app){

    app.post('/api/organizations/create', function(req, res){

        //parse request body
        var input = JSON.parse(req.body.refugee);
        
        var orgName = req.body.organization.name;
        var orgLocations = req.body.organization.locations;
        var orgServices = req.body.organization.serviceArr;
        var contactPerson = req.body.organization.contactPerson;
        var contactNumber = req.body.organization.contactNumber;
        var email = req.body.organization.email;

        //Validate if request body is not malfunctioned json
        if(validator.isNull(input)) 
        {
            //store in the database
            console.log("Database store has been called");

            if((validator.isNull(orgName)) ||
               (validator.isNull(orgLocations)) ||
               (validator.isNull(orgService)))
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

}