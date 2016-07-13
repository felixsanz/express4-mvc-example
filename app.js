var express = require('express');
var path = require('path');

var app = express();

app.set('settings', require(path.join(process.cwd(), 'app', 'config')));

var mongoose = require('mongoose');
mongoose.connect('mongodb://' + app.get('settings').database.domain + '/' + app.get('settings').database.name);

app.set('views', path.join(process.cwd(), 'app', 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(require('serve-favicon')(path.join(process.cwd(), 'public', 'favicon.ico')));
app.use(require('morgan')('combined'));
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('method-override')());
app.use(require('cookie-parser')());

app.locals.settings = app.get('settings');

if (app.get('settings').env == 'development') {
  app.use(require('errorhandler')());
  app.locals.pretty = true;
}

module.exports = app;

require(path.join(process.cwd(), 'app', 'routes'))();

app.listen(app.get('settings').port, () => {
  console.log(`Escuchando en http://localhost:${app.get('settings').port}`)
});
