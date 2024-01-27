class ProductViewScreen {

    async showProduct(productName){
        await $(`-ios predicate string:name CONTAINS 'Adicionar ao carrinho'`).waitForDisplayed({ timeout: 5000 })
        return await $(`-ios predicate string:name CONTAINS 'Adicionar ao carrinho'`) && await $(`-ios predicate string:name CONTAINS '${productName}'`)
    }

    get #topBackArrow(){
        return $("/XCUIElementTypeApplication/XCUIElementTypeWindow/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeOther[2]/XCUIElementTypeOther[2]/XCUIElementTypeButton[1]")
    }

    async goToPreviousScreen(){
        await this.#topBackArrow.waitForEnabled({timeout: 10000})
        await this.#topBackArrow.click()
    }
}

module.exports = new ProductViewScreen()