const router = require('express').Router();
const logger = require('../../services/app.logger');
const forumCtrl = require('./forum.controller');
const appConfig = require('../../config').app;

//post forum questions in a database
router.post('/', function(req, res) {
    let forumData = req.body;
    logger.debug('User persistent started');
    try {
        if (!forumData) {
            logger.error('userData not found');
            throw new Error('Invalid inputs passed...!');
        }

        forumCtrl.addPost(forumData).then((successResult) => {
            logger.info('post forum question successfully');
            return res.status(201).send(successResult);
        }, (errResult) => {
            logger.error(errResult);
            return res.status(500).send({ error: errResult });
        });
    } catch (err) {
        logger.fatal('Exception occurred' + err);
        res.send({ error: err });
        return;
    }
});

//get forum question from database
router.get('/', function(req, res) {
    logger.debug('User persistent started');
    try {
        forumCtrl.getPost().then((successResult) => {
            logger.info('Get successResult successfully and return back');
            return res.status(201).send({ success: true, message: Get successResult successfully , data: successResult});
        }, (errResult) => {
            logger.error(errResult);
            return res.status(500).send({ success: true, message: error, data: errResult });
        });
    } catch (err) {
        logger.fatal('Exception occurred' + err);
        return res.status(500).send({ success: false, message: con.messages.lostcard_get, data: err });
    }
});

//search forum questions from database
router.get('/:searchTerm', function(req, res) {
    let getValue = req.params.searchTerm;
    logger.debug('User persistent started');
    try {
        forumCtrl.getSearch(getValue).then((successResult) => {
            logger.info('Get successResult successfully and return back');
            return res.status(201).send(successResult);
        }, (errResult) => {
            logger.error(errResult);
            return res.status(500).send({ error: errResult });
        });
    } catch (err) {
        logger.fatal('Exception occurred' + err);
        res.send({ error: err });
        return;
    }
});

//get the question detail from database
router.get('/getQuestionDetail/:question', function(req, res) {
    let getValue = req.params.question;
    logger.debug('User persistent started');
    try {
        forumCtrl.getSearch(getValue).then((successResult) => {
            logger.info('Get successResult successfully and return back');
            return res.status(201).send(successResult);
        }, (errResult) => {
            logger.error(errResult);
            return res.status(500).send({ error: errResult });
        });
    } catch (err) {
        logger.fatal('Exception occurred' + err);
        res.send({ error: err });
        return;
    }
});

//add answers to paticular forum question
router.put('/update/:question', (req, res) => {
    let getValue = req.params.question;
    let forumUpdate = req.body;
    logger.debug('User persistent started');
    try {
        forumCtrl.saveAnswer(getValue, forumUpdate).then((successResult) => {
            logger.info('Get successResult successfully and return back');
            return res.status(201).send(successResult);
        }, (errResult) => {
            logger.error(errResult);
            return res.status(500).send({ error: errResult });
        });
    } catch (err) {
        logger.fatal('Exception occurred' + err);
        res.send({ error: err });
        return;
    }
});

module.exports = router;