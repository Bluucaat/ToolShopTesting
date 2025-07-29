class HomePage {
    get searchField() { return $('input[data-test="search-query"]'); }
    get searchButton() { return $('[data-test="search-submit"]'); }
    get sortField() { return $('[data-test="sort"]'); }
    get minimumPriceSlider() { return $('span.ngx-slider-pointer-min'); }
    get maximumPriceSlider() { return $('span.ngx-slider-pointer-max'); }
    get productPrices() { return $$('[data-test="product-price"]'); }
    get filterCompleted() { return $('div[data-test="filter_completed"]'); }
    get firstCard() { return $('a.card'); }
    get foundProductName() { return $('[data-test="product-name"]'); }
    get categoryElement() { return $('[aria-label="category"]'); }
    noProductsMessageElement(noProductsMessage) { return $(`//div[contains(text(), "${noProductsMessage}")]`); }
    subCategoryElement(subCategory) { return $(`//div[@class="checkbox"]//label[contains(text(), "${subCategory}")]`); }

    async search(itemName) {
        await this.searchField.setValue(itemName);
        await this.searchButton.click();
    }

    async setMinPrice(targetPrice) {
        await this._setSlider(this.minimumPriceSlider, targetPrice);
    }

    async setMaxPrice(targetPrice) {
        await this._setSlider(this.maximumPriceSlider, targetPrice);
    }

    async getCurrentPriceRange() {
        const actualMinValue = await this.minimumPriceSlider.getAttribute('aria-valuenow');
        const actualMaxValue = await this.maximumPriceSlider.getAttribute('aria-valuenow');
        return { actualMinValue, actualMaxValue };
    }

    async _setSlider(slider, targetPrice) {
        await slider.execute((element) => {
            element.focus();
        });

        const currentValue = parseInt(await slider.getAttribute('aria-valuenow'));
        const target = parseInt(targetPrice);
        const difference = target - currentValue;

        if (difference !== 0) {
            const steps = Math.abs(difference);
            const key = difference > 0 ? 'ArrowRight' : 'ArrowLeft';

            const keys = Array(steps).fill(key);
            await browser.keys(keys);
        }
        await browser.pause(1000);
    }
    async getFormattedProductPrices() {
        const priceElements = await this.productPrices;
        const prices = [];

        for (const priceElement of priceElements) {
            const priceText = await priceElement.getText();
            const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
            prices.push(price);
        }
        return prices;
    }
}

export default new HomePage();