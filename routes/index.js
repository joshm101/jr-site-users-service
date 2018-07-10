const express = require('express')
const router = express.Router()

const apiRouter = require('./api')

const root = (req, res) => {
  res.send(
    'jr-site-users microservice.'
  )
}

router.use('/api', apiRouter)
router.use('/', root)

module.exports = router
