const router = require('express').Router();
const logger = require('../../services/app.logger');
const helper = require('./chat.controller');
const appConfig = require('../../config').app;
const chatEntity = require('./chat.entity')

//This route is defined for checking the user information from database that user is valid user or not
router.post('/userSessionCheck', (request, response) => {

	let userId = request.body.userId;
	let sessionCheckResponse = {}

	if (userId == '') {
		sessionCheckResponse.error = true;
		sessionCheckResponse.message = `User Id cant be empty.`;
		response.status(412).json(sessionCheckResponse);
	} else {

		helper.userSessionCheck({
			userId: userId,
		}, (error, result) => {
			if (error || result === null) {
				sessionCheckResponse.error = true;
				sessionCheckResponse.message = `Server error.`;
				response.status(503).json(sessionCheckResponse);
			} else {
				sessionCheckResponse.error = false;
				sessionCheckResponse.userName = result.userName;
				sessionCheckResponse.message = `User logged in.`;
				response.status(200).json(sessionCheckResponse);
			}
		});
	}
});

//This route is for getting messages from database according to toUserId and fromUserId
router.post('/getMessages', (request, response) => {
	let userId = request.body.userId;
	let toUserId = request.body.toUserId;
	let messages = {}

	if (userId == '') {
		messages.error = true;
		messages.message = `userId cant be empty.`;
		response.status(200).json(messages);
	} else {
		helper.getMessages(userId, toUserId, (error, result) => {
			if (error) {
				messages.error = true;
				messages.message = `Server error.`;
				response.status(200).json(messages);
			} else {
				messages.error = false;
				messages.messages = result;
				response.status(200).json(messages);
			}
		});
	}
});

module.exports = router;