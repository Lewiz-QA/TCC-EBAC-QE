/// <reference types="cypress" />

import { LoginPage, accountPage } from '../support/pages'

const perfis = require('../fixtures/perfis.json')

describe('Funcionalidade: US002 - Login na plataforma', () => {
    /*Como cliente da EBAC-SHOP
    Quero fazer o login (autenticação) na plataforma
    Para visualizar meus pedidos*/

    context('Dado que estou na página de Login', () => {
        beforeEach(() => {
            cy.visit('/minha-conta')
        });

        it('CT1 - Deve realizar Login com sucesso', () => {

            context('Quando preencho minhas credenciais e realizo Login', () => {
                LoginPage.login(perfis[0].usuario, perfis[0].senha)
            });

            context('Então espero que seja redirecionado para a tela Minha Conta com uma mensagem de boas vindas', () => {
                accountPage.welcomeMessage.contains(perfis[0].usuario, { matchCase: false })
            });
        });

        it('CT2 - Deve impedir Login com Senha inválida', () => {

            context('Quando tento realizar Login com Senha inválida', () => {
                LoginPage.login(perfis[1].usuario, 'senha inválida')
            });

            context('Então espero que seja apresentada uma mensagem de Senha incorreta', () => {
                LoginPage.validation.contains(`A senha fornecida para o e-mail ${perfis[1].usuario} está incorreta.`)
            });
        });

        it('CT3 - Deve impedir Login com Usuário inexistente', () => {

            context('Quando tento realizar Login com um Usuário inexistente', () => {
                LoginPage.login('aluno_ebacteste', perfis[1].senha)
            });

            context('Então espero que seja apresentada uma mensagem de Usuário inexistente', () => {
                LoginPage.validation.contains('O usuário aluno_ebacteste não está registrado neste site.')
            });
        });

        it('CT4 - Deve validar obrigatoriedade da Senha', () => {

            context('Quando tento realizar Login sem preencher a Senha', () => {
                LoginPage.login(perfis[1].usuario)
            });

            context('Então espero que seja apresentada a validação de Senha obrigatória', () => {
                LoginPage.validation.contains('O campo da senha está vazio.')
            });
        });
    });
});