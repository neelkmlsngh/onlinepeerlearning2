const logger = require('../../services/app.logger');
const appConstant = require('../../config').app;
const UserModel = require('./users.entity')

//Save new user details
const saveUserCredentials = function(userInfo,done) {
    UserModel.findOrCreate({ userid: userInfo.id }, {
            name: userInfo.name,
            publicRepos: userInfo.publicRepos,
            avatarUrl: userInfo.avatarUrl,
            userid: userInfo.id

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
    saveUserCredentials: saveUserCredentials,
};