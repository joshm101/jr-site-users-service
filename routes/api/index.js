const express = require('express')

const login = require('../../controllers/login')
const tokenValid = require('../../controllers/token-valid')
const changePassword = require('../../controllers/change-password')
const updatePreferences = require('../../controllers/update-preferences')
const authenticated = require('../../middleware/authenticated')

const apiRouter = express.Router()

const root = (req, res) => {
  res.status(200).send({
    message: 'jr-site-users-microservice API'
  })
}

apiRouter.post('/login', login)
apiRouter.post('/change-password', [authenticated, changePassword])
apiRouter.put('/update-preferences', [authenticated, updatePreferences])
apiRouter.get('/token-valid', tokenValid)
apiRouter.get('/', root)

module.exports = apiRouter
