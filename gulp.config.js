module.exports = function() {
  var client = './public/';
  var clientApp = client + 'js/';

  var config = {

    /*
     * Files paths
     */
    alljs: [
      './public/js/**/*.js',
      './*.js'
    ],
    client: client,
    index: client + 'index.html',
    js: [
      clientApp + '/**/*.module.js',
      clientApp + '/**/*.js',
      '!' + clientApp + '/**/*.spec.js'
    ],

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
