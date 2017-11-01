const mongoose = require('mongoose');

/*
 * This is a login schema, for persisting credentials of each user login in via git
 */

var MessageSchema = new mongoose.Schema({
  fromUserId: String,

 message: String,
  toUserId:String,
     fromSocketId:Number,
  timestamp:Number

});
//MessageSchema.statics.findOrCreate = require("find-or-create");
module.exports = mongoose.model("message", MessageSchema);