import { Given, } from '@wdio/cucumber-framework';

Given('I am on the {string} page', async (pageName) => {
    const urls = {
        'home': 'https://practicesoftwaretesting.com',
        'login': 'https://practicesoftwaretesting.com/auth/login'
    };

    const uniqueSelectors = {
        'home': '//*[contains(text(), "Price Range")]',
        'login': '[data-test = "login-form"]'
    }
    await browser.url(urls[pageName]);
    const uniqueElement = $(uniqueSelectors[pageName]);
    await uniqueElement.waitForDisplayed();
});