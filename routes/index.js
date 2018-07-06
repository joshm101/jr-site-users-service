const express = require('express')
const router = express.Router()

const root = (req, res) => {
  res.send(
    'jr-site-users microservice.'
  )
}

router.use('/', root)

module.exports = router
