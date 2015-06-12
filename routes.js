var _ = require('underscore');

var dummyPersons = [
	{
		key: "1",
		name: "Stewe Galloway",
		phone: "111-1111111"
	},
	{
		key: "2",
		name: "Michael Laudrup",
		phone: "222-2222222"
	},
	{
		key: "3",
		name: "Mats Magnusson",
		phone: "333-3333333"
	},
	{
		key: "4",
		name: "Andreas Ravelli",
		phone: "444-4444444"
	}
];

module.exports = {

	search: function(req, res) {
		res.send(_.filter(dummyPersons, function(person) {
			return person.name.toLowerCase().indexOf(req.params.query.toLowerCase()) !== -1;
		}));
	},

	getPersons: function(req, res) {
		res.send(dummyPersons);
	},

	getPerson: function(req, res) {
		res.send(_.where(dummyPersons, { key: req.params.key })[0]);
	},

	updatePerson: function(req, res) {
		var person = _.where(dummyPersons, {key: req.body.key})[0];
		person.name = req.body.name;
		person.phone = req.body.phone;
		res.end("Updated person");
	},

	createPerson: function(req, res) {
		console.log("Create person: " + JSON.stringify(req.body));
		res.end("Created person");
	}

}