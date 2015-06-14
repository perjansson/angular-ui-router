var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var routes = require('./routes');

app.use("/", express.static(__dirname + "/public/"));
app.use("/", express.static(__dirname + "/node_modules/bootstrap/dist/"));
app.use("/", express.static(__dirname + "/node_modules/angular/"));
app.use("/", express.static(__dirname + "/node_modules/angular-ui-router/release/"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/persons/:query', routes.search);
app.get('/persons', routes.getPersons);
app.get('/person/:key', routes.getPerson);
app.post('/person/:key', routes.updatePerson);
app.post('/persons', routes.createPerson);

var appPort = Number(process.env.PORT || 1337);
var server = app.listen(appPort);
console.log('Listening on port ' + appPort);