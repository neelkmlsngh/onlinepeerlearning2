const loginModel = require('./login.entity');
const logger = require('../../services/app.logger');
const appConstant = require('../../config').app;
const userController = require('./../users/users.controller')

//save new login user details
const saveLoginCredentials = function(userInfo, done) {
    console.log("find or update" + userInfo.userId)
    loginModel.findOneAndUpdate({ userId: userInfo.userId }, {
        $set: {
            status: true
        }
    },{upsert:true,'new':true},function(err, user) {
        if (err) {
            logger.info("login user not found" + err)
        } else if (user) {
            logger.info('login user saved successfully')
            userController.saveUserCredentials(userInfo, done);
        }
    });
};


module.exports = {
    saveLoginCredentials: saveLoginCredentials
};