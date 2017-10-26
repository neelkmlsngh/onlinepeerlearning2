const mongoose = require('mongoose');

/*
 * This is a users schema, for persisting credentials of each user registered in the system
 */

var UserSchema = new mongoose.Schema({
  name: String,
  userid: String,
  updated_at: { type: Date, default: Date.now },
  avatar_url:String,
  public_repos: String,
  repos_url: String,
});
UserSchema.statics.findOrCreate = require("find-or-create");
module.exports = mongoose.model("login", UserSchema);


