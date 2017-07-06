const assert = require('assert');
const User = require('../src/user');
const PostSchema = require('../src/post');

describe('Subdocuments', () => {
  it('can add subdocument post to existing user', (done) => {
    const joe = new User({
      name: 'joe', 
      posts: []
    });

    joe.save()
      .then(() => User.findOne({name: 'joe'}))
      .then((user) => {
        user.posts.push({title: 'New post title'});
        return user.save()
      })
      .then(() => User.findOne({name: 'joe'}))
        .then((user) => {
          assert(user.posts[0].title === 'New post title'); 
          done()
        });
  });

  it('can remove an existing subdocument', (done) => {
    const joe = new User({
      name: 'joe', 
      posts: [{title: 'Another post'}]
    });

    joe.save()
      .then(() => User.findOne({name: 'joe'}))
      .then((user) => {
        user.posts[0].remove();
        return user.save()
      })
      .then(() => User.findOne({name: 'joe'}))
      .then((user) => {
        assert(user.posts.length === 0); 
        done()
      })
  });

})
