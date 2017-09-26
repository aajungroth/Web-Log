var webLogger = require('./web_logger.js');
var Html = require('../models/html.js');
var Agenda = require('agenda');
var agenda = new Agenda({db: { address: 'mongodb://localhost/weblog', collection: 'webLogJobs' }});
//console.log('webLogger.htmlService', webLogger.htmlService);

agenda.on('ready', function() {
  console.log('Agenda is ready!');
  agenda.define('get html', function(job, done) {
    var jobId = job.attrs.data.jobId;
    var url = job.attrs.data.url;
    var query = {'jobId': jobId};
    var newData = {'html': ''};

    webLogger.htmlService(url, function(err, response, result) {
      //console.log('response from request middleware:', response);
      if (err) {
        done(err);
      } else {
        newData.html = result;
        //save html based on jobId
        //console.log('Html', Html);
        Html.updateOne(query, newData, function(err) {
          if (err) {
            done(err);
          }
          console.log('html udpated');
          done();
        });
      }
    })
  });
  agenda.processEvery('one minute');
  agenda.start();
});

module.exports = agenda;
