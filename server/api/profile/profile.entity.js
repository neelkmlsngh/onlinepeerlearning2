const mongoose = require('mongoose');

/*
 * This is a login schema, for persisting credentials of each user login in via git
 */

var ProfileSchema = new mongoose.Schema({
  userId:String,
  firstName: {type:String,default:null},
  lastName: {type:String,default:null},
  email:{type:String,default:null},
  gender:{type:String,default:null},
  biodata:{type:String,default:null}
});
ProfileSchema.statics.findOrCreate = require("find-or-create");
module.exports = mongoose.model("profile", ProfileSchema);


