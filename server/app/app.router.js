const path = require('path');


const apiRoutes = require('../api');

// All routes used in application
const useRoutes = function(app) {
	app.use('/api/users',apiRoutes.userRoutes);
	app.use('/api/forum', apiRoutes.forumRoutes);
	app.use('/', apiRoutes.loginRoutes);
	app.use('/api/profile',apiRoutes.profileRoutes);
	app.use('/api/snippet',apiRoutes.snippetRoutes);
 };

module.exports = {
  useRoutes : useRoutes
};
//apiRoutes.authtoke