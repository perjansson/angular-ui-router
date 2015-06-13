exports.config = {
	seleniumServerJar: '../node_modules/webdriver-manager/selenium/selenium-server-standalone-2.46.0.jar',
	/*seleniumAddress: 'http://localhost:4444/wd/hub',*/
	specs: ['todo-spec.js'],
	seleniumPort: 4444,
	baseUrl: 'http://localhost:1337',
};