const connection = require('../database/connnection')

module.exports = {
    async SEScreate(req, res) {
        const { id } = req.body
        const ong = await connection('ongs').where('id', id).select('name').first()

        if(!ong) {
            return res.status(400).json({ error: "no ong found with this id" })
        }

        return res.json(ong)
    }
}