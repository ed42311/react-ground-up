var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;

var ThoughtSchema = new Schema({
  title: String,
  body: String,
  author: String
});

module.exports = mongoose.model('Thought', ThoughtSchema);
