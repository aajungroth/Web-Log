var request = require('supertest');

describe('loading express', function() {
  var server;

  beforeEach(function() {
    delete require.cache[require.resolve('./server')];
    server = require('./server');
  });

  it('responds to /', function(done) {
    request(server)
      .get('/')
      .expect(200, done);
  });

  it('responds to /ids', function(done) {
    request(server)
      .get('/ids')
      .expect(200, done);
  });

  it('responds to /url', function(done) {
    request(server)
      .post('/url')
      .expect(201, done);
  });

  it('responds to /id', function(done) {
    request(server)
      .post('/id')
      .expect(201, done);
  });

  it('404 everything else', function(done){
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });

  afterEach(function(done) {
     server.close(done);
  });

});
