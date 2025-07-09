class HomePage {
    constructor() {
        this.searchField = $('input[data-test="search-query"]');
        this.searchButton = $('[data-test="search-submit"]');
        this.sortField = $('[data-test="sort"]');
        this.minimumPriceSlider = $('span.ngx-slider-pointer-min');
        this.maximumPriceSlider = $('span.ngx-slider-pointer-max');
    }
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
}

export default new HomePage();