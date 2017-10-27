const router = require('express').Router();
const passport = require('passport')
const jwt = require('jsonwebtoken');
const logger = require('../../services/app.logger');
const usrCtrl = require('./login.controller');
const appConfig = require('../../config').app;
const User = require('./login.entity')

/*
 * it calls when hit on log via git hub button on client side
 */
router.get('/auth/github',
    passport.authenticate('github', { scope: ['user:email'] }),
    // var token = jwt.sign(req.user.doc,secretKey);
    function(req, res) {});

// GET /auth/github/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
        userdetails = {
            userid: req.user.doc.userid,
            name: req.user.doc.name
        }
        console.log(appConfig.SECRET + " " + req.user.doc.userid + " " + appConfig.EXPIRETIME)
        let userToken = jwt.sign({ userdetails }, appConfig.SECRET, {
            expiresIn: appConfig.EXPIRETIME
        });;
        let auth = {
            token: userToken,
            userId: req.user.doc.userid
        }

        res.redirect(appConfig.REDIRECT + req.user.doc.userid + "/" + userToken)

    });
module.exports = router;