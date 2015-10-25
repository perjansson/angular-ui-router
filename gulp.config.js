module.exports = function() {
  var config = {

    // all js to vet
    alljs: [
        './public/js/**/*.js',
        './*.js'
      ]
  }

  return config;
};
