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

		//API to create new boats for Piranha View.
		/*	
			Parameters:
				boat[capacity]
					The number of passengers the boat can carry
					Example: 8
				boat[name]
					The name of the boat
					Example: "Amazon Express"
			Output:
				The created boat in JSON format, with the fields above plus a unique ID
				Example: { id: def456, capacity: 8, name: "Amazon Express" } 
			Constraints :
				boat name should be unique
		*/

		//validating Parameters

		var input = JSON.parse(req.body.refugee);

		if(input.isValid()) {
			//store in the database
			console.log("Database store has been called");
/*
			if((req.body.refugee.id) ||
			   () ||
			   () ||
			   () ||
			   () ||)*/

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


	app.get('/api/boats', function(req, res){
			//API to find all boats

			/*			
				Parameters:
					none
				Output:
					An array of boats in JSON format, in the same format as above
					Example: [{ id: def456, capacity: 8, name: "Amazon Express" }, ...]
			*/

			boat.find({}, function(err, boats){
				if(!err){
					//console.log(docs);

					//building JSON response to sent.
					var boatsArr = [];

					//creating JSON for each boat data to push in to boatsArr
					for (var i = 0; i < boats.length; i++) {
					    var boatStr = {
					    	id : boats[i].id,
					    	capacity : boats[i].capacity,
					    	name : boats[i].name 
					    };

					    boatsArr.push(boatStr);
					}
					//returning data to the client
					return res.status(200).json(boatsArr);
				} else {

					return res.status(500).json(errorResponse(err.errmsg, 500));
				}
				
			});
	});
}