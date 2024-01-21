/// <reference types="cypress" />

class ProductPage {
    get showCart() { return cy.get('.woocommerce-message > .button')}
    get buttonComprar() { return cy.get('.single_add_to_cart_button') }
    get validationEstoque() { return cy.get('.stock') }

    selectProductVariations(size, color, quantity){
        cy.get('.button-variable-item-' + size).click()
        cy.get('.button-variable-item-' + color).click()
        cy.get('.input-text').clear().type(quantity)
    }

    addProductToCart(quantity){
        this.buttonComprar.click()
        cy.get('.dropdown-toggle > .mini-cart-items').should('contain', quantity)
        cy.get('.woocommerce-message').should('contain', 'adicionado')
    }
}

module.exports = new ProductPage()