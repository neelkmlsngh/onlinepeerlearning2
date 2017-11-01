var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//knowledge base forum schema
var forumSchema = new Schema({
   username: String,
   questionTitle: String,
   problemDescription: String,
   date: String,
   time: String,
   answers: [{ username: String, answer: String, codeSnippet:String, likes:String, dislikes:String }],
   votes: Number,
   noOfViews: Number,
   noOfAnswers:String,
   codeSnippet: String,
   tags:String
});
//exporting the forumSchema file
module.exports = mongoose.model('forum', forumSchema)
