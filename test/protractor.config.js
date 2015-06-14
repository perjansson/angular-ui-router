exports.config = {
	seleniumServerJar: '../node_modules/protractor/selenium/selenium-server-standalone-2.45.0.jar',
	/*seleniumAddress: 'http://localhost:4444/wd/hub',*/
	specs: ['e2e/**/*.js'],
	/*seleniumPort: 4444,*/
	baseUrl: 'http://localhost:1337',
	multiCapabilities: [{browserName: 'firefox'}, {browserName: 'chrome'}]
};