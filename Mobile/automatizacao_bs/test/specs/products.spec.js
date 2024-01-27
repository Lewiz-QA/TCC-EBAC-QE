const productsViewScreen = require("../screens/productsView.screen")
const productViewScreen = require("../screens/productView.screen")
const produtos = require('../../fixtures/produtos.json');
const { AppiumDriver } = require("appium/build/lib/appium");

describe('Funcionalidade: US004 - Catálogo de Produtos', () => {
    /*Como cliente da EBAC-SHOP
    Quero visualizar e filtrar a listagem de Produtos
    Para escolher quais itens desejo comprar*/

    let categoryName = 'Bottoms'
    let orderOption = 'Ordenar: Nome A-Z'

    it(`CT1 - Deve realizar a busca pelo Produto ${produtos[1].nome}`, async () => {

        //Quando pesquiso por um Produto
        await productsViewScreen.searchByProduct(`${produtos[1].nome}`)

        //Então espero que a busca seja realizada corretamente
        expect(await productsViewScreen.listWithSearchTitle()).toExist()
        expect(await productsViewScreen.showListProduct(`${produtos[1].nome}`)).toExist()

        //E espero que retorne para a tela anterior
        await productViewScreen.goToPreviousScreen()
    });

    it('CT2 - Deve abrir Produto da lista', async () => {

        //Quando clico para abrir algum Produto
        await productsViewScreen.openProduct(`${produtos[0].nome}`)

        //Então espero que seja redirecionado para a tela do Produto
        expect(await productViewScreen.showProduct(`${produtos[0].nome}`)).toExist()

        //E espero que retorne para a tela anterior
        await productViewScreen.goToPreviousScreen()
    });

    it('CT3 - Deve filtrar por Categoria', async () => {

        //Quando clico para filtrar por alguma Categoria
        await productsViewScreen.selectCategoryOption(`${categoryName}`)

        //Então espero que o filtro seja aplicado com sucesso
        expect(await productsViewScreen.listByCategoryTitle()).toExist()
        expect(await productsViewScreen.showListProduct(produtos[3].nome)).toExist()
        
        //E espero que retorne para a tela anterior
        await productViewScreen.goToPreviousScreen()
    });

    it('CT4 - Deve listar Produtos de uma Categoria em ordem alfabética', async () => {

        //Dado que já existe um filtro por Categoria aplicado
        await productsViewScreen.selectCategoryOption(categoryName)

        //Quando ordenar a lista de alguma forma
        expect(await productsViewScreen.selectClassificationOption(orderOption)).toExist()

        //Então espero que a lista seja ordenada corretamente
        expect(await productsViewScreen.showFirstListProduct(`${produtos[2].nome}`)).toExist()
    });
});