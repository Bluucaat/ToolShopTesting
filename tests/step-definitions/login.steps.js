import { Before, When, Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals';
import LoginPage from '../../pages/login.page';

When(/^I enter (a|an) (valid|invalid) "([^"]*)" and (.*)$/, async (_, __, email, password) => {
  const actualPassword =
    password == 'validPassword' ? String(process.env.VALID_LOGIN_PASSWORD) : password;
  await LoginPage.enterCredentials(email, actualPassword);
});

When('I click the login Button', async () => {
  await LoginPage.loginButton.click();
});

Then('I should see the {string} displayed', async (name) => {
  const userNameElement = await $('[data-test="nav-menu"]');
  await expect(userNameElement).toBeDisplayed();
});

Then('I should see an {string}', async (errorMessage) => {
  const errorElement = LoginPage.errorMessageElement(errorMessage);
  expect(await errorElement).toBeDisplayed();
});

Then('I should remain on the login page', async () => {
  const currentUrl = await browser.getUrl();
  expect(currentUrl).toContain('/login');
  await expect(LoginPage.loginForm).toBeDisplayed();
});
