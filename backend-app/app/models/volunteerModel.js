var mongoose = require('mongoose');
var uuid = require('node-uuid');
var Schema = mongoose.Schema;

var schema = new Schema({
	id : { type : String, default : function(){ return uuid(); }},
	email : { type: String, required : false, unique : true , default : ""},
	password : { type: String, required : false, unique : false , default : ""},
	Name : { type : String, required : true, default : ""},
	organizationId : {type:String, default : ""},
	contactNumber : { type : String, required : true, default : ""},
}, { strict : false });

var volunteerModel = mongoose.model('Volunteer', schema);

module.exports = volunteerModel;