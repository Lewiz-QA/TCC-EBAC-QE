/// <reference types="cypress" />

class ProductsPage {
    
    selectProduct(productName){
        cy.get('[class="product-block grid"]')
            .contains(productName)
            .click()

        cy.get('.product_title').should('contain', productName)
    }
}

module.exports = new ProductsPage()