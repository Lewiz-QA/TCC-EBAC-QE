/// <reference types="cypress" />

export const accountPage = {
    get welcomeMessage() {return cy.get('.woocommerce-MyAccount-content > :nth-child(2) > :nth-child(1)')}
}

