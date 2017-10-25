const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const compression = require('compression');

const appRoutes = require('./app.router');
const logger = require('../services/app.logger');
const config = require('../config');

const loggerConfig = config.loggerConstant;
const db = config.db;


// Create express app
function createApp() {
  const app = express();
  app.use(cors());
  return app;
}

//  Use application routes
function setupRestRoutes(app) {

  appRoutes.useRoutes(app);

  app.use(function(req, res) {
      let err = new Error(loggerConfig.RESOURCE_NOT_FOUND);
      err.status = 404;
      logger.error(err);
      return res.status(err.status).json({
          error: err.message
      });
  });

  app.use(function(err, req, res) {
      logger.error(loggerConfig.INTERNAL_SERVER_ERROR+': ', err);
      return res.status(err.status || 500).json({
          error: err.message
      });
  });

  return app;
}

//  Use application middlewares
function setupMiddlewares(app) {
    
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
      extended: false
    })
  );
  
  app.use(compression());

  return app;
}

// Initialize MongoDB database connection
function setupMongooseConnections() {

  mongoose.connect(db.MONGO.URL);

  mongoose.connection.on('connected', function() {
      logger.debug(loggerConfig.MONGODB_CONNECTED);
  });

  mongoose.connection.on('error', function(err) {
      logger.error(loggerConfig.MONGODB_CONNECTION_ERROR +' : ', err);
  });

  mongoose.connection.on('disconnected', function() {
      logger.debug(loggerConfig.MONGODB_DISCONNECTED);
  });

  process.on('SIGINT', function() {
      mongoose.connection.close(function() {
          logger.info(loggerConfig.MONGODB_DISCONNECTED_ON_PROCESS_TERMINATION);
          process.exit(0);
      });
  });
}

module.exports = {
  createApp : createApp,
  setupRestRoutes : setupRestRoutes,
  setupMiddlewares : setupMiddlewares,
  setupMongooseConnections : setupMongooseConnections
};