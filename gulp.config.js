module.exports = function() {
  var client = './';
  var clientApp = client + 'public/js/';

  var config = {

    /*
     * Files paths
     */
    alljs: [
      clientApp + '**/*.js',
      './*.js'
    ],
    client: client,
    index: 'index.html',
    css: [
    	client + 'css/style.css',
    	client + 'css/menu.css'
    ],
    js: [
      clientApp + '**/*.module.js',
      clientApp + '**/*.js',
      '!' + clientApp + '**/*.spec.js'
    ],
    dist: 'dist',

    /**
    * Bower and NPM locations
    */
    bower: {
      json: require('./bower.json'),
      directory: './bower_components/',
      ignorePath: '../..'
    }

  }

  config.getWiredepDefaultOptions = function() {
    var options = {
      bowerJson: config.bower.json,
      directory: config.bower.directory,
      ignorePath: config.bower.ignorePath
    };
    return options;
  };

  return config;
};
