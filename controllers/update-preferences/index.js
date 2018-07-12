const jwt = require('jsonwebtoken')

const User = require('../../models/User')
const getToken = require('../../utils/get-token')

const onUnexpectedError = (res) => {
  const message = 'An unexpected error occurred while updating ' +
  'user preferences.'
  res.status(500).send({
    message
  })
}

const updatePreferences = (req, res) => {
  const { preferences } = req.body

  if (!preferences) {
    res.status(400).send({
      message: 'No update payload was provided.'
    })
    return
  }

  const { itemsPerPage } = preferences

  const preferencesUpdate = {
    itemsPerPage: itemsPerPage || 10
  }

  const token = getToken(req)
  const decodedToken = jwt.decode(token)

  const { uid } = decodedToken

  User.findByIdAndUpdate(
    uid, { $set: { preferences: preferencesUpdate } }
  ).then(() =>
    res.status(200).send({
      message: 'User preferences were successfully updated!'
    })
  ).catch(() => onUnexpectedError(res))
}

module.exports = updatePreferences
