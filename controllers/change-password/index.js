const changePassword = (req, res) => {
  const { newPassword, newPasswordConfirm } = req.body
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
  }
}

module.exports = changePassword
