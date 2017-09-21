const path = require('path');

exports.init = function(app) {
  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../index.html'));
  });

  app.get('/ids', function(req, res) {
    res.send({jobIds: [7, 8, 9]});
  });

  app.post('/url', function(req, res) {
    console.log(req.body);
    res.status(201);
    res.send('Url received!');
  });

  app.post('/id', function(req, res) {
    console.log(req.body);
    res.send('Id received!');
  });
};
