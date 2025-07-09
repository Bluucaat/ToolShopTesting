import { When, Then } from '@wdio/cucumber-framework';
import HomePage from '../../pages/HomePage.js';
import { expect } from '@wdio/globals';
import { EventEmitter } from 'events';


When('I search for {string}', async (product_name) => {
    await HomePage.search(product_name);
});

When(/^I set the (minimum|maximum) price to "([^"]*)"$/, async (priceType, newValue) => {
    if (priceType === 'minimum') {
        await HomePage.setMinPrice(newValue);
    } else {
        await HomePage.setMaxPrice(newValue);
    }
});

When('I filter products by subcategory {string}', async (subCategory) => {
    const subCategoryElement = await $(`//div[@class="checkbox"]//label[contains(text(), "${subCategory}")]`);
    await subCategoryElement.waitForClickable();
    await subCategoryElement.click();
});

When('I click on a product', async () => {

    const filterCompleted = $('div[data-test="filter_completed"]');
    await filterCompleted.waitForDisplayed(5000);

    const firstCard = $('a.card');
    await firstCard.waitForClickable();
    await firstCard.click();
});

Then('I should see products matching {string}', async (productName) => {
    const foundProductName = await $('[data-test="product-name"]');
    expect(foundProductName).toHaveText(productName);
});

Then('I should see that there are no products found', async () => {
    const noProductsMessage = await $('//div[contains(text(), "There are no products found.")]');
    expect(noProductsMessage).toBeDisplayed();
});

Then('I should see the item description containing {string}', async (subCategory) => {
    const categoryElement = await $('[aria-label="category"]');
    const actualText = await categoryElement.getText();
    await expect(actualText.toLowerCase().trim()).toContain(subCategory.toLowerCase().trim());
});

Then('I should see products within the {string} and {string} range', async (minPrice, maxPrice) => {

    minPrice = parseInt(minPrice);
    maxPrice = parseInt(maxPrice);

    const priceElements = await $$('[data-test="product-price"]');

    if (priceElements.length > 0) {
        for (const priceElement of priceElements) {
            const priceText = await priceElement.getText();
            const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
            expect(price).toBeGreaterThanOrEqual(minPrice);
            expect(price).toBeLessThanOrEqual(maxPrice);
        }
    } else {
        const actualMinValue = parseInt(await HomePage.minimumPriceSlider.getAttribute('aria-valuenow'));
        const actualMaxValue = parseInt(await HomePage.maximumPriceSlider.getAttribute('aria-valuenow'));
        expect(actualMinValue).toEqual(minPrice);
        expect(actualMaxValue).toEqual(maxPrice);
    }
});

