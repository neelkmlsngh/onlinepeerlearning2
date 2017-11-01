const router = require('express').Router();
const logger = require('../../services/app.logger');
const usrCtrl = require('./profile.controller');
const appConfig = require('../../config').app;
const multer = require('multer');
const fs = require('fs');
const path = require('path');

/*
 * Actual URI will be HTTP GET /getUser/userId
 */
 var storage = multer.diskStorage({
   destination: function(req, file, cb) {
       cb(null, 'server/uploads/')
   },
   filename: function(req, file, cb) {
       console.log(file);
       cb(null, file.originalname.slice(0, file.originalname.lastIndexOf('.')) + '-' + Date.now() + path.extname(file.originalname))
   }
})

var upload = multer({ storage: storage }).any();

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

  router.put('/image/:userId',function(req,res){
  let getId= req.params.userId;
  let profileInfo = req.body;
  console.log(profileInfo+"")
   try{
    upload(req, res, function(err) {
     if (err) {
         console.log(err);
     }
     else {
      let dataObj={
        img:req.files[0].filename
      }
      console.log(dataObj,getId);
      console.log(JSON.stringify(req.files[0])+"-------------")
       usrCtrl.updateImage(dataObj,getId); 
    }
  });
   }catch(err){
    logger.fatal('Exception occurred' + err);
    res.send({ error: err });
    return;
   }
 })


 module.exports=router;