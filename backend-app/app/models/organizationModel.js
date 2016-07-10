var mongoose = require('mongoose');
var uuid = require('node-uuid');
var Schema = mongoose.Schema;

var schema = new Schema({
	id : { type : String, default : function(){ return uuid(); }},
	name : { type: String, required : true, unique : true},
	services : [{type:String}],
	locations : [{
		location : {lat:String, lng: String},
	}],
	contactPerson : { type: String, required : false},
	contactNumber : { type : String, required : false},
	email : { type: String, required : false},
	role : { type : String, required : true, default: "org"},
}, { strict : false});

var organizationModel = mongoose.model('Organization', schema);

module.exports = organizationModel;