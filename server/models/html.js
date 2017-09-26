var db = require('../db_config.js').mongoose;
var autoIncrement = require('mongoose-auto-increment');
var agenda = require('../worker/agenda.js');
//console.log('agenda', agenda);

autoIncrement.initialize(db);

var HtmlSchema = db.Schema({
  jobId: Number,
  url: String,
  html: {type: String, default: ''}
},
{
  timestamps: true
});

HtmlSchema.plugin(autoIncrement.plugin, {model: 'Html', field: 'jobId'});

var Html = db.model('Html', HtmlSchema);

exports.create = function(url, cb) {
    var htmlInfo = {url: url};
    var html = new Html(htmlInfo);

    html.save(function(err, result) {
      if (err) {
        cb(err);
      } else {
        //get job id
        console.log('Html result', result);
        var jobId = result.jobId;

        agenda.now('get html', {url: url, jobId: jobId});
        cb();
      }
    });
};

exports.get = function(cb) {
  var query = Html.find();

  query.select('jobId');
  query.exec(function(err, results) {
    cb(err, results);
  });
};

exports.getOne = function(jobId, cb) {
  var query = Html.findOne({'jobId': jobId});
  console.log('jobId', jobId);
  query.select('html');
  query.exec(function(err, result) {
    cb(err, result);
  });
};

exports.updateOne = function(query, newData, cb) {
  Html.findOneAndUpdate(query, newData, cb);
};
