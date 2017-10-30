const mongoose = require('mongoose');

/*
 * This is a users schema, for persisting credentials of each user login in via git
 */

var UserSchema = new mongoose.Schema({
  name: String,
  userId: String,
  updatedAt: { type: Date, default: Date.now },
  avatarUrl:String,
  publicRepos: String,
  reposUrl: String,
  
});
UserSchema.statics.findOrCreate = require("find-or-create");
module.exports = mongoose.model("user", UserSchema);


