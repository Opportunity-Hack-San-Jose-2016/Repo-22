var mongoose = require('mongoose');
var uuid = require('node-uuid');
var Schema = mongoose.Schema;

var schema = new Schema({
	id : { type : String, default : function(){ return uuid(); }},
	name : { type: String, required : true},
	services : [{
		serviceId : {type:String},
	}],
	locations : [{
		locationId : {type:String},
	}],
	contactPerson : { type: String, required : false, unique : true},
	contactNumber : { type : String, required : true},
}, { strict : false});

var organizationModel = mongoose.model('Organization', schema);

module.exports = organizationModel;