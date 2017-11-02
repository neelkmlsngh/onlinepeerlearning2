const loginModel = require('./login.entity');
const logger = require('../../services/app.logger');
const appConstant = require('../../config').app;
const userController = require('./../users/users.controller')
const jwt = require('jsonwebtoken');
const appConfig = require('../../config').app;

//save new login user details
const saveLoginCredentials = function(userInfo, done) {
    loginModel.findOneAndUpdate({ userId: userInfo.userId, userName: userInfo.name }, {
        $set: {
            status: true
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

const getUser = (userId) => {
    return new Promise((resolve, reject) => {
        loginModel.findOne({ userId: userId }, (err, data) => {
            if (err) {
                reject(err);
            } else if (data) {
                resolve(data)
            }
        })
    })
}
module.exports = {
        saveLoginCredentials: saveLoginCredentials,
        getUser: getUser,
};