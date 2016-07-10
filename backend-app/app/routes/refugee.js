var Refugee = require('../models/refugeeModel'); 
var validator = require('validator'); // for data validator
var errorResponse = require('./errorResponse');

module.exports = function(app){

	app.post('/api/refugee/create', function(req, res){

		console.log("calling refugee create.");
		//validating Parameters
		console.log(req.body);
		var input = req.body;

		if(input){
			//store in the database
			console.log("Database store has been called");

			//Validation of Input is not done

			//Creating new Refugee object
			var newRefugee = new Refugee({
				id : req.body.refugee.id,
				firstname : req.body.refugee.firstname,
				lastname : req.body.refugee.lastname,
				age: req.body.refugee.age,
				// email : req.body.refugee.email,
				password : req.body.refugee.password,
				location : req.body.location,
				contactNumber : req.body.contactNumber,
				// familyId : req.body.familyId,
				// dateOfBirth : req.body.dob,
				age: req.body.refugee.age,
				gender : req.body.refugee.gender,
				disabled: req.body.refugee.isDisabled,
			});

			newRefugee.save(function(err, doc){
				//If the name is not unique then
	            if(err) return res.status(503).json(errorResponse(err, 503));
	            console.log("Refugee saved successfully");
	        	res.status(200).json(doc);
	        });

			
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