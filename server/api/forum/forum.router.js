const router = require('express').Router();
const logger = require('../../services/app.logger');
const usrCtrl = require('./forum.controller');
const appConfig = require('../../config').app;
/*
 * Actual URI will be HTTP POST /users/
 */
 router.post('/', function(req, res) {
  //console.log(res)
  let forumData = req.body;
  logger.debug('User persistent started');
  try {
    if (!forumData) {
      logger.error('userData not found');
      throw new Error('Invalid inputs passed...!');
    }

    usrCtrl.addPost(forumData, 'appConstant.INSERT_TYPE.PROFILES').then((successResult) => {
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
    usrCtrl.getPost( 'appConstant.INSERT_TYPE.PROFILES').then((successResult) => {
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

router.get('/:searchTerm', function(req, res) {
  let getValue=req.params.searchTerm;
   //let regex = new RegExp(req.params.searchTerm, "i")
  //console.log(res)
  logger.debug('User persistent started');
  try {
    usrCtrl.getSearch(getValue,'appConstant.INSERT_TYPE.PROFILES').then((successResult) => {
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


router.get('/getQuestionDetail/:question', function(req, res) {
  console.log("...........prashant");
  let getValue=req.params.question;
   //let regex = new RegExp(req.params.searchTerm, "i")
  //console.log(res)
  logger.debug('User persistent started');
  try {
    usrCtrl.getSearch(getValue,'appConstant.INSERT_TYPE.PROFILES').then((successResult) => {
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

router.put('/update/:question', (req, res) => {  

let  getValue=req.params.question; 
let forumUpdate = req.body;
  logger.debug('User persistent started');
  try {
    usrCtrl.saveAnswer(getValue, forumUpdate,'appConstant.INSERT_TYPE.PROFILES').then((successResult) => {
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




