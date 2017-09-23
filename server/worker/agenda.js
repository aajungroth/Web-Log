var webLogger = require('./web_logger.js');
var Agenda = require('agenda');
var agenda = new Agenda({db: { address: 'mongodb://localhost/weblog', collection: 'webLogJobs' }});
console.log(webLogger);

agenda.on('ready', function() {
  agenda.define('get html', function(job, done) {
    webLogger.htmlService(function(err, result) {
      if (err) {
        done(err);
      } else {
        done();
      }
    })
  });
  agenda.processEvery('one minute');
  agenda.start();
});

module.exports = agenda;
