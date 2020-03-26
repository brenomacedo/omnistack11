const express = require('express')
const routes = express.Router()

const { ONGcreate, ONGread } = require('./controllers/ong_controller')
const { INCcreate, INCread, INCdelete } = require('./controllers/incident_controller')
const { PROread } = require('./controllers/profile_controller')
const { SEScreate } = require('./controllers/session_controller')


routes.post('/ongs', ONGcreate)
routes.get('/ongs', ONGread)

routes.post('/incidents', INCcreate)
routes.get('/incidents', INCread)
routes.delete('/incidents/:id', INCdelete)

routes.get('/profile', PROread)

routes.post('/sessions', SEScreate)



module.exports = routes