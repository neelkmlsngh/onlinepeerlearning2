const mongoose = require('mongoose');

/*
 * This is a profile schema, for persisting personal credentials of each user login in via git
 */

var ProfileSchema = new mongoose.Schema({
  userId:String,
  firstName: {type:String,default:null},
  lastName: {type:String,default:null},
  email:{type:String,default:null},
  company:{type:String,default:null},
  website:{type:String,default:null},
  gender:{type:String,default:null},
  bio:{type:String,default:null}
});
ProfileSchema.statics.findOrCreate = require("find-or-create");
module.exports = mongoose.model("profile", ProfileSchema);


