const router = require('express').Router();
const logger = require('../../services/app.logger');
const usrCtrl = require('./snippet.controller');
const appConfig = require('../../config').app;
const snippet =require ('./snippet.entity');
/*
 * Actual URI will be HTTP POST /users/
 */
 router.post('/', function(req, res) {


  let forumData = req.body;
    console.log("forumData")
  console.log(forumData)
  logger.debug('User persistent started');
  try {
    if (!forumData) {
      logger.error('userData not found');
      throw new Error('Invalid inputs passed...!');
    }

    usrCtrl.addSnippet(forumData, 'appConstant.INSERT_TYPE.PROFILES').then((successResult) => {
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


router.get('/', function(req, res) {
  //console.log(res)
  logger.debug('User persistent started');
  try {
    usrCtrl.getSnippet( 'appConstant.INSERT_TYPE.PROFILES').then((successResult) => {
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


router.put('/update', (req, res) => {  

let  getValue= req.body.title; 
let forumUpdate = req.body.code;
  logger.debug('User persistent started');
  try {
    usrCtrl.updateSnippet(getValue, forumUpdate,'appConstant.INSERT_TYPE.PROFILES').then((successResult) => {
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


router.delete('/delete', (req, res) => {  

let  getValue= req.body.title; 
let forumUpdate = req.body.code;
  logger.debug('User persistent started');
  try {
    usrCtrl.deleteSnippet(getValue, forumUpdate,'appConstant.INSERT_TYPE.PROFILES').then((successResult) => {
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




