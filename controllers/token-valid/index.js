const tokenValidUtil = require('../../utils/token-valid')

/**
 * Invoked when token check process is complete.
 * Completion of token check process does not
 * imply that the token is valid. This function
 * interprets the result and responds to the
 * client accordingly.
 * @param {object} res - Express response object
 * @param {object} err - Token check error object
 * @param {string} decoded - Decoded JWT
 */
const onTokenCheckComplete = (res, err, decoded) => {
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

  res.status(200).send({
    data: true,
    message: 'Valid token.'
  })
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
  tokenValidUtil(req, (err, decoded) =>
    onTokenCheckComplete(res, err, decoded)
  )
}

module.exports = tokenValid
