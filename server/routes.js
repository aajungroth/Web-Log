var Html = require('./models/html.js');
const path = require('path');

exports.init = function(app) {
  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../index.html'));
  });

  app.get('/ids', function(req, res) {
    Html.get(function(err, results) {
      if (err) {
        res.status(520)
        console.error(err);
        return;
      }
      res.status(200);
      console.log('results', results);
      res.send({jobs: results});
    })
  });

  app.post('/url', function(req, res) {
    console.log('/url req.body', req.body);
    Html.create(req.body.url, function(err) {
      if (err) {
        res.status(520)
        console.error(err);
        return;
      }
      res.status(201);
      res.send('Url received!');
    });
  });

  app.post('/id', function(req, res) {
    console.log('/id req.body', req.body);
    Html.getOne(req.body.jobId, function(err, result) {
      //console.log('result', result);
      if (err) {
        res.status(520)
        console.error(err);
        return;
      } else if (result === null) {
        res.status(201);
        res.send('notFound.html');
        //res.redirect('notFound.html');
        //res.sendFile(path.join(__dirname + '/../notFound.html'));
      } else if (result.html === '') {
        res.status(201);
        res.send('loading.html');
        //res.redirect('loading.html');
        //res.send(path.join(__dirname + '/../loading.html'));
      } else {
        //grab html
        res.status(201);
        //res.send('Id received!');
        res.send(result.html);
      }
    });
  });
};
