const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({name: 'joe'}); 
    joe.save()
      .then(() => done());
  });

  it('Finds all users with the name of Joe', (done) => {
    User.find({name: 'joe'})
      .then((users) => {
        assert(String(joe._id) === String(users[0]._id));
        done();
      });
  });

  it('Finds a single user with the name of Joe', (done) => {
    User.findOne({_id: joe._id})
      .then((user) => {
        assert(user.name === joe.name);
        done();
      });
  });

});
