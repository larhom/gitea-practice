import { Locator } from "@playwright/test";
import BasePage from "../BasePage";

export default class Header extends BasePage {
    readonly exploreLink: Locator = this.page.locator('a[href="/explore/repos"]');
    readonly registerLink: Locator = this.page.locator('a[href="/user/sign_up"]');
    readonly settingsDropdown: Locator = this.page.locator('div[aria-label="Profile and Settings…"]');
    readonly profileLink: Locator = this.page.locator('#_aria_auto_id_8');
    readonly settingsLink: Locator = this.page.locator('a[href="/user/settings"]')
    readonly signOutLink: Locator = this.page.locator('a[data-url="/user/logout"]');
    readonly profileImage: Locator = this.page.locator('img[class="ui avatar tw-align-middle tw-mr-1"]');
   
    async clickExploreLink () {
        await this.exploreLink.click();
    }

    async clickRegisterLink () {
        await this.registerLink.click();
    }

    async openProfilePage() {
        await this.settingsDropdown.click();
        await this.profileLink.click()
    }

    async openSettingsPage() {
        await this.settingsDropdown.click();
        await this.settingsLink.click();
    }

    async signOut() {
        await this.settingsDropdown.click();
        await this.signOutLink.click();
    }
    
}