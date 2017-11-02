const ProfileModel = require('../users/users.entity');
const logger = require('../../services/app.logger');
const appConstant = require('../../config').app;
const ProfileUser = require('./profile.entity')

// get user details with the given userId
const getProfile = function(getId) {
    return new Promise((resolve, reject) => {
        ProfileModel.findOne({ userId: getId }, (err, data) => {
            if (err) {
                logger.error('Internal error' + err);
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
};

//Save new userprofile details
const saveUserProfile = function(userInfo, done) {
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
    });
};

//Update user details
const updateUserProfile = function(profileInfo, getId) {
    let userId = getId + "";
    return new Promise((resolve, reject) => {

        ProfileUser.updateOne({ "userId": userId }, {
            $set: {
                firstName: profileInfo.firstName,
                lastName: profileInfo.lastName,
                email: profileInfo.email,
                gender: profileInfo.gender,
                biodata: profileInfo.biodata
            }
        }, { upsert: true }, (err, data) => {
            if (err) {
                reject(err);
            } else if (data) {
                resolve(data);
            }
        })

    })
}

// update profile picture of a user with given userId
const updateImage = function(dataObj, getId) {
    let userId = getId;
    let img = dataObj.img;
    return new Promise((resolve, reject) => {

        ProfileModel.findOneAndUpdate({ userId: userId }, {
            $set: {
                avatarUrl: appConstant.URL + img
            }
        }, { new: true }, (err, data) => {
            if (err) {
                reject(err);
            } else if (data) {
                resolve(data);
            }
        })

    })
}


module.exports = {
    getProfile: getProfile,
    saveUserProfile: saveUserProfile,
    updateUserProfile: updateUserProfile,
    updateImage: updateImage
};