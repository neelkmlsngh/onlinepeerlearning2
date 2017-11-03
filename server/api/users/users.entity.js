const mongoose = require('mongoose');

/*
 * This is a users schema, for persisting credentials of each user login in via git
 */

var UserSchema = new mongoose.Schema({
    name: {type:String},
    userId: { type: String, unique: true },
    updatedAt: { type: Date, default: Date.now },
<<<<<<< HEAD
    avatarUrl: {type:String},
    publicRepos: {type:String},
    reposUrl: {type:String},
=======
    avatarUrl: String,
    publicRepos: String,
    reposUrl: String,
    firstName: {type:String,default:null},
    lastName: {type:String,default:null},
    email:{type:String,default:null},
    company:{type:String,default:null},
    website:{type:String,default:null},
    gender:{type:String,default:null},
    bio:{type:String,default:null}
>>>>>>> 5f9278330c0ea54f5c875faeb5d9ded1fd896d3e

});
UserSchema.statics.findOrCreate = require("find-or-create");
module.exports = mongoose.model("user", UserSchema);