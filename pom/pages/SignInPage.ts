import { Locator } from "@playwright/test";
import BasePage from "../basePage";

export default class SignInPage extends BasePage {
    readonly formName: Locator = this.page.locator('[class = "ui top attached header center"]');
    readonly usernameOrEmailField: Locator = this.page.locator('#user_name');
    readonly passwordField: Locator = this.page.locator('#password');
    readonly forgotPasswordLink: Locator = this.page.locator('[href="/user/forgot_password"]');
    readonly rememberDeviceCheckbox: Locator = this.page.locator('#_aria_auto_id_0');
    readonly signInButton: Locator = this.page.locator('[class="ui primary button tw-w-full"]');
    readonly openIdButton: Locator = this.page.locator('[href="/user/login/openid"]');
    readonly signInWithPasskeyLink: Locator = this.page.locator('.signin-passkey')
    readonly needAccountLink: Locator = this.page.locator('div.field>[href="/user/sign_up"]');

    async openPage() {
        await this.page.goto('/user/login')
    }

    async enterUsername(username) {
        await this.usernameOrEmailField.fill(username);
    }

    async enterEmail(email) {
        await this.usernameOrEmailField.fill(email);
    }

    async enterPassword(password) {
        await this.passwordField.fill(password);
    }

    async forgotPasswordLinkClick() {
        await this.forgotPasswordLink.click();
    }

    async checkRememberDeviceCheckbox() {
        await this.rememberDeviceCheckbox.check();
    }

    async clickSignInButton() {
        await this.signInButton.click();
    }

    async clickOpenIdButton () {
        await this.openIdButton.click();
    }

    async clickSignInWithPasskeyLink () {
        await this.signInWithPasskeyLink.click();
    }

    async clickNeedAccountLink () {
        await this.needAccountLink.click();
    }

    async signInWithUsername(username, password) {
        await this.usernameOrEmailField.fill(username);
        await this.passwordField.fill(password);
        await this.signInButton.click();
    }

    async signInWithEmail(email, password) {
        await this.usernameOrEmailField.fill(email);
        await this.passwordField.fill(password);
        await this.signInButton.click();
    }
}