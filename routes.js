module.exports = {

	search: function(req, res) {
		console.log('search');
		var persons = [
			{
				name: "Stewe Galloway"
			},
			{
				name: "Jonny Bråttom"
			}
		];
		res.send(persons);
	},

	getPersons: function(req, res) {
		console.log('getPersons');
		var persons = [
			{
				name: "Stewe Galloway"
			},
			{
				name: "Jonny Bråttom"
			},
			{
				name: "Mats Magnusson"
			},
		];
		res.send(persons);
	},

	getPerson: function(req, res) {
		console.log('getPerson');
		var person = {
			name: "Stewe Galloway"
		};
		res.send(person);
	}

}