const db = require('./db');
const app = require('./app');
const loggerConstant = require('./loggerConstants');
const token = require('./token');
const chatRouteConfig = require('./chatRouteConfig')

module.exports = {
    app: app,
    db: db,
    loggerConstant: loggerConstant,
    token: token,
    chatRouteConfig : chatRouteConfig
}