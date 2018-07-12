const chai = require('chai')
const chaiHttp = require('chai-http')

const server = require('../../bin/www')
const dbConnect = require('../../bin/utils/db-connect')
const User = require('../../models/User')
const createUser = require('../../scripts/create-user')

chai.use(chaiHttp)
const { expect } = chai

describe('check token validity', () => {
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

  it('should fail when a token is not provided', (done) => {
    Promise.all([
      chai.request(server)
        .get('/api/token-valid')
        .set('Authorization', ''),
      chai.request(server)
        .get('/api/token-valid')
        .set('Authorization', 'Bearer'),
      chai.request(server)
        .get('/api/token-valid')
    ]).then((responses) => {
      responses.forEach(response => {
        expect(response).to.have.status(400)
        expect(response.body).to.have.property('message')
      })
      done()
    })
  })

  it('should fail when an invalid token is provided', (done) => {
    chai.request(server)
      .get('/api/token-valid')
      .set('Authorization', 'Bearer abcdefg')
      .end((_, res) => {
        expect(res).to.have.status(401)
        expect(res.body).to.have.property('message')
        expect(res.body).to.have.property('data')
        expect(res.body.data).to.equal(false)
        done()
      })
  })

  it('should succeed when a valid token is provided', (done) => {
    chai.request(server)
      .post('/api/login')
      .send({
        username: 'test_user',
        password: 'test_password'
      })
      .then((response) => {
        const token = response.body.data
        chai.request(server)
          .get('/api/token-valid')
          .set('Authorization', `Bearer ${token}`)
          .end((_, res) => {
            expect(res).to.have.status(200)
            expect(res.body).to.have.property('message')
            expect(res.body).to.have.property('data')
            expect(res.body.data).to.equal(true)
            done()
          })
      })
  })
})
