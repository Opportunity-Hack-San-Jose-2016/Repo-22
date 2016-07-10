/*
Router for 'users'.
It handles the requests for
(1) Creating a new refugee - /api/boats - POST
(2) Retrieving all boats - /api/boats - GET
*/

var refugee = require('../models/refugeeModel'); //to use boats schema
var validator = require('validator'); // for data validator
var errorResponse = require('./errorResponse');

module.exports = function(app){

	app.post('/api/organization/create', function(req, res){

		//validating Parameters

		var input = JSON.parse(req.body.refugee);

		if(input.isValid()) {
			//store in the database
			console.log("Database store has been called");

			if((req.body.organization.name == null) ||
			   (req.body.organization.locations == null) ||
			   (req.body.organization.serviceArr == null)) {
				res.status(200).json({status:"Missing data for the request."});
			}

			var locationArr = req.body.organization.locations;
			var servicesArr = req.body.organization.serviceArr;

			var organization = new Organization({
				name : req.body.organization.name,
				services : servicesArr,
				locations : locationArr,
				contactPerson : req.body.organization.contactPerson,
				contactNumber : req.body.organization.contactNumber,
			});

			res.status(200).json({status:"true"});
		} else {
			res.status(200).json({error:"error parsing data"});
		}

/*		if((req.body.boat.name == null) || (req.body.boat.capacity == null)){
			//standard response code is 422 but right now I am using 400 as of now.
			return res.status(400).json(errorResponse("Make sure all required parameters are included in the request...!", 400));
		} else {

			var newBoat = new boat({
			name : req.body.boat.name,
			capacity : req.body.boat.capacity,
			availCapacity : req.body.boat.capacity
			});

			//saving a boat
			newBoat.save(function(err){

				//If the name is not unique then
	            if(err) return res.status(503).json(errorResponse(err.errmsg, 503));
	            console.log("Boat "+ newBoat.name +" saved successfully");
	            return res.status(200).json({id:newBoat.id, capacity: newBoat.capacity, name: newBoat.name});
	        });
		}*/
	});

}