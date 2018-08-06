require('dotenv').config({path: './../.env'});
const bodyParser = require('body-parser');
const morgan = require('morgan');

exports.init = function(app) {
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());
  app.use(morgan('combined'));
};
