const mongoose = require('mongoose');

/*
 * This is a users schema, for persisting credentials of each user login in via git
 */

var UserSchema = new mongoose.Schema({
    name: {type:String},
    userId: { type: String, unique: true },
    updatedAt: { type: Date, default: Date.now },
    avatarUrl: {type:String},
    publicRepos: {type:String},
    reposUrl: {type:String},

});
UserSchema.statics.findOrCreate = require("find-or-create");
module.exports = mongoose.model("user", UserSchema);