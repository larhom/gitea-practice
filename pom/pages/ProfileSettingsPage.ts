import { Locator } from "@playwright/test";
import BasePage from "../basePage";

export default class ProfileSettingsPage extends BasePage {
    readonly usernameField: Locator = this.page.locator('#username');
    readonly fullNameField: Locator = this.page.locator('#full_name');
    readonly biographyField: Locator = this.page.locator('#description');
    readonly webSiteField: Locator = this.page.locator('#website');
    readonly locationField: Locator = this.page.locator('#location');
    readonly userVisibilityDropdown: Locator = this.page.locator('svg[class="dropdown icon svg octicon-triangle-down"]');
    readonly limitedVisibilityOption: Locator = this.page.locator('#_aria_auto_id_16');
    readonly hideEmailAddressCheckbox: Locator = this.page.locator('#_aria_auto_id_0');
    readonly updateProfileButton: Locator = this.page.locator('button[class="ui primary button"]:only-child');
    readonly chooseFileButton: Locator = this.page.locator('#new-avatar');
    readonly updateAvatarButton: Locator = this.page.locator('form[action="/user/settings/avatar"]>div>[class="ui primary button"]')
    readonly deleteAvatarButton: Locator = this.page.locator('button[class="ui red button link-action"]');
    readonly successUpdateMessage: Locator = this.page.locator('[class="ui positive message flash-message flash-success"]')

    async openPage () {
        await this.page.goto('/user/settings')
    }
    
    async enterUsername(username: string) {
        await this.usernameField.fill(username);
    }

    async enterFullName(fullName: string) {
        await this.fullNameField.fill(fullName);
    }

    async enterBiography(biography: string) {
        await this.biographyField.fill(biography);
    }
    
    async enterWebSite(webSite: string) {
        await this.webSiteField.fill(webSite);
    }
      
    async enterLocation(location: string) {
        await this.locationField.fill(location);
    }
    
    async makeUserLimitedVisible() {
        await this.userVisibilityDropdown.click();
        await this.limitedVisibilityOption.click();
        await this.updateProfileButton.click();
    }

    async checkHideEmailAddressCheckbox() {
        await this.hideEmailAddressCheckbox.check();
    }

    async clickUpdateProfileButton() {
        await this.updateProfileButton.click();
    }

    async clickChooseFileButton () {
        await this.chooseFileButton.click();
    }

    async clickUpdateAvatarButton () {
        await this.updateAvatarButton.click();
    }

    async clickDeleteAvatarButton() {
        await this.deleteAvatarButton.click();
    }

}