const jwt = require('jsonwebtoken')

const JR_SITE_SECRET = process.env.JR_SITE_SECRET || 'CHANGE_ME'

/**
 * Extracts a JWT from the Authorization header
 * @param {object} req - Express request object
 * @return {string} - JWT to verify
 */
const getToken = (req) => {
  const authorizationHeader = req.get('Authorization')

  if (!authorizationHeader) {
    return undefined
  }

  // Split "Bearer <token>" format
  const authorizationHeaderArray = authorizationHeader.split(' ')
  if (
    !authorizationHeaderArray.length ||
    authorizationHeaderArray.length !== 2
  ) {
    return undefined
  }

  // Get token and return. Token may be undefined.
  // Undefined token case handled by consumer
  const token = authorizationHeaderArray[1]

  return token
}

/**
 * Checks if the provided JWT is valid.
 * @param {object} req - Express request object to
 * extract token from
 * @param {Function} callback - Callback to invoke
 * @return {object} - Object with boolean properties
 * 'exists' and 'valid' for better consumer interpretation
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
