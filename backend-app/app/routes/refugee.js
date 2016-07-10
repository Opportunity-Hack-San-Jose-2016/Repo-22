var Refugee = require('../models/refugeeModel'); 
var validator = require('validator'); // for data validator
var errorResponse = require('./errorResponse');
var redisClient = require('../routes/redisConn');
var jwt = require('jsonwebtoken');

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
	        	return res.status(200).json(doc);
	        });

			
		} else {
			return res.status(200).json({error:"error parsing data"});
		}
	});


    app.post('/api/refugee/signIn', function(req,res){

        if(!req.body.id){
            return res.status(400).json(errorResponse('id required!', 400));
        }
        if(!req.body.password){
            return res.status(400).json(errorResponse('password  required!', 400));
        }

        Refugee.findOne({ id : req.body.id }, function(error, data){

                if(error) return res.status(503).json(errorResponse(error, 503));;

                if(data !== null){

                    if(req.body.password == data.password){
                        var myToken = jwt.sign({ username : req.body.id }, 'Medair help app');

                        redisClient.get(data.id, function(err,datareply){

                            if(datareply!==null) {
                                return res.status(200).json({token:datareply, id:data.id});
                            }
                            else {
                                redisClient.set(data.id, myToken, function(err,reply){
                                    console.log("reply from redis -> "+reply);
                                    if(reply!=null) {
                                       return res.status(200).json({token:myToken, userid:data.id});
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

    app.put('/api/refugee/:id/logout', function(req, res) {
        var id = req.params.id;

        redisClient.del(id, function(err, reply) {
            if(err) return res.status(401).json(errorResponse('Invalid Input!', 401));
            else {
                return res.status(200).json({logout:"true"});
            }
        });
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