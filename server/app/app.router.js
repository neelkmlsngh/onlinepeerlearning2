const path = require('path');


const apiRoutes = require('../api');

// All routes used in application
const useRoutes = function(app) {
	app.use('/api/users', apiRoutes.userRoutes);
	
 };

module.exports = {
  useRoutes : useRoutes
};
