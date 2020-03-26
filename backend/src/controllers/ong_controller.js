const connection = require('../database/connnection')
const crypto = require('crypto')

module.exports = {
    async ONGcreate(req, res){
        const { name, email, whatsapp, city, uf } = req.body
        const id = crypto.randomBytes(4).toString('HEX')
        await connection('ongs').insert({
            email, name, whatsapp, city, uf, id
        })

        return res.json({id})
    },
    async ONGread(req, res){
        const ongs = await connection('ongs').select('*')
        return res.json({ ongs })
    }
}