var mongoose = require('mongoose');
var uuid = require('node-uuid');
var Schema = mongoose.Schema;

var schema = new Schema({
	id : { type : String, default : function(){ return uuid(); }},
	refugees : [{
		refugeeId : {type:String},
	}],
}, { strict : false});

var familyModel = mongoose.model('Family', schema);

module.exports = familyModel;