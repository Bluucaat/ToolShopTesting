class LoginPage {
    get loginForm() { return $('[data-test = "login-form"]'); }
    get emailField() { return $('#email'); }
    get passwordField() { return $('#password'); }
    get loginButton() { return $("input[value='Login']"); }
    errorMessageElement(errorMessage) { return $(`//div[contains(text(), "${errorMessage}")]`) };

    async enterCredentials(email, password) {
        await this.emailField.setValue(email);
        await this.passwordField.setValue(password);
    }
}
export default new LoginPage()