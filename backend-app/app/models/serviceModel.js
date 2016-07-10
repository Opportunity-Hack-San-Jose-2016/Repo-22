var mongoose = require('mongoose');
var uuid = require('node-uuid');
var Schema = mongoose.Schema;

var schema = new Schema({
	id : { type : String, default : function(){ return uuid(); }},
	serviceName : { type: String, required : true, unique : true},
	serviceDesc : { type: String, required : true},
	img : {type : String, unique : true},
}, { strict : false});

var serviceModel = mongoose.model('Service', schema);

module.exports = serviceModel;