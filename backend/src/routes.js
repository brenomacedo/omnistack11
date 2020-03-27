const express = require('express')
const routes = express.Router()

const { ONGcreate, ONGread } = require('./controllers/ong_controller')
const { INCcreate, INCread, INCdelete } = require('./controllers/incident_controller')
const { PROread } = require('./controllers/profile_controller')
const { SEScreate } = require('./controllers/session_controller')

const { celebrate, Segments, Joi } = require('celebrate')

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}), ONGcreate)
routes.get('/ongs', ONGread)

routes.post('/incidents', INCcreate)
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}), INCread)
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), INCdelete)

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), PROread)

routes.post('/sessions', SEScreate)



module.exports = routes