const req = require('supertest');
const perfis = require('../fixtures/perfis.json')
const API_URL = process.env.API_URL
var faker = require('faker');
date = new Date()

let randomCouponCode = faker.random.alphaNumeric(15)
let randomAmountCoupon = `${(Math.random() * (20.00 - 5.00) + 5.00).toPrecision(5)}`
let randomFinalDateCoupon = `${date.getUTCFullYear() + "/" + (date.getUTCMonth() + 1) + "/" + (date.getUTCDate() + 10) + " " + date.getUTCHours() + ":" + date.getUTCMinutes() + ":" + date.getUTCSeconds()}`

describe('Funcionalidade: US003 - API de Cupons', () => {
    /*Como admin da EBAC-SHOP
    Quero criar um serviço de cupom
    Para poder listar e cadastrar os cupons*/

    it('CT1 - Deve listar Cupons com sucesso', async () => {
        await req(API_URL)
            .get('/coupons')
            .set('Accept', 'application/json')
            .auth(perfis[0].user, perfis[0].password)
            .then(response => {
                expect(response.statusCode).toEqual(200)
                expect(response.body).toBeInstanceOf(Array)
            })
    });

    it('CT2 - Deve cadastrar Cupom com sucesso', async () => {
        await req(API_URL)
            .post('/coupons')
            .set('Accept', 'application/json')
            .auth(perfis[0].user, perfis[0].password)
            .send({
                "code": randomCouponCode,
                "amount": randomAmountCoupon,
                "discount_type": 'fixed_cart',
                "description": 'Cupom Teste',
                "date_expires": randomFinalDateCoupon
            })
            .then(response => {
                expect(response.statusCode).toEqual(201)
                expect(response.body).toBeInstanceOf(Object)
                expect(response.body.id).toBeDefined()
                expect(response.body.code).toEqual(randomCouponCode)
            })
    });

    it('(HealthCheck) CT3 - Deve impedir listagem sem Autenticação', async () => {
        await req(API_URL)
            .get('/coupons')
            .set('Accept', 'application/json')
            .then(response => {
                expect(response.statusCode).toEqual(401)
                expect(response.body.code).toContain('woocommerce_rest_cannot_view')
                expect(response.body.message).toContain('Sem permissão para listar recursos')
                expect(response.body.data).toMatchObject({ status: 401 })
            })
    });

    it('(HealthCheck) CT4 - Deve impedir cadastro sem Autorização', async () => {
        await req(API_URL)
            .post('/coupons')
            .set('Accept', 'application/json')
            .auth(perfis[1].user, perfis[1].password)
            .send({
                "code": randomCouponCode,
                "amount": randomAmountCoupon,
                "discount_type": 'fixed_cart',
                "description": 'Teste sem Autorização'
            })
            .then(response => {
                expect(response.statusCode).toEqual(403)
                expect(response.body).toBeInstanceOf(Object)
                expect(response.body.code).toContain('woocommerce_rest_cannot_create')
                expect(response.body.message).toContain('Desculpe, você não possui permissão para criar recursos.')
            })
    });
});