const router = require('express').Router();
const passport = require('passport')
const jwt = require('jsonwebtoken');
const secretKey = " config.token";
const logger = require('../../services/app.logger');
const usrCtrl = require('./login.controller');
const appConfig = require('../../config').app;
const User = require('./login.entity')

/*
 * Actual URI will be HTTP POST /users/
 */
router.get('/auth/github',
    passport.authenticate('github', { scope: ['user:email'] }),
    // var token = jwt.sign(req.user.doc,secretKey);
    function(req, res) {


    });

// GET /auth/github/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
        //console.log("JSON.stringify(req.user)");
       var token = jwt.sign("req.user",secretKey);
       let auth={
       	token: token,
       	userId:req.user.doc.userid
       }
       //console.log(token);
       res.redirect('https://localhost:8080/#/auth/'+req.user.doc.userid+"/"+token)
        // res.status(200).send({ success: true, userid: req.user.doc.userid, token: token });
    });
module.exports = router;