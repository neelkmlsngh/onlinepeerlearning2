var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//knowledge base forum schema
var forumSchema = new Schema({
    username: { type: String },
    questionTitle: { type: String },
    problemDescription: { type: String },
    likes: [{_id:{ type: String }, like:{type: Number, default: 0}}],
    dislikes:[{_id:{ type: String }, dislike:{type: Number, default: 0}}],
    date: { type: String },
    time: { type: String },
    answers: [{ username: { type: String }, answer: { type: String }, codeSnippet: { type: String }, likes: Number, dislikes: Number, date: { type: String } }],
    votes: { type: String },
    codeSnippet: { type: String },
    tags: { type: String }
});

//exporting the forumSchema file
module.exports = mongoose.model('forum', forumSchema)