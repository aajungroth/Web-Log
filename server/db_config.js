exports.mongoose = require('mongoose');
exports.mongoose.Promise = require('bluebird');
var mongoURI = 'mongodb://' + process.env.DB_HOST + '/weblog';

exports.mongoose.connect('mongodb://localhost/weblog');
var db = exports.mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database is connected!');
});

