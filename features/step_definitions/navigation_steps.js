import { Given, When, Then } from '@wdio/cucumber-framework';

Given('I am on the {string} page', async (pageName) => {
  const urls = {
    'home': 'https://practicesoftwaretesting.com',
    'login': 'https://practicesoftwaretesting.com/auth/login'
  };
  
  await browser.url(urls[pageName]);
});