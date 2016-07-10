/*
Router for 'users'.
It handles the requests for
(1) Creating a new refugee - /api/boats - POST
(2) Retrieving all boats - /api/boats - GET
*/

var Volunteer = require('../models/volunteerModel'); //to use boats schema
// var validator = require('validator'); // for data validator
var errorResponse = require('./errorResponse');

module.exports = function(app){

    app.post('/api/volunteer/create', function(req, res){

        //validating Parameters

        // var body = JSON.parse(req.body.volunteer);
        var body = req.body.volunteer;

        if(body) {

            var newVolunteer = new Volunteer({
                id : body.id,
                username : body.username,
                Name : body.name,
                organizationId : body.organizationId,
                contactNumber : body.contactNumber,
            });
            console.log("Now creating a record");
            newVolunteer.save(function(err, doc) {
                if(err) return err;
                return res.status(201).json(doc);
            });

        } else {
            return res.status(422).json(errorResponse("error parsing data", 503));
        }
    });


}