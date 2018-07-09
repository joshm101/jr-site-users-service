const chai = require('chai')

const User = require('../../../models/User')
const dbConnect = require('../../../bin/utils/db-connect')
const utils = require('./index')

const { validateCredentials } = utils
const { expect } = chai

describe('validate credentials', () => {
  beforeEach((done) => {
    dbConnect().then(() => {
      User.remove({}).then(() => {
        done()
      })
    })
  })

  it('rejects when a username is not provided', () => {
    return validateCredentials('', 'test_password').then(
      () => {
        throw new Error('Should not have resolved.')
      },
      (error) => {
        expect(error).to.be.an.instanceof(Error)
      }
    )
  })

  it('rejects when a password is not provided', () => {
    return validateCredentials('user', '').then(
      () => {
        throw new Error('Should not have resolved.')
      },
      (error) => {
        expect(error).to.be.an.instanceof(Error)
      }
    )
  })

  it('rejects when provided username already exists', () => {
    return User.create({
      username: 'test_user',
      password: 'test_password'
    }).then(() =>
      validateCredentials(
        'test_user', 'test_password'
      ).then(
        () => {
          throw new Error('Should not have resolved.')
        },
        (error) => {
          expect(error).to.be.an.instanceof(Error)
        }
      )
    )
  })
})
