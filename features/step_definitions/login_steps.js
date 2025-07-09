import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals';


When('I enter a valid {string} and {string}', async (email, password) => {
    await enterCredentials(email, password);
});

When('I enter an invalid {string} and {string}', async (email, password) => {
    await enterCredentials(email, password);
});

When('I click the login Button', async () => {
    await $("input[value='Login']").click();
});

Then("I should see the {string} displayed", async (name) => {
    const userNameElement = await $('[data-test="nav-menu"]');
    await expect(userNameElement).toBeDisplayed();
});

Then("I should see an {string}", async (errorMessage) => {
    const errorElement = await $(`//div[contains(text(), "${errorMessage}")]`);
    await expect(errorElement).toBeDisplayed();
});

Then("I should remain on the login page", async () => {
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toContain("/login");
});

async function enterCredentials(email, password) {
    const emailField = await $('#email');
    const passwordField = await $('#password');

    await emailField.setValue(email);
    await passwordField.setValue(password);
}