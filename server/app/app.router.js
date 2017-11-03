const path = require('path');


const apiRoutes = require('../api');

// All routes used in application
const useRoutes = function(app) {
    app.use('/api/users', apiRoutes.userRoutes);
    app.use('/api/forum', apiRoutes.forumRoutes);
    app.use('/api/login', apiRoutes.loginRoutes);
    app.use('/api/profile', apiRoutes.profileRoutes);
    app.use('/chat', apiRoutes.chatRoutes)
};
module.exports = {
    useRoutes: useRoutes
};
//apiRoutes.authtoke