var request = require('request');

exports.htmlService = function(url, cb) {
  request(url, function(error, response, html) {
    if (error) {
      return cb(error, response, html);
    }
    console.log('Job done!');
    cb(error, response, html);
  });
};
