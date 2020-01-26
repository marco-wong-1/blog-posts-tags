const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const chaiEach = require('chai-each');
const chaiSorted = require('chai-sorted');
const chaiArrays = require('chai-arrays');
const server = require('../index');

chai.use(chaiHttp);
chai.use(chaiEach);
chai.use(chaiSorted);
chai.use(chaiArrays);
describe('Testing API', () => {
  // success ping
  describe('/GET /api/ping', () => {
    it('get a success', (done) => {
      chai.request(server).get('/api/ping').end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.a('object');
        expect(err).to.be.null;
        done();
      })
    })
  });
  // no tags 
  describe('/GET /api/posts', () => {
    it('get an error', (done) => {
      chai.request(server).get('/api/posts').end((err, res) => {
        expect(res).to.have.status(400);
        expect(res).to.be.a('object');
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).to.be.equals('Tag parameter is required');
        expect(err).to.be.null;
        done();
      })
    })
  });
  // spell tag
  describe('/GET /api/posts?tag=tech', () => {
    it('get an error', (done) => {
      chai.request(server).get('/api/posts?tag=tech').end((err, res) => {
        expect(res).to.have.status(400);
        expect(res).to.be.a('object');
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).to.be.equals('Tag parameter is required');
        expect(err).to.be.null;
        done();
      })
    })
  });
  // invalid sortBy 
  describe('/GET /api/posts?tags=tech&sortBy=a', () => {
    it('get an error', (done) => {
      chai.request(server).get('/api/posts?tags=tech&sortBy=a').end((err, res) => {
        expect(res).to.have.status(400);
        expect(res).to.be.a('object');
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).to.be.equals('sortBy parameter is invalid');
        expect(err).to.be.null;
        done();
      })
    })
  });
  // invalid direction 
  describe('/GET /api/posts?tags=tech&direction=b', () => {
    it('get an error', (done) => {
      chai.request(server).get('/api/posts?tags=tech&direction=b').end((err, res) => {
        expect(res).to.have.status(400);
        expect(res).to.be.a('object');
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).to.be.equals('direction parameter is invalid');
        expect(err).to.be.null;
        done();
      })
    })
  });
  // one tags
  describe('/GET /api/posts?tags=tech', () => {
    it('get an object of array having tags tech sorted by id descending', (done) => {
      chai.request(server).get('/api/posts?tags=tech').end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        expect(res.body.posts).to.be.a('array');
        expect(res.body.posts).each.have.all.keys('author','authorId','id','likes','popularity','reads','tags');
        expect(res.body.posts).to.be.sortedBy('id',{descending: false});
        expect(res.body.posts).each.have.property('tags').to.be.containingAnyOf(['tech']);
        expect(res.body.posts.length).to.be.equal(new Set(res.body.posts).size);
        expect(err).to.be.null;
        done();
      })
    })
  });
  // two tags
  describe('/GET /api/posts?tags=tech,science', () => {
    it('get an object of array having tags tech or science sorted by id descending', (done) => {
      chai.request(server).get('/api/posts?tags=tech,science').end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.a('object');
        expect(res.body.posts).to.be.a('array');
        expect(res.body.posts).each.have.all.keys('author','authorId','id','likes','popularity','reads','tags');
        expect(res.body.posts).to.be.sortedBy('id',{descending: false});
        expect(res.body.posts).each.have.property('tags').to.be.containingAnyOf(['tech','science']);
        expect(res.body.posts.length).to.be.equal(new Set(res.body.posts).size);
        expect(err).to.be.null;
        done();
      })
    })
  });
  // one tags sortBy
  describe('/GET /api/posts?tags=science&sortBy=popularity', () => {
    it('get an object of array having tags science sorted by popularity ascending', (done) => {
      chai.request(server).get('/api/posts?tags=science&sortBy=popularity').end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.a('object');
        expect(res.body.posts).to.be.a('array');
        expect(res.body.posts).each.have.all.keys('author','authorId','id','likes','popularity','reads','tags');
        expect(res.body.posts).to.be.sortedBy('popularity',{descending: false});
        expect(res.body.posts).each.have.property('tags').to.be.containingAnyOf(['science']);
        expect(res.body.posts.length).to.be.equal(new Set(res.body.posts).size);
        expect(err).to.be.null;
        done();
      })
    })
  });
  // one tags direction
  describe('/GET /api/posts?tags=history&direction=desc', () => {
    it('get an object of array having tags history sorted by id descending', (done) => {
      chai.request(server).get('/api/posts?tags=history&direction=desc').end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.a('object');
        expect(res.body.posts).to.be.a('array');
        expect(res.body.posts).each.have.all.keys('author','authorId','id','likes','popularity','reads','tags');
        expect(res.body.posts).to.be.sortedBy('id',{descending: true});
        expect(res.body.posts).each.have.property('tags').to.be.containingAnyOf(['history']);
        expect(res.body.posts.length).to.be.equal(new Set(res.body.posts).size);
        expect(err).to.be.null;
        done();
      })
    })
  });
  // one tags sortBy direction
  describe('/GET /api/posts?tags=health&sortBy=reads&direction=asc', () => {
    it('get an object of array having tags health sorted by reads ascending', (done) => {
      chai.request(server).get('/api/posts?tags=health&sortBy=reads&direction=asc').end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.a('object');
        expect(res.body.posts).to.be.a('array');
        expect(res.body.posts).each.have.all.keys('author','authorId','id','likes','popularity','reads','tags');
        expect(res.body.posts).to.be.sortedBy('reads',{descending: false});
        expect(res.body.posts).each.have.property('tags').to.be.containingAnyOf(['health']);
        expect(res.body.posts.length).to.be.equal(new Set(res.body.posts).size);
        expect(err).to.be.null;
        done();
      })
    })
  });
  // three tags sortBy direction
  describe('/GET /api/posts?tags=tech,science,history&sortBy=likes&direction=desc', () => {
    it('get an object of array having tags tech or science or history sorted by likes descending', (done) => {
      chai.request(server).get('/api/posts?tags=tech,science,history&sortBy=likes&direction=desc').end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.a('object');
        expect(res.body.posts).to.be.a('array');
        expect(res.body.posts).each.have.all.keys('author','authorId','id','likes','popularity','reads','tags');
        expect(res.body.posts).to.be.sortedBy('likes',{descending: true});
        expect(res.body.posts).each.have.property('tags').to.be.containingAnyOf(['tech','history','science']);
        expect(res.body.posts.length).to.be.equal(new Set(res.body.posts).size);
        expect(err).to.be.null;
        done();
      })
    })
  });
  // three tags sortBy direction
  describe('/GET /api/posts?tags=tech,science,history&sortBy=likes&direction=desc', () => {
    it('get an object of array having tags tech or science or history sorted by likes descending', (done) => {
      chai.request(server).get('/api/posts?tags=tech,science,history&sortBy=likes&direction=desc').end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.a('object');
        expect(res.body.posts).to.be.a('array');
        expect(res.body.posts).each.have.all.keys('author','authorId','id','likes','popularity','reads','tags');
        expect(res.body.posts).to.be.sortedBy('likes',{descending: true});
        expect(res.body.posts).each.have.property('tags').to.be.containingAnyOf(['tech','history','science']);
        expect(res.body.posts.length).to.be.equal(new Set(res.body.posts).size);
        expect(err).to.be.null;
        done();
      })
    })
  });
});