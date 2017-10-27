const db = require('./db');
const app = require('./app');
const loggerConstant = require('./loggerConstants');
const token = require('./token');

module.exports = {
    app: app,
    db: db,
    loggerConstant: loggerConstant,
    token: token
}