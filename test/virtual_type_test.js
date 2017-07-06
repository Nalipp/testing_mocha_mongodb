const assert = require('assert');
const User = require('../src/user');

describe('Virtual types', () => {
  it('returns postCount as post.length', (done) => {
    const joe = new User({
      name: 'joe',
      posts: [{title: 'New post'}, {title: 'Post two'}]
    })

    joe.save()
      .then((user) => {
        assert(user.postCount === 2);
        done()
      });
  });
  
});
