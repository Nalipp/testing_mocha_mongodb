const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middleware', () => {
  let joe, blogPost;

  beforeEach((done) => {
    joe = new User({name: 'joe'});
    blogPost = new BlogPost({title: 'JS is great', contents: 'I love it'});

    joe.blogPosts.push(blogPost);
    
    Promise.all([joe.save(), blogPost.save()])
      .then(() => done());
  });

  it('removes dangling blog posts after removing user', (done) => {
    joe.remove()
      .then(() => BlogPost.count())
      .then((count) => {
        assert(count === 0);
        done()
      });
  });
});
