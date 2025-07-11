import { Given, Then } from '@wdio/cucumber-framework';

Given('I am on the {string} page', async (pageName) => {
    const urls = {
        'home': 'https://practicesoftwaretesting.com',
        'login': 'https://practicesoftwaretesting.com/auth/login'
    };
    await browser.url(urls[pageName]);

});

Then('the {string} page should be loaded', async (pageName) => {
    const uniqueSelectors = {
        'home': '//*[contains(text(), "Price Range")]',
        'login': '[data-test = "login-form"]'
    }
    const uniqueElement = $(uniqueSelectors[pageName]);
    await expect(uniqueElement).toBeDisplayed();
});