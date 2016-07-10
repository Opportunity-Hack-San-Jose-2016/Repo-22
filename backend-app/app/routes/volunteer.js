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
                username : body.username,
                Name : body.name,
                organizationId : body.organizationId,
                contactNumber : body.contactNumber,
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