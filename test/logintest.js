const assert = require('assert');
const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app');


describe('Unit testing the /login route', () => {
  it('should return OK status', async () => {
    return request(app)
      .get('/login')
      .then((response) => {
          assert.equal(response.status, 200)
      })
  });

  it('should return message on rendering', async () => {
    return request(app)
        .get('/login')
        .then(function(response){
            expect(response.text).to.contain('Login');
        })
  });
});