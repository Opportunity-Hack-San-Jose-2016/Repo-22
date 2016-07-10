var mongoose = require('mongoose');
var uuid = require('node-uuid');
var Schema = mongoose.Schema;

var schema = new Schema({
	id : { type : String, required : true, unique : true},
	firstname : { type: String, required : true},
	lastname : { type: String, required : true},
	age: {type: String, required:true},
	email : { type: String, required : false, unique : true},
	password : { type : String, required : true},
	location : {lat:String, long: String},
	contactNumber : {type : String},
	dateAdded: {type: Date, default: new Date()},
	// familyId : {type: String},
	// dateOfBirth : {type : Date},
	gender : {type: String},
	disabled: {type:Boolean},
	role : { type : String, required : true, default: "refugee"},

}, { strict : false});


var refugeeModel = mongoose.model('Refugee', schema);

module.exports = refugeeModel;