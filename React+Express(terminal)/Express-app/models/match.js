var mongoose = require("mongoose");
const Joi = require('@hapi/joi');
var matchSchema  = mongoose.Schema({
  team1:String,
  team2:String,
  city:String,
  datetime:String
});
var match= mongoose.model("match",matchSchema);



module.exports.match = match;