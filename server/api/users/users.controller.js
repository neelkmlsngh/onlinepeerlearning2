const logger = require('../../services/app.logger');
const appConstant = require('../../config').app;
const UserModel = require('./users.entity')
const ProfileController=require('./../profile/profile.controller')
//Save new user details
const saveUserCredentials = function(userInfo,done) {
	UserModel.findOrCreate({ userId: userInfo.userId }, {
		   
			publicRepos: userInfo.publicRepos,
			avatarUrl: userInfo.avatarUrl,
			userId: userInfo.userId

		}, function(err, user) {
			if (err) {
				logger.info("error occured")
				
			} else if (!user) {
				logger.info("user not saved")
			} else {
				logger.info('saved successfully')
				ProfileController.saveUserProfile(userInfo,done);
				return done(err, user);
			}
		}
	);
};


module.exports = {
	saveUserCredentials: saveUserCredentials,
};