const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
  let joe, patty, tyler, sarah;

  beforeEach((done) => {
    joe = new User({name: 'joe'}); 
    patty = new User({name: 'patty'}); 
    tyler = new User({name: 'tyler'}); 
    sarah = new User({name: 'sarah'}); 

    Promise.all([patty.save(), joe.save(), tyler.save(), sarah.save()])
      .then(() => done());
  });

  it('finds all users', (done) => {
    User.find({})
      .then((users) => {
        assert(users.length === 4);
        done()
      })
  })

  it('finds all users with the name of Joe', (done) => {
    User.find({name: 'joe'})
      .then((users) => {
        assert(String(joe._id) === String(users[0]._id));
        done();
      });
  });

  it('finds a single user with the name of Joe', (done) => {
    User.findOne({_id: joe._id})
      .then((user) => {
        assert(user.name === joe.name);
        done();
      });
  });

  it('can skip and limit the result set', (done) => {
    User.find({})
      .sort({name: 1})
      .skip(1)
      .limit(2)
      .then((users) => {
        assert(users.length === 2);
        assert(users[0].name === 'patty');
        assert(users[1].name === 'sarah'); 
        done();
      });
  })

});
