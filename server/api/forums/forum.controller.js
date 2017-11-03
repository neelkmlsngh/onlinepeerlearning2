const forumModel = require('./forum.entity');
const logger = require('../../services/app.logger');
const appConstant = require('../../config').app;

//Post forum question function
const addPost = function(formdata) {
    return new Promise((resolve, reject) => {
        forumModel.create(formdata, (err, data) => {
            if (err) {
                logger.error('Internal error' + err);
                reject(err);
            } else {
                logger.error('Internal error' + err);
                resolve(data);
            }
        })
    })

};

//get forum question function
const getPost = function() {
    return new Promise((resolve, reject) => {
        forumModel.find({}, (err, data) => {
            if (err) {
                logger.error('Internal error' + err);
                reject(err);
            } else {
                logger.error('Internal error' + err);
                resolve(data);
            }
        })
    })

};

//post answer by question
const getPostByQuestion = function(getValue) {
    return new Promise((resolve, reject) => {
        forumModel.findOne({ getValue }, (err, data) => {
            if (err) {
                logger.error('Internal error' + err);
                reject(err);
            } else {
                logger.error('Internal error' + err);
                resolve(data);
            }
        })
    })

};

//search question of function
const getSearch = function(getValue) {
    return new Promise((resolve, reject) => {
        forumModel.find({
            $or: [{
                    "questionTitle": {
                        "$regex": getValue,
                        "$options": "i"
                    }
                }, {
                    "problemDescription": {
                        "$regex": getValue,
                        "$options": "i"
                    }
                },
                {
                    "tags": {
                        "$regex": getValue,
                        "$options": "i"
                    }
                }
            ]
        }, (err, data) => {
            if (err) {
                logger.error('Internal error' + err);
                reject(err);
            } else {
                logger.error('Internal error' + err);
                resolve(data);
            }
        })
    })
};

//save answer of question
const saveAnswer = function(getValue, updateValue) {
    return new Promise((resolve, reject) => {
        forumModel.update({
            'questionTitle': getValue
        }, {
            $push: { 'answers': updateValue }
        }, { upsert: true }, (err, data) => {
            if (err) {
                logger.error('Internal error' + err);
                reject(err);
            } else {
                logger.error('Internal error' + err);
                resolve(data);
            }
        })
    });
};


module.exports = {
    addPost: addPost,
    getPost: getPost,
    getSearch: getSearch,
    getPostByQuestion: getPostByQuestion,
    saveAnswer: saveAnswer
};