// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { .. })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { .. })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { .. })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { .. })

Cypress.Commands.add('addItemToCart', (tamanho, cor, qtde, addToCart, productId, variation_id, urlProduct) => {
    const fd = new FormData()
    fd.append('attribute_size', tamanho)
    fd.append('attribute_color', cor)
    fd.append('quantity', qtde)
    fd.append('add-to-cart', addToCart)
    fd.append('product_id', productId)
    fd.append('variation_id', variation_id)
    cy.request({
        url: '/product/' + urlProduct,
        method: 'POST',
        body: fd
    }).then((response) => {
        expect(response.status).to.eq(200)
    })
    cy.wait(2000)
    cy.visit('/carrinho')
});