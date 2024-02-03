const perfis = require('../../../fixtures/perfis.json')
var faker = require('faker');

let randomCouponCode = faker.random.alphaNumeric(15)
let randomAmountCoupon = `${(Math.random() * (20.00 - 5.00) + 5.00).toPrecision(5)}`

describe('Funcionalidade: US003 - API de Cupons', () => {
  /*Como admin da EBAC-SHOP
  Quero criar um serviço de cupom
  Para poder listar e cadastrar os cupons*/

  it('CT1 - Deve validar o schema da lista de Cupons', done => {
    const couponsList = Joi.array().items(Joi.object().keys({
      id: Joi.number().required(),
      code: Joi.string().required(),
      amount: Joi.string().required(),
      date_created: Joi.string().isoDate().required(),
      date_created_gmt: Joi.string().isoDate().required(),
      date_modified: Joi.string().isoDate().required(),
      date_modified_gmt: Joi.string().isoDate().required(),
      discount_type: Joi.string().required(),
      description: Joi.string().required(),
      date_expires: Joi.string().isoDate().allow(null),
      date_expires_gmt: Joi.string().isoDate().allow(null),
      usage_count: Joi.number().required(),
      individual_use: Joi.boolean().required(),
      product_ids: Joi.array().required(),
      excluded_product_ids: Joi.array().required(),
      usage_limit: Joi.string().allow(null),
      usage_limit_per_user: Joi.string().allow(null),
      limit_usage_to_x_items: Joi.string().allow(null),
      free_shipping: Joi.boolean().required(),
      product_categories: Joi.array().required(),
      excluded_product_categories: Joi.array().required(),
      exclude_sale_items: Joi.boolean().required(),
      minimum_amount: Joi.string().required(),
      maximum_amount: Joi.string().required(),
      email_restrictions: Joi.array().required(),
      used_by: Joi.array().required(),
      meta_data: Joi.array().required(),
      _links: Joi.object().required()
    }));

    request
      .get("/coupons")
      .auth(perfis[0].user, perfis[0].password)
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=UTF-8')
      .expect(200)
      .end((err, res) => {
        joiAssert(res.body, couponsList);
        done(err);
      });
  });

  it('CT2 - Deve validar o schema da consulta de um Cupom', done => {
    const couponsList = Joi.object().keys({
      id: Joi.number().required(),
      code: Joi.string().required(),
      amount: Joi.string().required(),
      date_created: Joi.string().isoDate().required(),
      date_created_gmt: Joi.string().isoDate().required(),
      date_modified: Joi.string().isoDate().required(),
      date_modified_gmt: Joi.string().isoDate().required(),
      discount_type: Joi.string().required(),
      description: Joi.string().required(),
      date_expires: Joi.string().isoDate().allow(null),
      date_expires_gmt: Joi.string().isoDate().allow(null),
      usage_count: Joi.number().required(),
      individual_use: Joi.boolean().required(),
      product_ids: Joi.array().required(),
      excluded_product_ids: Joi.array().required(),
      usage_limit: Joi.string().allow(null),
      usage_limit_per_user: Joi.string().allow(null),
      limit_usage_to_x_items: Joi.string().allow(null),
      free_shipping: Joi.boolean().required(),
      product_categories: Joi.array().required(),
      excluded_product_categories: Joi.array().required(),
      exclude_sale_items: Joi.boolean().required(),
      minimum_amount: Joi.string().required(),
      maximum_amount: Joi.string().required(),
      email_restrictions: Joi.array().required(),
      used_by: Joi.array().required(),
      meta_data: Joi.array().required(),
      _links: Joi.object().required()
    });

    request
      .get("/coupons/5152")
      .auth(perfis[0].user, perfis[0].password)
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=UTF-8')
      .expect(200)
      .end((err, res) => {
        joiAssert(res.body, couponsList);
        done(err);
      });
  });

  it('CT3 - Deve validar o schema do cadastro de um Cupom', done => {
    const couponsList = Joi.object().keys({
      id: Joi.number().required(),
      code: Joi.string().required(),
      amount: Joi.string().required(),
      date_created: Joi.string().isoDate().required(),
      date_created_gmt: Joi.string().isoDate().required(),
      date_modified: Joi.string().isoDate().required(),
      date_modified_gmt: Joi.string().isoDate().required(),
      discount_type: Joi.string().required(),
      description: Joi.string().required(),
      date_expires: Joi.string().isoDate().allow(null),
      date_expires_gmt: Joi.string().isoDate().allow(null),
      usage_count: Joi.number().required(),
      individual_use: Joi.boolean().required(),
      product_ids: Joi.array().required(),
      excluded_product_ids: Joi.array().required(),
      usage_limit: Joi.string().allow(null),
      usage_limit_per_user: Joi.string().allow(null),
      limit_usage_to_x_items: Joi.string().allow(null),
      free_shipping: Joi.boolean().required(),
      product_categories: Joi.array().required(),
      excluded_product_categories: Joi.array().required(),
      exclude_sale_items: Joi.boolean().required(),
      minimum_amount: Joi.string().required(),
      maximum_amount: Joi.string().required(),
      email_restrictions: Joi.array().required(),
      used_by: Joi.array().required(),
      meta_data: Joi.array().required(),
      _links: Joi.object().required()
    });

    request
      .post("/coupons")
      .auth(perfis[0].user, perfis[0].password)
      .set('Accept', 'application/json')
      .send({
        "code": randomCouponCode,
        "amount": randomAmountCoupon,
        "discount_type": 'fixed_cart',
        "description": 'Cupom Teste'
      })
      .expect('Content-Type', 'application/json; charset=UTF-8')
      .expect(201)
      .end((err, res) => {
        joiAssert(res.body, couponsList);
        done(err);
      });
  });

  it('CT4 - Deve validar o schema da alteração de um Cupom', done => {
    const couponsList = Joi.object().keys({
      id: Joi.number().required(),
      code: Joi.string().required(),
      amount: Joi.string().required(),
      date_created: Joi.string().isoDate().required(),
      date_created_gmt: Joi.string().isoDate().required(),
      date_modified: Joi.string().isoDate().required(),
      date_modified_gmt: Joi.string().isoDate().required(),
      discount_type: Joi.string().required(),
      description: Joi.string().required(),
      date_expires: Joi.string().isoDate().allow(null),
      date_expires_gmt: Joi.string().isoDate().allow(null),
      usage_count: Joi.number().required(),
      individual_use: Joi.boolean().required(),
      product_ids: Joi.array().required(),
      excluded_product_ids: Joi.array().required(),
      usage_limit: Joi.string().allow(null),
      usage_limit_per_user: Joi.string().allow(null),
      limit_usage_to_x_items: Joi.string().allow(null),
      free_shipping: Joi.boolean().required(),
      product_categories: Joi.array().required(),
      excluded_product_categories: Joi.array().required(),
      exclude_sale_items: Joi.boolean().required(),
      minimum_amount: Joi.string().required(),
      maximum_amount: Joi.string().required(),
      email_restrictions: Joi.array().required(),
      used_by: Joi.array().required(),
      meta_data: Joi.array().required(),
      _links: Joi.object().required()
    });

    request
      .put("/coupons/5152")
      .auth(perfis[0].user, perfis[0].password)
      .set('Accept', 'application/json')
      .send({
        "description": 'Teste Alteração'
      })
      .expect('Content-Type', 'application/json; charset=UTF-8')
      .expect(200)
      .end((err, res) => {
        joiAssert(res.body, couponsList);
        done(err);
      });
  });
});