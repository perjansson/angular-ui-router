var _ = require('underscore');

var dummyPersons = [
	{
		name: "Stewe Galloway",
		phone: "111-1111111"
	},
	{
		name: "Jonny Bråttom",
		phone: "222-2222222"
	},
	{
		name: "Mats Magnusson",
		phone: "333-3333333"
	},
	{
		name: "Glenn Hysén",
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
		res.send(_.where(dummyPersons, { name: req.params.name })[0]);
	}

}