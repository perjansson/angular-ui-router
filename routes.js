var _ = require('underscore');

	var fakePersons = [];
	_(15000).times(function(n) {
		fakePersons.push({
			key: n,
			name: "Person " + n,
			phone: n
		})
	})

module.exports = {

	search: function(req, res) {
		res.send(_.filter(fakePersons, function(person) {
			return person.name.toLowerCase().indexOf(req.params.query.toLowerCase()) !== -1;
		}));
	},

	getPersons: function(req, res) {
		res.send(fakePersons);
	},

	getPerson: function(req, res) {
		res.send(_.where(fakePersons, { key: req.params.key })[0]);
	},

	updatePerson: function(req, res) {
		var person = _.where(fakePersons, {key: req.body.key})[0];
		person.name = req.body.name;
		person.phone = req.body.phone;
		res.end("Updated person");
	},

	createPerson: function(req, res) {
		var newPerson = req.body;
		newPerson.key = fakePersons.length + 1 + "";
		fakePersons.push(newPerson);
		res.end("Created person");
	}

}
