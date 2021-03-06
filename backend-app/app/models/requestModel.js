var mongoose = require('mongoose');
var uuid = require('node-uuid');
var Schema = mongoose.Schema;

var schema = new Schema({

	id : { type : String, default : function(){ return uuid(); }},
	long : { type: String, required : true},
	lat : { type: String, required : false},
	createdBy : { type: String, required : false},
	ip : {type : String},
	servicesRequired : [{type:String}],
	requestComment : {type: String, required: false},
	status : {type : String, required: true, default: "Pending"},
	dateAdded: {type: Date, required : true, default: function() {return new Date();}},
	dateAccepted : {type: Date, required:false },
	dateFinished : {type:Date, required: false},
	assignedOrganization : {type : String, required: false},
	assignedVolunteer : {type : String, required: false},

}, { strict : false});


var requestModel = mongoose.model('Request', schema);

module.exports = requestModel;