const express = require('express');
const app = express();
const config = require('./server_config.js');
const routes = require('./routes.js');

const port = 8000;

app.use(express.static('public'));
config.init(app);
routes.init(app);

app.listen(port, function() {
  console.log('Listening on port ' + port + '!');
});
