var path = require('path');
var app = require(path.join(process.cwd(), 'app'));
var User = require(path.join(process.cwd(), 'app', 'models', path.basename(__filename)));

module.exports = {
  main: function(req, res) {
    return res.render('main');
  }
}