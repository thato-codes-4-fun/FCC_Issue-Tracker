const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
const Issue = require('../model/issue')

chai.use(chaiHttp);

suite('Functional Tests', function() {
  this.timeout(3000)
  suite('Integration tests with chai', ()=> {
    test('GET request to /api/issues/apitester', function(done){
      chai
      .request(server)
      .get('/api/issues/testget')
      .end(function(err, res){
        assert.equal(res.status, 200)
        assert.equal(res.text, '[{"_id":"643effe2f7f9d9e28b4acb31","issue_title":"Fix error in posting data","issue_text":"When we post data it has an error.","created_by":"max","assigned_to":"Joe","status_text":"In QA","open":true,"created_on":"2023-04-18T20:38:58.391Z","updated_on":"2023-04-18T20:38:58.391Z"}]')
        done()
      })
    })

    test('View issues on a project with one filter', function(done){
      chai
      .request(server)
      .get('/api/issues/testget?issue_title=Fix error in posting data')
      .end(function(err, res){
        assert.isOk(res.status)
        assert.equal(res.text, '[{"_id":"643effe2f7f9d9e28b4acb31","issue_title":"Fix error in posting data","issue_text":"When we post data it has an error.","created_by":"max","assigned_to":"Joe","status_text":"In QA","open":true,"created_on":"2023-04-18T20:38:58.391Z","updated_on":"2023-04-18T20:38:58.391Z"}]');
        done()
      })
    })

    test('View issues on a project with multiple filters', function(done){
      chai
      .request(server)
      .get('/api/issues/testget?issue_title=Fix error in posting data&created_by=max')
      .end(function(err, res){
        //asserts
        assert.equal(res.status, 200)
        assert.equal(res.text, '[{"_id":"643effe2f7f9d9e28b4acb31","issue_title":"Fix error in posting data","issue_text":"When we post data it has an error.","created_by":"max","assigned_to":"Joe","status_text":"In QA","open":true,"created_on":"2023-04-18T20:38:58.391Z","updated_on":"2023-04-18T20:38:58.391Z"}]')
        done()
      })
    })

    test('Create an issue with every field', function(done){
      let issue = new Issue({
        issue_title: "Fix error in posting data",
        issue_text: "When we post data it has an error.",
        created_by: "max",
        assigned_to: "Joe",
        open: true,
        status_text: "In QA",
        project: "testpost"
      })
      chai
      .request(server)
      .post('/api/issues/testpost')
      .send(issue)
      .end(function(err,res){
        assert.equal(res.status, 200)
        let data = res.body
        assert.equal(data.assigned_to,"Joe" )
        assert.equal(data.status_text,"In QA" )
        done()
      })
    })

    test('Create an issue with only required fields', function(done){
        let issue = new Issue({
            issue_title: "Fix error in posting data",
            issue_text: "When we post data it has an error.",
            created_by: "max",
            project: "testpost"
          })
      chai
      .request(server)
      .post('/api/issues/testpost')
      .send(issue)
      .end(function(err, res){
        assert.equal(res.status, 200)
         assert.equal(res.body.created_by, 'max')
        assert.equal(res.body.issue_title, "Fix error in posting data")
        done()
      })
    })

    test('Create an issue with missing required fields', function(done){
      let issue = new Issue({
        error: 'missing fields object'
      })
      chai
      .request(server)
      .post('/api/issues/testpost')
      .send(issue)
      .end(function(err, res){
        //assert here 
        assert.equal(res.status, 200)
        assert.equal(res.body.error, 'required field(s) missing')
        done()
      })
    })
<<<<<<< HEAD

    test('Update one field on an issue', function(done){
      let item = {
        _id: '643f06f38d3931ec093e313f',
        assigned_to: 'KAbelo' 
      }
      chai
      .request(server)
      .keepOpen()
      .put('/api/issues/apitest/')
      .send(item)
      .end(function(err, res){
        //assert here
        assert.equal(res.status, 200)
        assert.equal(res.text, '{"result":"successfully updated","_id":"643f06f38d3931ec093e313f"}')
        done()
      })
    })

    test('Update multiple fields on an issue', function(done){
      let item = {
        _id: '643f06f38d3931ec093e313f',
        assigned_to: 'KAbelo',
        issue_text: 'updating in the tests...'
      }
      chai
      .request(server)
      .keepOpen()
      .put('/api/issues/apitest/')
      .send(item)
      .end(function(err, res){
        assert.equal(res.status, 200)
                assert.equal(res.text, '{"result":"successfully updated","_id":"643f06f38d3931ec093e313f"}')
        done()
      })
      
    })

    test('Update an issue with missing _id', function(done){
      let item = {
        assigned_to: 'KAbelo',
        issue_text: 'updating in the tests...'
      }
      chai
      .request(server)
      .keepOpen()
      .put('/api/issues/apitest/')
      .send(item)
      .end(function(err, res){
        assert.equal(res.status, 200)
        assert.equal(res.text, '{"error":"missing _id"}')
        done()
      })
    })

    test('Update an issue with no fields to update', function(done){
      let item = {
        _id: '643f06f38d3931ec093e313f',
      }
      chai
      .request(server)
      .keepOpen()
      .put('/api/issues/apitest/')
      .send('object here')
      .end(function(err, res){
        assert.equal(res.status, 200)
        //TODO FIXHERE
        assert.equal(res.text, '{"error":"missing _id"}')
        done()
      })
    })

    test('Update an issue with an invalid _id', function(done){
      let item = {
        _id: 'invalid id',
        assigned_to: 'Betty'
      }
      chai
      .request(server)
      .keepOpen()
      .put('/api/issues/apitest/')
      .send(item)
      .end(function(err, res){
        assert.equal(res.status, 200)
        assert.equal(res.text, '{"error":"could not update","_id":"invalid id"}')
        done()
      })
    })
=======
>>>>>>> b66eace380b9777814849072b152b19fc6f01a52
    
  })
});


after(function() {
  chai.request(server)
    .get('/')
});
