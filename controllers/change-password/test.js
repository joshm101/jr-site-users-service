const chai = require('chai')
const chaiHttp = require('chai-http')

const server = require('../../bin/www')
const dbConnect = require('../../bin/utils/db-connect')
const createUser = require('../../scripts/create-user')
const User = require('../../models/User')

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

describe('change password', () => {
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

  it('should fail when a new password is not provided', (done) => {
    login()
      .then(res => res.body.data)
      .then(token => {
        chai.request(server)
          .post('/api/change-password')
          .set('Authorization', `Bearer ${token}`)
          .end((_, res) => {
            expect(res).to.have.status(400)
            expect(res.body).to.have.property('message')
            done()
          })
      })
  })

  it(
    'should fail when a confirmation password is not provided',
    (done) => {
      login()
        .then(res => res.body.data)
        .then(token => {
          chai.request(server)
            .post('/api/change-password')
            .set('Authorization', `Bearer ${token}`)
            .send({
              newPassword: 'some_new_password'
            })
            .end((_, res) => {
              expect(res).to.have.status(400)
              expect(res.body).to.have.property('message')
              done()
            })
        })
    }
  )

  it('should fail when passwords do not match', (done) => {
    login()
      .then(res => res.body.data)
      .then(token => {
        chai.request(server)
          .post('/api/change-password')
          .set('Authorization', `Bearer ${token}`)
          .send({
            newPassword: 'some_new_password',
            newPasswordConfirm: 'some_new_passwor'
          })
          .end((_, res) => {
            expect(res).to.have.status(400)
            expect(res.body).to.have.property('message')
            done()
          })
      })
  })
})
