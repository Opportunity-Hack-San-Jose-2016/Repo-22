var mongoose = require('mongoose');
var uuid = require('node-uuid');
var Schema = mongoose.Schema;

var schema = new Schema({
	id : { type : String, default : function(){ return uuid(); }},
	long : { type: String, required : true},
	lat : { type: String, required : false, unique : true},
	zip : {type:String, required: false},
	city : { type : String, required : false},
	state : {type:String , required : false}
	country : { type : String, required : false},

}, { strict : false});


var locationModel = mongoose.model('Location', schema);

module.exports = locationModel;