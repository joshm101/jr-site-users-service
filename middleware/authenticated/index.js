const tokenValidUtil = require('../../utils/token-valid')

/**
 * Invoked when token check process is complete.
 * Completion of token check process does not
 * imply that the token is valid. This function
 * interprets the result and responds to the
 * client in the event of an error, or calls
 * next() if token is valid
 * @param {object} res - Express response object
 * @param {Function} next - Express next() middleware function
 * @param {object} err - Token check error object
 * @param {string} decoded - Decoded JWT
 */
const onTokenCheckComplete = (res, next, err, decoded) => {
  if (!err && !decoded) {
    // case where a token is not provided
    res.status(400).send({
      message: 'A token was not provided.'
    })
    return
  }

  if (err) {
    res.status(401).send({
      data: false,
      message: 'An invalid token was provided.'
    })
    return
  }

  // token is valid, invoke next middleware.
  next()
}

const authenticated = (req, res, next) => {
  tokenValidUtil(req, (err, decoded) =>
    onTokenCheckComplete(res, next, err, decoded)
  )
}

module.exports = authenticated
