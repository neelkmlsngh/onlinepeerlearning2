const mongoose = require('mongoose');

/*
 * This is a Snippet Schema.
 */

var SnippetSchema = new mongoose.Schema({
  title: String,
  code: String,
  lang: String,
});

//exporting the SnippetSchema file
module.exports = mongoose.model("snippet", SnippetSchema);

