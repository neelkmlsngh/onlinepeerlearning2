const userRoutes = require('./users');

const forumRoutes = require('./forum');

const loginRoutes = require('./login');

const authtokenRoutes = require('./authtoken');

const chatRoutes = require('./chat');

const snippetRoutes = require('./snippet');


module.exports = {

    userRoutes: userRoutes,
    forumRoutes: forumRoutes,
    loginRoutes: loginRoutes,
    authtokenRoutes: authtokenRoutes,
    chatRoutes: chatRoutes,
      snippetRoutes : snippetRoutes,
}

