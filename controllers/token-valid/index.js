const jwt = require('jsonwebtoken')

const JR_SITE_SECRET = process.env.JR_SITE_SECRET || 'CHANGE_ME'

/**
 * Function to handle event that a token
 * was not provided in request headers.
 * @param {object} res - Express response object
 * @return {void}
 */
const onTokenNotProvided = (res) => {
  res.status(400).send({
    message: 'A token was not provided.'
  })
}

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
 * Checks if the provided JWT is valid. Responds with
 * 400 code if token is not provided, 401 if the token
 * is invalid, 200 if the token is valid.
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @return {void}
 */
const tokenValid = (req, res) => {
  const token = getToken(req)

  if (!token) {
    onTokenNotProvided(res)
  }

  jwt.verify(token, JR_SITE_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).send({
        data: false,
        message: 'An invalid token was provided.'
      })
      return
    }

    res.status(200).send({
      data: true,
      message: 'Valid token.'
    })
  })
}

module.exports = tokenValid
