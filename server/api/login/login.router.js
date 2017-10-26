const router = require('express').Router();
const passport=require('passport')
const logger = require('../../services/app.logger');
const usrCtrl = require('./login.controller');
const appConfig = require('../../config').app;

/*
 * Actual URI will be HTTP POST /users/
 */
 router.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }),
  function(req, res){
  
  });

// GET /auth/github/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {

   res.redirect('https://localhost:8080/#');
  });


 module.exports = router;