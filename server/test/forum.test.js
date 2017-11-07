let supertest = require('supertest');
let chai = require('chai');
let sinon = require('sinon');
let url = 'https://localhost:4200'; //application running port
let app = require('./../app/app');
const forumModel = require('./../api/forums/forum.entity');
let forumGetStub = sinon.stub(forumModel, 'find');


describe('test fetch data of locationchange access card', () => {
    before(() => {
        forumGetStub.yields(null, {
            questionTitle: 'What is a NullPointerException, and how do I fix it?',
            problemDescription: 'What are Null Pointer Exceptions (java.lang.NullPointerException) and what causes them? What methods/tools can be used to determine the cause so that you stop the exception from causing the program ',
            codeSnippet: '<html></html>',
            tags: 'Angularjs,Nodejs',
            date: '21/11/2017'
        });
    });
    //positive test case for fetch location change record    
    it('positive case for getting data from forum', (done) => {
        supertest(url)
            .get('/')
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) return done(err);
                chai.expect(res.body.data. questionTitle).to.equal('What is a NullPointerException, and how do I fix it?');
                done();
            });
    });

    //negative test case for fetch location change record  
    it(' negative case of from forum', (done) => {
        supertest(url)
            .get('/locationchange/findlocation')
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) return done(err);
                chai.expect(res.body.data. questionTitle).not.to.equal('What is a NullPointerException');
                done();
            });
    });
});