const jwt = require('jsonwebtoken')

const getToken = require('../get-token')

const JR_SITE_SECRET = process.env.JR_SITE_SECRET || 'CHANGE_ME'

/**
 * Checks if the provided JWT is valid.
 * @param {object} req - Express request object to
 * extract token from
 * @param {Function} callback - Callback to invoke
 * @return {void}
 */
const tokenValid = (req, callback) => {
  const token = getToken(req)

  if (!token) {
    // if the token does not exist, the callback is invoked
    // with undefined parameters.
    callback(undefined, undefined)
  }

  jwt.verify(token, JR_SITE_SECRET, callback)
}

module.exports = tokenValid
