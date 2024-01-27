class ProductsViewScreen {
    
    async showListProduct(productName){
        await $(`-ios predicate string:name CONTAINS '${productName}'`).waitForDisplayed({ timeout: 10000 })
        return await $(`-ios predicate string:name CONTAINS '${productName}'`)
    }

    async showFirstListProduct(productName){
        await $(`-ios predicate string:name CONTAINS '${productName}' AND index == 1`).waitForDisplayed({ timeout: 10000 })
        return await $(`-ios predicate string:name CONTAINS '${productName}' AND index == 1`)
    }

    async openProduct(productName){
        await $(`-ios predicate string:name CONTAINS '${productName}'`).waitForDisplayed({ timeout: 10000 })
        await $(`-ios predicate string:name CONTAINS '${productName}'`).click()
    }

    get #categoryFilterButton(){
        return $(`-ios predicate string: name CONTAINS 'Procurar categorias'`)
    }

    async selectCategoryOption(categoryName){
        await this.#categoryFilterButton.waitForDisplayed({ timeout: 10000 })
        await this.#categoryFilterButton.click()
        await $(`-ios predicate string:name CONTAINS '${categoryName}'`).waitForDisplayed({ timeout: 10000 })
        await $(`-ios predicate string:name CONTAINS '${categoryName}'`).click()
    }

    async listByCategoryTitle() {
        await $(`-ios predicate string:name CONTAINS 'Squeaky toy'`).waitForDisplayed({ timeout: 10000 })
        return await $(`-ios predicate string:name CONTAINS 'Squeaky toy'`)
    }

    get #classificationIcon() {
        return $("/XCUIElementTypeApplication/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeOther[2]/XCUIElementTypeOther[2]/XCUIElementTypeButton[2]")
    }

    async selectClassificationOption(classificationName){
        await this.#classificationIcon.waitForDisplayed({ timeout: 10000 })
        await this.#classificationIcon.click()
        await $(`-ios predicate string:name CONTAINS '${classificationName}'`).waitForDisplayed({ timeout: 10000 })
        await $(`-ios predicate string:name CONTAINS '${classificationName}'`).click()
    }

    get #searchIcon(){
        return $("/XCUIElementTypeApplication/XCUIElementTypeWindow/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeOther[2]/XCUIElementTypeOther[2]/XCUIElementTypeButton[2]")
    }

    get #searchText(){
        return $(`-ios predicate string:type == "XCUIElementTypeTextField"`)
    }

    get #searchButton(){
        return $(`~Procurar`)
    }

    async searchByProduct(productName){
        await this.#searchIcon.waitForDisplayed({timeout: 10000})
        await this.#searchIcon.click()
        await this.#searchText.waitForEnabled({ timeout: 10000 })
        await this.#searchText.setValue(productName)
        await this.#searchButton.click()
    }

    async listWithSearchTitle() {
        await $(`-ios predicate string:name CONTAINS 'Resultados da busca'`).waitForDisplayed({ timeout: 10000 })
        return await $(`-ios predicate string:name CONTAINS 'Resultados da busca'`)
    }
}

module.exports = new ProductsViewScreen()