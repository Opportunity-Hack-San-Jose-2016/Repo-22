var Service = require('../models/serviceModel'); 
var validator = require('validator'); // for data validator
var errorResponse = require('./errorResponse');


module.exports = function(app){


/*	Create service request
	URL: localhost:3000/api/service/create
	Type : POST
	Post JSON Data : 
				{
				   "service": {
				               "serviceName":"un21",
				               "serviceDesc":"s",
				               "img":""
				               }
				} 
	
	Response : 
				{
				  "__v": 0,
				  "serviceName": "un21",
				  "serviceDesc": "s",
				  "img": "",
				  "_id": "5781e7b11c611e3433854001",
				  "id": "dde4a1f5-bf8b-4531-ada2-c31f1adbca06"
				}
*/


	app.post('/api/service/create', function(req, res){

		console.log("calling service create.");
		//validating Parameters
		console.log(req.body);
		var input = req.body;

		if(input){
			//store in the database
			console.log("Database store has been called");

			if((req.body.service.serviceName == null)) {
				res.status(200).json({status:"Missing data for the request."});
			}

			var newService = new Service({
				serviceName : req.body.service.serviceName,
				serviceDesc : req.body.service.serviceDesc,
				img : req.body.service.img,
			});

			newService.save(function(err, doc){
			
				//If the name is not unique then
	            if(err) return res.status(403).json(errorResponse(err.errmsg, 403));
	            console.log("Service saved successfully");
	        	res.status(200).json(doc);
	        });

			
		} else {
			res.status(200).json({error:"error parsing data"});
		}

	});


/*	Get all services
	URL: localhost:3000/api/services
	Type : GET
	
	Response : 
				[
				  {
				    "id": "9a6a6b87-aa03-4775-9d8f-e44ad1470b9c",
				    "serviceName": "un234",
				    "serviceDesc": "vis19",
				    "img": "Vis Brahmbhatt"
				  },
				  {
				    "id": "dde4a1f5-bf8b-4531-ada2-c31f1adbca06",
				    "serviceName": "un21",
				    "serviceDesc": "s",
				    "img": ""
				  }, ...
				]
*/


	app.get('/api/services', function(req, res){
		console.log("calling service get.");

		Service.find({}, function(err, services){

			if(err) return res.status(404).json(errorResponse("error searching data", 404));;

			var serviceArr = [];

			//creating JSON for each boat data to push in to boatsArr
			for (var i = 0; i < services.length; i++) {
			    var service = {
			    	id : services[i].id,
					serviceName : services[i].serviceName,
					serviceDesc : services[i].serviceDesc,
					img : services[i].img
			    };

			    serviceArr.push(service);
			}
			return res.status(200).json(serviceArr);
		});

	});
}