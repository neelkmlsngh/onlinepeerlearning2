const router = require('express').Router();
const passport = require('passport')
const jwt = require('jsonwebtoken');
const logger = require('../../services/app.logger');
const usrCtrl = require('./login.controller');
const appConfig = require('../../config').app;
const User = require('./login.entity')
const loginConfig = require('../../config/login.config');
const loggerConfig = require('../../config/loggerConstants');

//login router 
router.get('/auth/github',
    passport.authenticate('github', { scope: ['user:email'] }),
    // var token = jwt.sign(req.user.doc,secretKey);
    function(req, res) {});

// GET /auth/github/callback
// will redirect the user to the home page.
router.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: appConfig.FAILURE_REDIRECT }),
    function(req, res) {
        try {
            userdetails = {
                userId: req.user.doc.userId,
                name: req.user.doc.name
            }
            let userToken = jwt.sign({ userdetails }, appConfig.SECRET, {
                expiresIn: appConfig.EXPIRETIME
            });
            res.redirect(appConfig.SUCCESS_REDIRECT + req.user.doc.userId + "/" + userToken)
        } catch (err) {
            logger.fatal(loggerConfig.EXCEPTION_NOT_FOUND + err);
            res.send({ error: err });
            return;
        }
    });


router.put('/logout', (req, res) => {
    userId = req.body.userid;
    try {
        if (!userId) {
            logger.error(loginConfig.USERID_NOT_FOUND);
            throw new Error('Invalid inputs passed...!');
        }

        User.findOneAndUpdate({ userId: userId }, {
            // updating online status
            $set: {
                online: loginConfig.ONLINE
            }
        }, (err, data) => {
            if (err) {
                logger.error(loginConfig.LOGOUT_FAIL);
            } else {
                logger.info(loginConfig.LOGOUT_SUCCESS)
                res.send(data)
                //res.send({ status: 200, message: loginConfig.LOGOUT_SUCCESS, data: data });
            }
        });
    } catch (err) {
        logger.fatal( + err);
        res.send({ error: err });
        return;
    }
});

router.get('/:userId', (req, res) => {
    let userId = req.params.userId;
    usrCtrl.getUser(userId).then(successResult => {
        res.send({ status: 200, message: loginConfig.USERNAME_FIND_SUCCESSFULLY, data:successResult });
    }, error => {

    })
});
module.exports = router;