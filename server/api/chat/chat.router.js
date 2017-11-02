const router = require('express').Router();
const logger = require('../../services/app.logger');
const helper = require('./chat.controller');
const appConfig = require('../../config').app;
const chatEntity = require('./chat.entity')

router.post('/usernameCheck', (request, response) => {

	if (request.body.userName === "") {
		response.status(412).json({
			error: true,
			message: `username cant be empty.`
		});
	} else {
		helper.userNameCheck({
			userName: request.body.userName.toLowerCase()
		}, (count) => {
			let result = {};
			if (count > 0) {
				result.error = true;
			} else {
				result.error = false;
			}
			response.status(200).json(result);
		});
	}
});

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