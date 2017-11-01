const loginModel = require('./login.entity');
const logger = require('../../services/app.logger');
const appConstant = require('../../config').app;
const userController = require('./../users/users.controller')

//save new login user details
const saveLoginCredentials = function(userInfo, done) {
	loginModel.findOneAndUpdate({ userId: userInfo.userId, userName: userInfo.name }, {
		$set: {
			// status: true
			online: 'Y'
			// socketId: null
		}
	}, { upsert: true, 'new': true }, function(err, user) {
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