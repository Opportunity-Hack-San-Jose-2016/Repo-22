var Request = require('../models/requestModel'); 
var validator = require('validator'); // for data validator
var errorResponse = require('./errorResponse');

module.exports = function(app){


/*	Create service request
	URL: localhost:3000/api/makeRequest
	Type : POST
	Post JSON Data : 
				{
				    "request":{
				        "long" : "-77.037852",
				    	"lat" : "38.898556",
				        "refugeeId":"un234",
				        "ip":"123.123.123.123",
				        "requiredService":["health","food"],
				        "requestComment":"Some comment for this requesy"    
				    }
				}
	
	Response : 
				{
				  "__v": 0,
				  "long": "-77.037852",
				  "lat": "38.898556",
				  "createdBy": "un234",
				  "ip": "",
				  "requestComment": "Some comment for this requesy",
				  "dateAccepted": null,
				  "dateFinished": null,
				  "assignedOrganization": "",
				  "assignedVolunteer": "",
				  "_id": "578215f86dfe8d5c1e140064",
				  "dateAdded": "2016-07-10T09:31:36.046Z",
				  "status": "pending",
				  "servicesRequired": [
				    "health",
				    "food"
				  ],
				  "id": "ceeecc4d-c2c8-4fd6-bbc8-d96e6399b464"
				}
*/


	app.post('/api/makeRequest', function(req, res){

		if((req.body.request.long == null) ||
		   (req.body.request.lat == null) ||
		   (req.body.request.refugeeId == null)) {
			res.status(200).json({status:"Missing data for the request."});
		}
		console.log(req.body.request.requiredService[0]);
		var servicesRequiedArr = req.body.request.requiredService;
		var servicesArr = []
		for (var i =0; i < servicesRequiedArr.length; i++) {
			servicesArr.push(servicesRequiedArr[i]);
		}
		console.log(servicesArr);

		var newRequest = new Request({
			long : req.body.request.long,
			lat : req.body.request.lat,
			createdBy : req.body.request.refugeeId,
			ip : (req.body.request.ip == null) ? "" : req.body.request.ip,
			servicesRequired : req.body.request.requiredService,
			requestComment : (req.body.request.requestComment == null) ? "" : req.body.request.requestComment,
			status : "pending",
			dateAccepted : "",
			dateFinished : "",
			assignedOrganization : "",
			assignedVolunteer : "",
		});
		console.log("e");
		newRequest.save(function(err, doc) {
			console.log(err);
			//If the name is not unique then
            if(err) return res.status(400).json(errorResponse(err.errmsg, 400));
            console.log("request saved successfully");
        	return res.status(200).json(doc);
        });

        //res.status(200).json();
	});


/*	Get all requests
	URL: localhost:3000/api/requests
	Type : GET
	
	Response : 
				[
				  {
				    "id": "ceeecc4d-c2c8-4fd6-bbc8-d96e6399b464",
				    "long": "-77.037852",
				    "lat": "38.898556",
				    "createdBy": "un234",
				    "ip": "",
				    "servicesRequired": [
				      "health",
				      "food"
				    ],
				    "requestComment": "Some comment for this requesy",
				    "status": "pending",
				    "dateAdded": "2016-07-10T09:31:36.046Z",
				    "dateAccepted": null,
				    "dateFinished": null,
				    "assignedOrganization": "",
				    "assignedVolunteer": ""
				  },
				  {
				    "id": "425f5106-06ac-41ea-afab-5dd413c8f019",
				    "long": "-77.037852",
				    "lat": "38.898556",
				    "createdBy": "un234",
				    "ip": "",
				    "servicesRequired": [
				      "food"
				    ],
				    "requestComment": "Some comment for this requesy",
				    "status": "pending",
				    "dateAdded": "2016-07-10T10:00:17.516Z",
				    "dateAccepted": null,
				    "dateFinished": null,
				    "assignedOrganization": "",
				    "assignedVolunteer": ""
				  }, ...
				]
*/


	app.get('/api/requests', function(req, res){

		Request.find({}, function(err, requests){

			if(err) return res.status(404).json(errorResponse("error searching data", 404));;

			var serviceArr = [];

			//creating JSON for each boat data to push in to boatsArr
			for (var i = 0; i < requests.length; i++) {
			    var service = {
			    	id : requests[i].id,
					long : requests[i].long,
					lat : requests[i].lat,
					createdBy : requests[i].createdBy,
					ip : requests[i].ip,
					servicesRequired : requests[i].servicesRequired,
					requestComment : requests[i].requestComment,
					status : requests[i].status,
					dateAdded: requests[i].dateAdded,
					dateAccepted : requests[i].dateAccepted,
					dateFinished : requests[i].dateFinished,
					assignedOrganization : requests[i].assignedOrganization,
					assignedVolunteer : requests[i].assignedVolunteer,
			    };

			    serviceArr.push(service);
			}
			return res.status(200).json(serviceArr);
		});

	});

/*	processRequest
	URL: localhost:3000/api/processRequest
	Type : POST
	Post JSON Data : 
				{
				    "processRequest":{
				        "reqId" : "ceeecc4d-c2c8-4fd6-bbc8-d96e6399b464",
				    	"volunteerId" : "425f5837-06ac-41ea-owgj-5dd6s9h5f019"
				    }
				}
	
	Response : 

				{
				  "status": "success"
				}
				
*/

	app.put('/api/processRequest', function(req, res){

		if((req.body.processRequest.volunteerId == null) ||
		   (req.body.processRequest.reqId == null)) {
			res.status(200).json({status:"Missing data for the request."});
		}

		Request.findOne({id : req.body.processRequest.reqId}, function(err, doc){
				doc.dateAccepted = new Date();
				doc.assignedVolunteer = req.body.processRequest.volunteerId;
				doc.status = "processing";
				doc.save();
				return res.status(200).json({status:"success"});
		});
	});

/*	completeRequest
	URL: localhost:3000/api/completeRequest
	Type : POST
	Post JSON Data : 
				{
				    "complete":{
				        "reqId" : "ceeecc4d-c2c8-4fd6-bbc8-d96e6399b464"
				    }
				}
	
	Response : 

				{
				  "status": "success"
				}
				
*/

	app.put('/api/completeRequest', function(req, res){

		if((req.body.completeRequest.reqId == null)) {
			res.status(200).json({status:"Missing data for the request."});
		}

		Request.findOne({id : req.body.completeRequest.reqId}, function(err, doc){
				doc.dateFinished = new Date();
				doc.status = "completed";
				doc.save();
				return res.status(200).json({status:"success"});
		});
	});

}