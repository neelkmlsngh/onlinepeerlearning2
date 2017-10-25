const db = require('./db');
const app = require('./app');
const loggerConstant = require('./loggerConstants');

module.exports = {
	app : app,
	db : db,
	loggerConstant:loggerConstant
}