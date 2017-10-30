const ProfileModel = require('../users/users.entity');
const logger = require('../../services/app.logger');
const appConstant = require('../../config').app;
const ProfileUser=require('./profile.entity')
const getProfile = function(getId) {
  console.log(getId+'65gt65')
  return new Promise((resolve,reject)=>{
  
 ProfileModel.findOne({userId:getId}, (err, data) => {
    if(err) {
      logger.error('Internal error' + err);
     reject(err);
   } else {
    console.log("data================"+data)
     /*logger.error('Internal error' + err);*/
     resolve(data);
  }
})
})
data
};

//Save new userprofile details
const saveUserProfile = function(userInfo,done) {
    ProfileUser.findOrCreate({ userId: userInfo.userId }, {
          
            userId: userInfo.userId

        }, function(err, user) {
            if (err) {
                logger.info("error occured")
            } else if (!user) {
                logger.info("user not saved")
            } else {
                logger.info('saved successfully')
               
                return done(err, user);
            }
        }
    );
};


module.exports = {
    getProfile:getProfile,
    saveUserProfile:saveUserProfile
};