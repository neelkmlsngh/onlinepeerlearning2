const router = require('express').Router();
const logger = require('../../services/app.logger');
const usrCtrl = require('./profile.controller');
const appConfig = require('../../config').app;


/*
 * Actual URI will be HTTP GET /getUser/userId
 */

 router.get('/:userId',function(req,res){
 	let getId= req.params.userId;
 	try {
    usrCtrl.getProfile(getId).then((successResult)=>{
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
 })

 router.put('/profileInfo/:userId',function(req,res){
  let getId= req.params.userId;
  let profileInfo = req.body;
  console.log(profileInfo)
   try{
      usrCtrl.updateUserProfile(profileInfo,getId).then((successResult)=>{
        logger.info('Get successResult successfully and return back');
      return res.status(201).send(successResult);
    }),(errResult)=>{
        logger.error(errResult);
        return res.status(500).send({ error: errResult});
      }
   }catch(err){
    logger.fatal('Exception occurred' + err);
    res.send({ error: err });
    return;
   }
 })


 module.exports=router;