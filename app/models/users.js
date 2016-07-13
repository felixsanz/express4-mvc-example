var path = require('path');
var app = require(path.join(process.cwd(), 'app'));
var mongoose = require('mongoose');

var User = mongoose.Schema({
  name: { type: String, required: true, trim: true }
}, { collection: 'users' });

var model = mongoose.model('User', User);

module.exports = model;