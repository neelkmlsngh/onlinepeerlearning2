const mongoose = require('mongoose');

/*
 * This is a login schema, for persisting credentials of each user login in via git
 */

var ProfileSchema = new mongoose.Schema({
  userId: String,
  name: String,
  contact:Number,
  email:String,
  gender:String
});
ProfileSchema.statics.findOrCreate = require("find-or-create");
module.exports = mongoose.model("profile", ProfileSchema);


