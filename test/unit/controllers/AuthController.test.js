var request = require('super-request');

describe('AuthController', function() {

  var tenantId = 'localhost:1337';

  before(function(done) {
    User.tenant(tenantId).destroy({}).exec(function(err) {
      done();
    });
  });

  describe('#register()', function() {

    it('should not register with invalid tenant', function (done) {
      request(sails.hooks.http.app)
        .post('/auth/local/register')
        .form({
          username:   'test',
          email:      'test@test.co',
          password:   'sails123'
        })
        .headers({'host': "invalidtenant"})
        .expect(302) // redirected
        .expect('location','/register', done); // Go back to Register view
    });

    it('should not register with invalid password', function (done) {
      request(sails.hooks.http.app)
        .post('/auth/local/register')
        .form({
          username:   'test',
          email:      'test@test.co',
          password:   'test'
        })
        .headers({'host': tenantId})
        .expect(302) // redirected
        .expect('location','/register', done); // Go back to Register view
    });

    it('should register user', function (done) {
      request(sails.hooks.http.app)
        .post('/auth/local/register')
        .form({
          username:   'test',
          email:      'test@test.co',
          password:   'sails123'
        })
        .headers({'host': tenantId})
        .expect(302) // redirected
        .expect('location','/', done); // Successfully registered
        // .end(function(err, res) {
        //   console.log(err, res);
        //   done();
        // });
    });

  });

});
