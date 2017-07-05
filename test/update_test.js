const assert = require('assert');
const User = require('../src/user');

describe('Updating Records', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({name: 'joe', postCount: 2});
    joe.save()
      .then(() => done());
  });

  function assertName(opperation, done) {
    opperation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'nate');
        done();
      });
  }

  it('model instance update set and save user', (done) => {
    joe.set('name', 'nate');
    assertName(joe.save(), done);
  });

  it('model instance update user', (done) => {
    assertName(
      joe.update({name: 'nate'}), 
      done
    );
  });

  it('model class method update user', (done) => {
    assertName(
      User.update({'name': 'joe'}, {name: 'nate'}), 
      done
    );
  });

  it('model class method findOneAndUpdate user', (done) => {
    assertName(
      User.findOneAndUpdate({name: 'joe'}, {name: 'nate'}), 
      done
    );
  });

  it('model class method findByIdAndUpdate user', (done) => {
    assertName(
      User.findByIdAndUpdate(joe._id, {name: 'nate'}),
      done
    );
  });

  it('updates a user post coun by one', (done) => {
    User.update({}, {$inc: {postCount: 2}})
      .then(() => User.findOne({_id: joe._id}))
      .then((user) => {
        assert(user.postCount === 4);
        done(); 
      })
  })
});
