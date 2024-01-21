/// <reference types="cypress" />
/// <reference types="cypress" />

class CartPage {
    get productName() { return cy.get('.product-name > a')}
    get productPrice() { return cy.get('.product-price > .woocommerce-Price-amount > bdi')}
    get productQuantity() { return cy.get('.quantity > .input-text')}
    get productTotal() { return cy.get('.product-subtotal > .woocommerce-Price-amount > bdi')}
    get totalPriceCart() {return cy.get('strong > .woocommerce-Price-amount > bdi')}
}

module.exports = new CartPage()