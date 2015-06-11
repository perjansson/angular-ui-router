var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var routes = require('./routes');

app.use("/", express.static(__dirname + "/public/"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/persons/search/:query', routes.search);
app.get('/persons', routes.getPersons);
app.get('/persons/:id', routes.getPerson);

var appPort = Number(process.env.PORT || 1337);
var server = app.listen(appPort);
console.log('Listening on port ' + appPort);