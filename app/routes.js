var path = require('path');
var app = require(path.join(process.cwd(), 'app'));
var fs = require('fs');
var glob = require('glob');

var controllers = {};
var files = glob.sync(path.join(process.cwd(), 'app', 'controllers', '**', '*.js'));
files.forEach(function(file) {
  var temp = controllers;
  var parts = path.relative(path.join(process.cwd(), 'app', 'controllers'), file).slice(0, -3).split(path.sep);

  while (parts.length) {
    if (parts.length === 1) {
      temp[parts[0]] = require(file);
    } else {
      temp[parts[0]] = temp[parts[0]] || {};
    }
    temp = temp[parts.shift()];
  }
});

module.exports = function() {
  app.route('/').get(controllers.users.main);

  app.use(function(err, req, res, next) {
    console.error(err.stack);
    return res.status(500).render('500');
  });

  app.use(function(req, res) {
    return res.status(404).render('404');
  });
}
