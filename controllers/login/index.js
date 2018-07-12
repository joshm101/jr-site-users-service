const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../../models/User')
const JR_SITE_SECRET = process.env.JR_SITE_SECRET || 'CHANGE_ME'

/**
 * Checks to see if username & password have been
 * provided as part of login request.
 * @param {string} username
 * @param {string} password
 * @return {boolean} - Whether or not both username
 * and password have been provided
 */
const credentialsProvided = (username, password) => {
  if (!username || !password) {
    return false
  }
  return true
}

/**
 * Function handler when an error occurs from an external
 * module such as a Mongoose model, jwt, bcrypt, etc.
 * These errors are considered to be internal and unknown
 * to the consuming client.
 * @param {object} res - Express response object
 * @return {void}
 */
const onUnknownError = (res) => {
  res.status(500).send({
    message: 'An unknown error occurred while attempting to login.'
  })
}

/**
 * Function invoked when invalid credentials have been
 * provided to the login endpoint.
 * @param {object} res - Express response object
 * @return {void}
 */
const invalidCredentialsError = (res) => {
  res.status(401).send({
    message: 'Invalid username and/or password.'
  })
}

/**
 * Invoked when credentials have been successfully
 * validated. This function generates a JWT and
 * provides it as a response to the client.
 * @param {object} res - Express response object
 * @param {object} user - Mongoose model object
 * @return {void}
 */
const validCredentialsProvided = (res, user) => {
  jwt.sign({
    expiresIn: '2h',
    issuer: 'jr-site-users-microservice',
    uid: user._id
  }, JR_SITE_SECRET, (error, token) => {
    if (error) {
      onUnknownError(res)
      return
    }

    res.status(200).send({
      data: token,
      message: 'Login successful!'
    })
  })
}

/**
 * This function is invoked when it has been determined
 * that a user whose username matches the provided username
 * exists. The purpose of this function is to determine
 * whether or not the correct password has been provided.
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {object} user - Mongoose User model object
 * @return {void}
 */
const onUserExists = (req, res, user) => {
  const { password } = req.body
  bcrypt.compare(password, user.password).then((validPassword) => {
    if (validPassword) {
      validCredentialsProvided(res, user)
    } else {
      invalidCredentialsError(res)
    }
  }).catch(() => onUnknownError(res))
}

/**
 * Handles user not found event by responding
 * to the client with appropriate status & message.
 * @param {object} res - Express response object
 * @return {void}
 */
const onUserNotFound = (res) => {
  res.status(401).send({
    message: 'Username does not match any known users.'
  })
}

/**
 * Attempts to log in the client based on the
 * provided credentials.
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @return {void}
 */
const login = (req, res) => {
  const { username, password } = req.body

  // Always ensure that username and password have at
  // least been provided.
  if (!credentialsProvided(username, password)) {
    res.status(400).send({
      message: 'Missing username and/or password.'
    })
    return
  }

  User.find({
    username
  }).then((results) => {
    if (results.length) {
      // results.length defined and > 0, a user has
      // been found whose username matches the
      // provided username.
      const user = results[0]
      onUserExists(req, res, user)
    } else {
      // results.length is either not defined or is
      // equal to 0. User not found.
      onUserNotFound(res)
    }
  })
}

module.exports = login
