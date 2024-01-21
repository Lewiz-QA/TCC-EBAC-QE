/// <reference types="cypress" />

class LoginPage {
    get #user() { return cy.get('#username')}
    get #pass() { return cy.get('#password')}
    get #login() { return cy.get('.woocommerce-form > .button')}
    get validation() { return cy.get('.woocommerce-error > li')}
    
    login(user,pass){
        this.#user.type(user, {force: true})

        if(pass != null){
            this.#pass.type(pass, {log: false})
        }

        this.#login.click()
        cy.wait(2000)
    }
}

module.exports = new LoginPage()