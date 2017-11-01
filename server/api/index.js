const userRoutes = require('./users');

const forumRoutes = require('./forum');

const loginRoutes = require('./login');

const profileRoutes = require('./profile');

const authtokenRoutes = require('./authtoken');


const snippetRoutes = require('./snippet');


module.exports = {
	userRoutes : userRoutes,
	forumRoutes : forumRoutes,
	loginRoutes : loginRoutes,
  profileRoutes : profileRoutes,
  snippetRoutes : snippetRoutes,
}
