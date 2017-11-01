const userRoutes = require('./users');

const forumRoutes = require('./forum');

const loginRoutes = require('./login');

const profileRoutes = require('./profile');

const authtokenRoutes = require('./authtoken');

const chatRoutes = require('./chat');

module.exports = {
    userRoutes: userRoutes,
    forumRoutes: forumRoutes,
    loginRoutes: loginRoutes,
    profileRoutes: profileRoutes,
    authtokenRoutes: authtokenRoutes,
    chatRoutes: chatRoutes
}