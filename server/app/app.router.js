const path = require('path');


const apiRoutes = require('../api');

// All routes used in application
const useRoutes = function(app) {
	app.use('/api/users', apiRoutes.userRoutes);
	app.use('/api/forum', apiRoutes.forumRoutes);
	
 };

module.exports = {
  useRoutes : useRoutes
};
