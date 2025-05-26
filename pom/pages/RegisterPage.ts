import { Locator } from "@playwright/test";
import BasePage from "../basePage";

export default class RegisterPage extends BasePage {
    readonly formName: Locator = this.page.locator('[class = "ui top attached header center"]');
    readonly usernameField: Locator = this.page.locator('#user_name');
    readonly emailAddressField: Locator = this.page.locator('#email');
    readonly passwordField: Locator = this.page.locator('#password');
    readonly confirmPasswordField: Locator = this.page.locator('#retype');
    readonly registerButton: Locator = this.page.locator('[class="ui primary button tw-w-full"]');
    readonly openIdButton: Locator = this.page.locator('[href="/user/login/openid"]');
    readonly alreadyHaveAccountLink: Locator = this.page.locator('[href="/user/login"]');
    readonly errorMessage: Locator= this.page.locator('[class="ui negative message flash-message flash-error"]');

    async openPage() {
        await this.page.goto('/user/sign_up')
    }

    async enterUsername(username) {
        await this.usernameField.fill(username);
    }

    async enterEmail(email) {
        await this.emailAddressField.fill(email);
    }

    async enterPassword(password) {
        await this.passwordField.fill(password);
    }

    async confirmPassword(password) {
        await this.confirmPasswordField.fill(password);
    }

    async clickRegisterButton() {
        await this.registerButton.click();
    }

    async registerWithCredentials(username, email, password) {
        await this.usernameField.fill(username);
        await this.emailAddressField.fill(email);
        await this.passwordField.fill(password);
        await this.confirmPasswordField.fill(password);
        await this.registerButton.click();
    }

    async clickOpenIdButton () {
        await this.openIdButton.click();
    }

    async clickAlreadyHaveAccountLink() {
        await this.alreadyHaveAccountLink.click();
    }
}