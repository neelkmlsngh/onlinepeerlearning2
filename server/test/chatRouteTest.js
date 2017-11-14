process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const app = require('./../bin/www');
const chatModel = require('./../api/login/login.entity');
const chatMsgModel = require('./../api/chat/chat.entity')
const expect = require('chai').expect
const supertest = require('supertest')
const sinon = require('sinon');
const chatStub = sinon.stub(chatModel, 'findOne')
const getChatMsg = sinon.stub(chatMsgModel, 'find')

describe('test cases for chat---to find if user exists or not', () => {
    chatStub.yields(null, { "userName": "testUser", "userId": "123", "updatedAt": "10 Nov 2017", "updatedAt": "3 July 2017", "online": "Y", "timestamp": 1, "socketId": "123abc" })

    it('positive test case', (done) => {
        supertest(app).post('/api/chat/checkUserSession')
            .send({ "userName": "testUser", "userId": "123", "updatedAt": "10 Nov 2017", "updatedAt": "3 July 2017", "online": "Y", "timestamp": 1, "socketId": "123abc" })
            .end((err, res) => {
                if (err) {
                    return done(err)
                } else if (res) {
                    expect(res.body.status).to.be.equal(200)
                    console.log(res.body)
                    done()
                }
            })
    })

    it('negative test case', (done) => {
        supertest(app).post('/api/chat/checkUserSession')
            .send({ "userName": "testUser", "userId": "123", "updatedAt": "10 Nov 2017", "updatedAt": "3 July 2017", "online": "Y", "timestamp": 1, "socketId": "123abc" })
            .end((err, res) => {
                if (err) {
                    return done(err)
                } else if (res) {
                    expect(res.body.status).not.to.be.equal(201)
                    console.log(res.body)
                    done()
                }
            })
    })

})