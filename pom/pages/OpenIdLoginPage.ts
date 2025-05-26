import { Locator } from "@playwright/test";
import BasePage from "../basePage";

export default class OpenIdLoginPage extends BasePage {
    readonly formName: Locator = this.page.locator('[class = "ui top attached header center"]');
    readonly openIdUriField: Locator = this.page.locator('#openid');
    readonly rememberDeviceCheckbox: Locator = this.page.locator('#_aria_auto_id_0');
    readonly signInButton: Locator = this.page.locator('[class="ui primary button tw-w-full"]');
    readonly backToSignInLink: Locator = this.page.locator('[href="/user/login"]');

    async openPage() {
        await this.page.goto('/user/login/openid')
    }

    async enterOpenId(openId) {
        await this.openIdUriField.fill(openId);
    }

    async checkRememberDeviceCheckbox() {
        await this.rememberDeviceCheckbox.check();
    }

    async clickSignInButton() {
        await this.signInButton.click();
    }

    async clickBackToSignInLink() {
        await this.backToSignInLink.click();
    }
}