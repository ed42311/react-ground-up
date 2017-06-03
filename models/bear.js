var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;

var BearSchema = new Schema({
  name: String,
})

module.exports = mongoose.model('Bear', BearSchema);
