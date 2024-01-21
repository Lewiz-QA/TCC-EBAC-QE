/// <reference types="cypress" />

import { ProductsPage, ProductPage, CartPage } from '../support/pages'

const produtos = require('../fixtures/produtos.json')

describe('Funcionalidade: US001 - Adicionar item ao carrinho', () => {
    /*Como cliente da EBAC-SHOP
    Quero adicionar produtos no carrinho
    Para realizar a compra dos itens*/

    context('Dado que estou na Listagem de Produtos', () => {
        beforeEach(() => {
            cy.visit('/produtos')
        });

        it('CT1 - Deve incluir Produto ao Carrinho com sucesso', () => {

            context(`Quando clico para abrir o Produto ${produtos[0].nome}`, () => {
                ProductsPage.selectProduct(produtos[0].nome)
            });

            context('E seleciono o Tamanho, Cor e Quantidade do Produto', () => {
                ProductPage.selectProductVariations(produtos[0].tamanho, produtos[0].cor, produtos[0].quantidade)
            });

            context('E clico no botão Comprar', () => {
                ProductPage.addProductToCart(produtos[0].quantidade)
            });

            context('E clico no botão Ver carrinho presente na mensagem de sucesso do item adicionado', () => {
                ProductPage.showCart.click()
            });

            context('Então espero que seja redirecionado ao Carrinho com seus dados já atualizados', () => {
                let totalValue = produtos[0].preco.replace(',', '.') * produtos[0].quantidade

                CartPage.productName.should('have.text', produtos[0].nome + ' - ' + produtos[0].tamanho + ', ' + produtos[0].cor)
                CartPage.productPrice.contains(produtos[0].preco)
                CartPage.productQuantity.should('have.value', produtos[0].quantidade)
                CartPage.productTotal.contains(totalValue)
                CartPage.totalPriceCart.contains(totalValue)
            });
        });

        it('CT2 - Deve aumentar Quantidade de um Produto já adicionado no Carrinho', () => {

            context('Dado que já possuo um Produto no Carrinho', () => {
                cy.addItemToCart(produtos[1].tamanho, produtos[1].cor, produtos[1].quantidade, produtos[1].add_to_cart, produtos[1].product_id, produtos[1].variation_id, produtos[1].url_product)
            });

            context('Quando aumentar a Quantidade do Produto presente no Carrinho', () => {
                CartPage.productQuantity.clear().type(2)
            });

            context('Então espero que os valores totais do Carrinho sejam atualizados', () => {
                let totalValue = produtos[1].preco.replace(',', '.') * produtos[1].quantidade

                CartPage.productTotal.contains(totalValue)
                CartPage.totalPriceCart.contains(totalValue)
            });
        });

        it('CT3 - Deve impedir inclusão de Produto fora do estoque', () => {

            context(`Quando clico para abrir o Produto ${produtos[2].nome}`, () => {
                ProductsPage.selectProduct(produtos[2].nome)
            });

            context('E seleciono um Tamanho, Cor e Quantidade que estejam fora do estoque', () => {
                ProductPage.selectProductVariations(produtos[2].tamanho, produtos[2].cor, produtos[2].quantidade)
            });

            context('E clico no botão Comprar', () => {
                ProductPage.buttonComprar.click()
            });

            context('Então espero que seja apresentada a mensagem de Produto indisponível', () => {
                ProductPage.validationEstoque.contains("Fora de estoque")

                cy.on('window:alert', (text) => {
                    expect(text).to.contains('Desculpe, este produto não está disponível. Escolha uma combinação diferente.');
                });
            });
        });

        it('CT4 - Deve impedir inclusão de Produto sem selecionar suas características', () => {

            context(`Quando clico para abrir o Produto ${produtos[3].nome}`, () => {
                ProductsPage.selectProduct(produtos[3].nome)
            });

            context('E clico no botão Comprar', () => {
                ProductPage.buttonComprar.click()
            });

            context('Então espero que seja apresentada uma mensagem para selecionar as opções do Produto', () => {
                cy.on('window:alert', (text) => {
                    expect(text).to.contains('Selecione uma das opções do produto antes de adicioná-lo ao carrinho.');
                });
            });
        });
    });
});