const assert = require('assert');
const User = require('../src/user');

describe('Validates records', () => {
  let joe;

  it('requires a user name', () => {
    const user = new User({name: undefined});
    const validationResult = user.validateSync();
    const message = validationResult.errors.name.message;
    assert(message === 'Name is required.');
  });

  it('requires a user name length greater than 2', () => {
    const user = new User({name: 'al'});
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name
    assert(message === 'Name must be longer than two characters');
  });

  it('disallows invalid records from being saved', (done) => {
    const user = new User({name: 'al'});
    user.save()
      .then(() => User.findOne({name: 'al'}))
      .catch((validationResult) => {
        const { message } = validationResult.errors.name;  
        assert(message === 'Name must be longer than two characters');
        done();
      });
  });
});

