const mongoose = require('mongoose');

/*
 * This is a login schema, for persisting credentials of each user login in via git
 */

var ProfileSchema = new mongoose.Schema({
  name: String,

  userId: String,
  updatedAt:{ type: Date, default: Date.now },
 	createdOn:Date,
  status:Boolean

});
ProfileSchema.statics.findOrCreate = require("find-or-create");
module.exports = mongoose.model("profile", ProfileSchema);


