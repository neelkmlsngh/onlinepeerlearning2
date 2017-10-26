const path = require('path');
const express = require('express');

const service = require('./app.service');

function welcome(appName) {
  process.stdout.write('\n=======================================================\n');
  process.stdout.write('\n=            '+ appName +'                =\n');
  process.stdout.write('\n=======================================================\n');
}

module.exports = function(appName) {

  welcome(appName);

  let app = service.createApp();

  app.use(express.static(path.resolve(__dirname, '../../', 'client/dist')));

  app = service.setupMiddlewares(app);
  app = service.setupRestRoutes(app);
  service.setupMongooseConnections();

    
  return app;
};