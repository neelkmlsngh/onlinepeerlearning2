const logger = require('../../services/app.logger');
const appConstant = require('../../config').app;
const loginModel = require('../login/login.entity')
const chatMsgModel = require('./chat.entity')

const userSessionCheck = function(data, callback) {
	loginModel.findOne({ "userId": data.userId }, (err, result) => {
		callback(err, result);
	})
}

const getUserInfo = function(userId, callback) {
	loginModel.findOne({ "userId": userId }, (err, result) => {
		callback(err, result);
	});
}

const getChatList = function(userId, callback) {
	loginModel.find({ 'online': 'Y', 'socketId': { $ne: userId } }, (err, result) => {
		console.log(JSON.stringify(result, null, 2));
		callback(err, result);
	});
}

const insertMessages = function(data, callback) {
	let msgModel = new chatMsgModel(data);
	msgModel.save((err, result) => {
		callback(err, result);
	});
}

const getMessages = function(userId, toUserId, callback) {
	const data = {
		'$or': [{
			'$and': [{
				'toUserId': userId
			}, {
				'fromUserId': toUserId
			}]
		}, {
			'$and': [{
				'toUserId': toUserId
			}, {
				'fromUserId': userId
			}]
		}, ]
	};

	chatMsgModel
		.find(data)
		.sort({ 'timestamp': 1 })
		.exec((err, result) => {
			callback(err, result)
		})

}

const addSocketId = function(data, callback) {
	loginModel.update({ "userId": data.id }, data.value, { upsert: true, 'new': true }, (err, result) => {
		result.userId = data.id;
		callback(err, result);
	})
}

module.exports = {
	userNameCheck: userNameCheck,
	login: login,
	registerUser: registerUser,
	userSessionCheck: userSessionCheck,
	getUserInfo: getUserInfo,
	getChatList: getChatList,
	insertMessages: insertMessages,
	getMessages: getMessages,
	logout: logout,
	addSocketId: addSocketId
};