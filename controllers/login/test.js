const chai = require('chai')
const chaiHttp = require('chai-http')

const server = require('../../bin/www')
const dbConnect = require('../../bin/utils/db-connect')
const createUser = require('../../scripts/create-user')

const User = require('../../models/User')

chai.use(chaiHttp)
const expect = chai.expect

describe('user login', () => {
  before((done) => {
    // connect to the database, clear all users,
    // and create a user for use in tests
    dbConnect().then(() => {
      User.remove({}).then(() => {
        createUser(
          'test_user', 'test_password'
        ).then(() => done())
      })
    })
  })

  it('should fail when no credentials are provided', (done) => {
    chai.request(server)
      .post('/api/login')
      .send({})
      .end((_, res) => {
        expect(res).to.have.status(400)
        expect(res.body).to.have.property('message')
        done()
      })
  })

  it('should fail when only a username is provided', (done) => {
    chai.request(server)
      .post('/api/login')
      .send({
        username: 'test_user'
      })
      .end((_, res) => {
        expect(res).to.have.status(400)
        expect(res.body).to.have.property('message')
        done()
      })
  })

  it('should fail when only a password is provided', (done) => {
    chai.request(server)
      .post('/api/login')
      .send({
        password: 'some_password'
      })
      .end((_, res) => {
        expect(res).to.have.status(400)
        expect(res.body).to.have.property('message')
        done()
      })
  })

  it('should fail when incorrect credentials are provided', (done) => {
    chai.request(server)
      .post('/api/login')
      .send({
        username: 'test_user',
        password: 'test_passwors'
      })
      .end((_, res) => {
        expect(res).to.have.status(401)
        expect(res.body).to.have.property('message')
        done()
      })
  })

  it('should succeed when correct credentials are provided', (done) => {
    chai.request(server)
      .post('/api/login')
      .send({
        username: 'test_user',
        password: 'test_password'
      })
      .end((_, res) => {
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('message')
        expect(res.body).to.have.property('data')
        done()
      })
  })
})
