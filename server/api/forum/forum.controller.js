const formModel = require('./forum.entity');
const logger = require('../../services/app.logger');
const appConstant = require('../../config').app;

//Save new student's details
const addPost = function(formdata) {
	return new Promise((resolve,reject)=>{
		console.log(formdata)
 formModel.create(formdata, (err, data) => {
	  if(err) {
	  	logger.error('Internal error' + err);
     reject(err);
   } else {
     logger.error('Internal error' + err);
     resolve(data);
	}
})
})

};

const getPost = function() {
	return new Promise((resolve,reject)=>{
	
 formModel.find({}, (err, data) => {
	  if(err) {
	  	logger.error('Internal error' + err);
     reject(err);
   } else {
     logger.error('Internal error' + err);
     resolve(data);
	}
})
})

};


const getSearch = function(getValue) {
	return new Promise((resolve,reject)=>{
	
 formModel.find({$or: [{
      "questionTitle": {
          "$regex": getValue,
          "$options": "i"
      }},{
      "description": {
          "$regex": getValue,
          "$options": "i"
      }
  },
  {
      "tags": {
          "$regex": getValue,
          "$options": "i"
      }
  }
  ]}, (err, data) => {
	  if(err) {
	  	logger.error('Internal error' + err);
     reject(err);
   } else {
     logger.error('Internal error' + err);
     resolve(data);
	}
})
})

};

module.exports = {
    addPost: addPost,
    getPost: getPost,
    getSearch: getSearch
};




