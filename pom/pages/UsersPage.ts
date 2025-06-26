import { Locator } from "@playwright/test";
import BasePage from "../BasePage";

export default class UsersPage extends BasePage {
    readonly searchField: Locator = this.page.locator('input[type="search"]');
    readonly searchButton: Locator = this.page.locator('button[class="ui small icon button"]');
    readonly searchResult: Locator = this.page.locator('a[class="text muted"]');
    readonly userEmail: Locator = this.page.locator('span[class="flex-text-inline"]>a')
    readonly noSearchResults: Locator = this.page.locator('div[class="flex-item"]');

    async openPage() {
        await this.page.goto('/explore/users');
    }

    async searchForUser(username: string) {
        await this.searchField.fill(username);
        await this.searchButton.click();
    }
    
}