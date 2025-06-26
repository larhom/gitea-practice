import { Locator } from "@playwright/test";
import BasePage from "../BasePage";

export default class MainPage extends BasePage {
    readonly accountCreatedMessage: Locator = this.page.locator('[class="ui positive message flash-message flash-success"]');
    readonly switchDashboardDropdown: Locator = this.page.locator('span>.truncated-item-name');
    readonly loggedOutUserHeader: Locator = this.page.locator('h1[class="ui icon header title"]');
}