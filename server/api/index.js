const userRoutes = require('./users');

const forumRoutes = require('./forum');

const loginRoutes = require('./login');

const profileRoutes = require('./profile');

const authtokenRoutes = require('./authtoken');


module.exports = {
	userRoutes : userRoutes,
	forumRoutes : forumRoutes,
	loginRoutes : loginRoutes,
  profileRoutes : profileRoutes,
  authtokenRoutes : authtokenRoutes,
}
