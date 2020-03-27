const req = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connnection')
describe('ONG', () => {
    beforeEach( async () => {
        await connection.migrate.rollback()
        await connection.migrate.latest()
    })
    afterAll( async () => {
        await connection.destroy()
    })
    it('sould be able to create a new ong', async () => {
        const res = await req(app).post('/ongs').send({
            "name": "APAD2",
            "whatsapp": "85988178359",
            "city": "Fortaleza",
            "uf": "CE",
            "email": "apad@ong.com"
        })
    })
    expect(res.body).toHaveProperty('id')
    expect(res.body.id).toHaveLength(8)
})