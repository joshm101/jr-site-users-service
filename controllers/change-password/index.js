const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../../models/User')
const getToken = require('../../utils/get-token')

const saltRounds = 10

/**
 * Handler function for unexpected errors thrown
 * by 3rd-party packages/modules such as bcrypt,
 * mongoose, etc. Responds with a 500 status code,
 * internal server error.
 * @param {object} res - Express response object
 * @return {void}
 */
const onExternalPackageError = (res) => {
  const message = 'An unexpected error occurred while changing passwords.'
  res.status(500).send({ message })
}

/**
 * Handler function for new password hash success. Updates
 * the user with the new password hash
 * @param {object} res - Express response object
 * @param {string} uid - ID of user to update
 * @param {string} hash - Hash of new password
 * @return {void}
 */
const onPasswordHashSuccess = (res, uid, hash) => {
  User.findByIdAndUpdate(uid, { $set: { password: hash } }).then(() =>
    res.status(200).send({
      message: 'Password was successfully changed!'
    })
  ).catch(() => onExternalPackageError(res))
}

/**
 * Changes a user's password to new password provided
 * in request body
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @return {void}
 */
const changePassword = (req, res) => {
  const { newPassword, newPasswordConfirm } = req.body

  // Conduct preliminary new password/confirmation
  // existence checks
  if (!newPassword) {
    res.status(400).send({
      message: 'A new password was not provided.'
    })
    return
  }

  if (!newPasswordConfirm) {
    res.status(400).send({
      message: 'New password confirmation is missing.'
    })
    return
  }

  if (newPassword !== newPasswordConfirm) {
    res.status(400).send({
      message: 'New password and password confirmation do not match.'
    })
    return
  }

  // At this point, newPassword & newPassword are defined
  // and are matching
  const token = getToken(req)
  const decodedToken = jwt.decode(token)

  const { uid } = decodedToken

  bcrypt.hash(newPassword, saltRounds).then(hash =>
    onPasswordHashSuccess(res, uid, hash)
  ).catch(() => onExternalPackageError(res))
}

module.exports = changePassword
