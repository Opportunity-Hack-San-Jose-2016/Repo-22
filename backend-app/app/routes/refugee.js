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



/*
	URL:http://localhost:3000/api/refugee/getAll
	Type: GET
	Response:

			[
			  {
			    "id": "un1235",
			    "firstName": "Vishv",
			    "lastname": "Brahmbhatt",
			    "age": "23",
			    "email": "",
			    "password": "somepass",
			    "location": {},
			    "contactNumber": "",
			    "dateAdded": null,
			    "gender": "male",
			    "disabled": false,
			    "role": "refugee"
			  }, ...
			]

*/

	app.get('/api/refugee/getAll', function(req, res){
      Refugee.find({}, function(err, refugees) {

        var RefugeeArr = [];

        for (var i = 0; i < refugees.length; i++) {
          var refugee = {
            id : refugees[i].id,
            firstName : refugees[i].firstname,
            lastname : refugees[i].lastname,
            age : refugees[i].age,
            email : refugees[i].email,
            password : refugees[i].password,
            location : refugees[i].location,
            contactNumber : refugees[i].contactNumber,
            dateAdded : refugees[i].dateAdded,
            gender : refugees[i].gender,
            disabled : refugees[i].disabled,
            role : refugees[i].role
            };

          RefugeeArr.push(refugee);
        }
        return res.status(200).json(RefugeeArr);       
      });
    });

}