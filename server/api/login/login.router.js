const router = require('express').Router();
const passport = require('passport')
const jwt = require('jsonwebtoken');
const logger = require('../../services/app.logger');
const usrCtrl = require('./login.controller');
const appConfig = require('../../config').app;
const User = require('./login.entity')
const cors = require('cors')
/*
 * it calls when hit on log via git hub button on client side
 */

   var corsOptions = {
    origin: '*',
    methods: ['GET'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
router.get('/auth/github',cors(corsOptions),
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
            userid: req.user.doc.userId,
            name: req.user.doc.name
        }
        console.log(appConfig.SECRET + " " + req.user.doc.userId + " " + appConfig.EXPIRETIME)
        let userToken = jwt.sign({ userdetails }, appConfig.SECRET, {
            expiresIn: appConfig.EXPIRETIME
        });;
        console.log(userToken)
        res.redirect(appConfig.REDIRECT + req.user.doc.userId + "/" + userToken)

    });

router.put('/logout', (req, res) => {
    console.log(req.body.userid)
    userId = req.body.userid
    User.findOneAndUpdate({ userId: userId }, {
        // updating preferences
        $set: {
            status: false
        }
    }, (err, Data) => {
        // action to take if error occurs 
        if (err) {
            logger.error("error occured");
        }
        // action to take when there is no error
        else {
            logger.info("logout successfully")
            console.log('asas', Data)
            res.send(Data);
        }
    });
});

online={}
app=[];
function userOnline(){
    User.find({status:true},function (err,data){
          if (err) {
                        logger.error("error in getting currencynews")

                    } else if (data) {
                       online.userid=data.userId;
                       app.push(online)
                       console.log(app)
                    }
    })
}
userOnline();
module.exports = router;