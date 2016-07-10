var mongoose = require('mongoose');
var uuid = require('node-uuid');
var Schema = mongoose.Schema;

var schema = new Schema({
	id : { type : String, default : function(){ return uuid(); }},
	username : { type: String, required : false, unique : true },
	password : { type: String, required : false, unique : true },
	Name : { type : String, required : true},
	organizationId : {type:String},
	contactNumber : { type : String, required : true},
}, { strict : false });

var volunteerModel = mongoose.model('Volunteer', schema);

module.exports = volunteerModel;