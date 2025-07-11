import { When, Then } from '@wdio/cucumber-framework';
import HomePage from '../../pages/home.page';
import { expect } from '@wdio/globals';

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
    const subCategoryElement = HomePage.subCategoryElement(subCategory);
    subCategoryElement.waitForClickable();
    await subCategoryElement.click();
});

When('I click on a product', async () => {
    await HomePage.filterCompleted.waitForDisplayed();
    await HomePage.firstCard.waitForClickable();
    await firstCard.click();
});

Then('I should see products matching {string}', async (productName) => {
    expect(await HomePage.foundProductName).toHaveText(productName);
});

Then('I should see that {string}', async (noProductsMessage) => {
    const noProductsMessageElement = HomePage.noProductsMessageElement(noProductsMessage);
    expect(noProductsMessageElement).toBeDisplayed();
});

Then('I should see the item description containing {string}', async (subCategory) => {
    const actualText = await HomePage.categoryElement.getText();
    await expect(actualText.toLowerCase().trim()).toContain(subCategory.toLowerCase().trim());
});

Then('I should see products within the {string} and {string} range', async (minPrice, maxPrice) => {
    const { actualMinValue, actualMaxValue } = await HomePage.getCurrentPriceRange();
    const prices = await HomePage.getFormattedProductPrices();

    await expect(actualMinValue).toEqual(minPrice);
    await expect(actualMaxValue).toEqual(maxPrice);

    if (prices.length > 0) {
        for (const price of prices) {
            await expect(price).toBeGreaterThanOrEqual(parseFloat(minPrice));
            await expect(price).toBeLessThanOrEqual(parseFloat(maxPrice));
        }
    }
});

