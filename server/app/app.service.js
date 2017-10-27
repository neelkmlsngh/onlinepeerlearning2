const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const compression = require('compression');
var passport = require('passport');
var methodOverride = require('method-override');
var GitHubStrategy = require('passport-github2').Strategy;
var partials = require('express-partials');
var util = require('util');
var session = require('express-session');
const jwt = require('jsonwebtoken');

const appRoutes = require('./app.router');
const logger = require('../services/app.logger');
const config = require('../config');
const User = require('../api/login/login.entity')
const loggerConfig = config.loggerConstant;
const secretKey = config.token;
const db = config.db;

let people = [{
        name: "Douglas  Pace"
    },
    {
        name: "Mcleod  Mueller"
    },
    {
        name: "Day  Meyers"
    },
    {
        name: "Aguirre  Ellis"
    },
    {
        name: "Cook  Tyson"
    }
];

function loginviagit() {
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });


    passport.use(new GitHubStrategy({
            clientID: '7328322e0495591f5a69',
            clientSecret: 'aac0e311b9be3dbd2fbe98cd23e3fa5fc60ea32c',
            callbackURL: "https://localhost:8080/auth/github/callback"
        },

        function(accessToken, refreshToken, profile, done) {
            /*console.log(profile);*/
            var token = jwt.sign(profile._json.login, secretKey.SECRET_KEY);
            User.findOrCreate({ userid: profile.id }, {
                name: profile._json.login,
                userid: profile.id,
                avatar_url: profile._json.avatar_url,
                public_repos: profile._json.public_repos,
                repos_url: profile._json.repos_url
            }, function(err, user) {
                return done(err, user);
            });
        }
    ));
}
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
        logger.error(loggerConfig.INTERNAL_SERVER_ERROR + ': ', err);
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
    }));

    app.use(compression());

    app.use(methodOverride());
    app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(partials());
    return app;

}

// Initialize MongoDB database connection
function setupMongooseConnections() {

    mongoose.connect(db.MONGO.URL);

    mongoose.connection.on('connected', function() {
        logger.debug(loggerConfig.MONGODB_CONNECTED);
    });

    mongoose.connection.on('error', function(err) {
        logger.error(loggerConfig.MONGODB_CONNECTION_ERROR + ' : ', err);
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

function socketConnection(server) {
    var io = require('socket.io')(server);

    //Socket logic for chat and showing online Users
    io.on('connection', (socket) => {

        console.log('user connected');

        socket.on('disconnect', function() {
            console.log('user disconnected');
        });

        //For sending message
        socket.on('add-message', (message) => {
            io.emit('message', { type: 'new-message', text: message });
        });

        //For showing Onling Users
        io.emit('users', people);
    });
}

module.exports = {
    createApp: createApp,
    setupRestRoutes: setupRestRoutes,
    setupMiddlewares: setupMiddlewares,
    setupMongooseConnections: setupMongooseConnections,
    loginviagit: loginviagit,
    socketConnection: socketConnection

};