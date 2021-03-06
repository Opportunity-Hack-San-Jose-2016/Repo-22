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

	app.post('/api/refugee/create', function(req, res){

		//validating Parameters

		var input = JSON.parse(req.body.refugee);

		if(input.isValid()) {
			//store in the database
			console.log("Database store has been called");

			if((req.body.refugee.id == null) ||
			   (req.body.refugee.name == null) ||
			   (req.body.refugee.password == null) ||
			   (req.body.familyId == null) ||
			   (req.body.dob == null) ||
			   (req.body.gender == null) ||
			   (req.body.isDisabled == null)) {
				res.status(200).json({status:"Missing data for the request."});
			}

			var newRefugee = new Refugee({
				id : req.body.refugee.id,
				name : req.body.refugee.name,
				email : req.body.refugee.email,
				password : req.body.refugee.password,
				locationid : req.body.locationid,
				phoneNume : req.body.phoneNume,
				familyId : req.body.familyId,
				dateOfBirth : req.body.dob,
				gender : req.body.gender,
				disabled: req.body.isDisabled,
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



	// volunteer
	app.post('/api/volunteer/create', function(req, res){

		//validating Parameters

		var input = JSON.parse(req.body.refugee);

		if(input.isValid()) {
			//store in the database
			console.log("Database store has been called");

			if((req.body.username == null) ||
			   (req.body.refugee.name == null) ||
			   (req.body.refugee.password == null) ||
			   (req.body.familyId == null) ||
			   (req.body.dob == null) ||
			   (req.body.gender == null) ||
			   (req.body.isDisabled == null)) {

				res.status(200).json({status:"Missing data for the request."});
			
			}


			var volunteer = new volunteer({

				username : req.body.username,
				Name : { type : String, required : true},
				organizationId : [{
					organizationId : {type:String},
				}],
				contactNumber : { type : String, required : true},

			});

			var newRefugee = new Refugee({
				id : req.body.refugee.id,
				name : req.body.refugee.name,
				email : req.body.refugee.email,
				password : req.body.refugee.password,
				locationid : req.body.locationid,
				phoneNume : req.body.phoneNume,
				familyId : req.body.familyId,
				dateOfBirth : req.body.dob,
				gender : req.body.gender,
				disabled: req.body.isDisabled,
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