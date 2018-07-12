const chai = require('chai')
const chaiHttp = require('chai-http')

const server = require('../../bin/www')
const dbConnect = require('../../bin/utils/db-connect')
const User = require('../../models/User')
const createUser = require('../../scripts/create-user')

chai.use(chaiHttp)
const { expect } = chai

const login = () => (
  chai.request(server)
    .post('/api/login')
    .send({
      username: 'test_user',
      password: 'test_password'
    })
)

describe('update user preferences', () => {
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
    chai.request(server)
      .post('/api/change-password')
      .end((_, res) => {
        expect(res).to.have.status(400)
        expect(res.body).to.have.property('message')
        done()
      })
  })

  it('should fail when a payload is not provided', (done) => {
    login()
      .then(res => res.body.data)
      .then(token => {
        chai.request(server)
          .put('/api/update-preferences')
          .set('Authorization', `Bearer ${token}`)
          .end((_, res) => {
            expect(res).to.have.status(400)
            expect(res.body).to.have.property('message')
            done()
          })
      })
  })

  it('should succeed when a payload is provided', (done) => {
    login()
      .then(res => res.body.data)
      .then(token => {
        chai.request(server)
          .put('/api/update-preferences')
          .set('Authorization', `Bearer ${token}`)
          .send({
            preferences: {
              itemsPerPage: 4
            }
          })
          .end((_, res) => {
            expect(res).to.have.status(200)
            expect(res.body).to.have.property('message')
            done()
          })
      })
  })
})
