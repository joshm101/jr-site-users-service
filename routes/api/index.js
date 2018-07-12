const express = require('express')

const login = require('../../controllers/login')
const tokenValid = require('../../controllers/token-valid')

const apiRouter = express.Router()

const root = (req, res) => {
  res.status(200).send({
    message: 'jr-site-users-microservice API'
  })
}

apiRouter.post('/login', login)
apiRouter.get('/token-valid', tokenValid)
apiRouter.get('/', root)

module.exports = apiRouter
