const router = require('express').Router();
const logger = require('../../services/app.logger');
const usrCtrl = require('./users.controller');
const appConfig = require('../../config').app;
/*
 * Actual URI will be HTTP POST /users/
 */
 router.post('/', function(req, res) {
  let userData = req.body;
  logger.debug('User persistent started');
  try {
    if (!userData) {
      logger.error('userData not found');
      throw new Error('Invalid inputs passed...!');
    }

    usrCtrl.registerNewUser(userData, 'appConstant.INSERT_TYPE.PROFILES').then((successResult) => {
      logger.info('Get successResult successfully and return back');
      return res.status(201).send(successResult);
    }, (errResult) => {
          logger.error(errResult);
          return res.status(500).send({ error: errResult});
        });
  } catch (err) {
    logger.fatal('Exception occurred' + err);
    res.send({ error: err });
    return;
  }
});

 module.exports = router;