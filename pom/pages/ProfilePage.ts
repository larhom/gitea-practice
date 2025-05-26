import { Locator } from "@playwright/test";
import BasePage from "../basePage";

export default class ProfilePage extends BasePage {
    readonly profileUsername: Locator = this.page.locator('[class="username text center"]');
    readonly profileFullName: Locator = this.page.locator('[class="header text center"]');
    readonly profileLocation: Locator = this.page.locator('span[class="tw-flex-1"]');
    readonly profileEmail: Locator = this.page.locator('a[class="tw-flex-1"]')
    readonly profileBiography: Locator = this.page.locator('p[dir="auto"]');
    readonly profileWebSite: Locator = this.page.locator('li>a[target="_blank"]');
    
}