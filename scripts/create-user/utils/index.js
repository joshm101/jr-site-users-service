const User = require('../../../models/User')

/**
 * Validates credentials for user being created.
 * @param {string} username
 * @param {string} password
 * @return {Promise} - Resolves if credentials are valid
 */
const validateCredentials = (username, password) => {
  return new Promise((resolve, reject) => {
    if (!username) {
      return reject(
        new Error('No username was provided.')
      )
    }
    if (!password) {
      return reject(
        new Error('No password was provided.')
      )
    }

    User.find({ username }).then((results) => {
      if (results.length) {
        return reject(
          new Error('Username already exists.')
        )
      }
      resolve()
    }).catch((error) => {
      console.log('An error occurred while validating the username:')
      console.log('User lookup by username failed.')
      console.error(error.message)
      reject(
        new Error('User DB lookup by username failed.')
      )
    })
  })
}

module.exports = {
  validateCredentials
}
