const request = require('supertest');
const express = require('express');

const www = require('../bin/www');

console.log('server.address().port');
console.log(www);
 
const app = express();
 
app.get('/api/forums', function(req, res) {
  res.status(200).json({ name: 'tobi' });
});
 
describe('GET /users', function() {
  it('respond with json', function(done) {
    request(app)
      .get('/api/forums')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});