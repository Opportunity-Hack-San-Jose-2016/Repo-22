var mongoose = require('mongoose');
var uuid = require('node-uuid');
var Schema = mongoose.Schema;

var schema = new Schema({
	id : { type : String, required : true, unique : true, },
	firstname : { type: String, required : true, default : ""},
	lastname : { type: String, required : true, default : ""},
	age: {type: String, required:true, default : ""},
	email : { type: String, required : false, default : ""},
	password : { type : String, required : true, default : ""},
	location : {lat:String, long: String, default : ""},
	contactNumber : {type : String, default : ""},
	dateAdded: {type: Date, default: new Date(), default : ""},
	// familyId : {type: String},
	// dateOfBirth : {type : Date},
	gender : {type: String, default : ""},
	disabled: {type:Boolean, default : ""},
	role : { type : String, required : true, default: "refugee"},

}, { strict : false});


var refugeeModel = mongoose.model('Refugee', schema);

module.exports = refugeeModel;