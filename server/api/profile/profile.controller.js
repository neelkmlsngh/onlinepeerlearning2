const profileModel = require('../login/login.entity');
const logger = require('../../services/app.logger');
const appConstant = require('../../config').app;

const getProfile = function(getId) {
  console.log(getId+'65gt65')
  return new Promise((resolve,reject)=>{
  
 profileModel.findOne({userid:getId}, (err, data) => {
    if(err) {
      logger.error('Internal error' + err);
     reject(err);
   } else {
    console.log("data================"+data)
     /*logger.error('Internal error' + err);*/
     resolve(data);
  }
})
})
data
};


module.exports = {
    getProfile:getProfile,
};