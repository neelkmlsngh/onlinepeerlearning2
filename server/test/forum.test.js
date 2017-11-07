let app = require('./../app/app');
const forumModel = require('./../api/forums/forum.entity');

let expect = require('chai').expect
let supertest = require('supertest')
let sinon = require('sinon');
let forumGetStub = sinon.stub(forumModel, 'find');

/*let model = require("../model/empSchema")
let modelStub = sinon.stub(model, 'find')
let modelsave = sinon.stub(model.prototype, 'save')
let modelupdate = sinon.stub(model, 'update')
let modeldelete = sinon.stub(model, 'remove')*/
var url = supertest("https://localhost:8080")


describe('test fetch data of locationchange access card', () => {
 /*   before(() => {
        forumGetStub.yields(null, {
            questionTitle: 'What is a NullPointerException, and how do I fix it?',
            problemDescription: 'What are Null Pointer Exceptions (java.lang.NullPointerException) and what causes them? What methods/tools can be used to determine the cause so that you stop the exception from causing the program ',
            codeSnippet: '<html></html>',
            tags: 'Angularjs,Nodejs',
            date: '21/11/2017'
        });
    });
*/
    forumGetStub.yields(null, {"name": "Prakhar"})
    it("find employees", function(done) {
       
        url
            .get("/api/forums")
     /*       .expect(201)
            .expect('Content-Type', /json/)*/
            .end(function(err, res) {
              /*  if (err) {
                    throw err
                }*/
                console.log("err"+err);
                console.log("res"+res);
                expect(res.body.name).to.be.equal('Prakhar')
                done();

            })
    })

    //positive test case for fetch location change record    
/*    it('positive case for getting data from forum', (done) => {
        supertest(url)
            .get('/api/forums')
            .expect(201)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) return done(err);
                console.log("res"+res)
                expect(res.body.data. questionTitle).to.equal('What is a NullPointerException, and how do I fix it?');
                done();
            });
    });*/

    //negative test case for fetch location change record  
/*    it(' negative case of from forum', (done) => {
        supertest(url)
            .get('/locationchange/findlocation')
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) return done(err);
                chai.expect(res.body.data. questionTitle).not.to.equal('What is a NullPointerException');
                done();
            });
    });*/
});