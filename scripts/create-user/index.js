/**
 * User creation is not a "typical" use-case. This means
 * user creation should not be exposed via this service's API.
 * This script is inteded to be triggered via the command-line
 * only. Only someone with the proper MongoDB access (necessary
 * username & password env variables) should be able to create
 * users.
 */

const bcrypt = require('bcrypt')

const User = require('../../models/User')
const utils = require('./utils/index')

const { validateCredentials } = utils
const saltRounds = 10

/**
 * User creation error handler. Invoked when user data
 * was not successfully written to the database.
 * @param {Error} error - MongoDB write Error object
 * @return {void}
 */
const onUserCreationError = (error) => {
  console.log('An error occurred while creating the user:')
  console.log(
    'There was an error while writing the user to the database.'
  )
  console.log('The user was not created. Here is the provided error:')
  console.error(error.message)
}

/**
 * User password hash error handler. Invoked when bcrypt
 * is not able to successfully hash the provided password.
 * @param {Error} error - bcrypt hash Error object
 * @return {void}
 */
const onPasswordHashError = (error) => {
  console.log('An error occurred while creating the user:')
  console.log('There was an error while hashing the provided password.')
  console.log('The user was not created. Here is the provided error:')
  console.error(error.message)
}

/**
 * User password hash success handler. Invoked when bcrypt
 * successfully hashes the provided password.
 * @param {string} username - Username to be used in next
 * step of user creation process
 * @param {string} hash - bcrypt hash() output
 * @return {void}
 */
const onPasswordHashSuccess = (username, hash) => {
  User.create({
    username,
    password: hash
  }).then(onUserCreationSuccess).catch(onUserCreationError)
}

/**
 * User creation success handler. Invoked when user data
 * was successfully written to the database.
 * @param {object} user - MongoDB User model object
 * @return {void}
 */
const onUserCreationSuccess = (user) => {
  console.log(`The user ${user.username} was successfully created.`)
}

/**
 * Writes the provided username and password to the
 * database, effectively creating a new User object.
 * @param {string} username - User's username
 * @param {string} password - User's password to be hashed & stored
 * @return {void}
 */
const createUser = (username, password) => {
  validateCredentials(username, password).then(() => {
    bcrypt.hash(
      password, saltRounds
    ).then(hash =>
      onPasswordHashSuccess(username, hash)
    ).catch(onPasswordHashError)
  }).catch((error) => {
    console.log('An error occurred while validating user credentials:')
    console.error(error.message)
    console.log('The user was not created.')
  })
}

module.exports = createUser
