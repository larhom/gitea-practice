# Test info

- Name: Profile Settings tests >> Location can be added on the profile settings page
- Location: D:\QA Madness\gitea-practice\tests\profileSettingsPageFixture.spec.ts:79:7

# Error details

```
Error: locator.fill: Target page, context or browser has been closed
Call log:
  - waiting for locator('#location')

    at ProfileSettingsPage.enterLocation (D:\QA Madness\gitea-practice\pom\pages\ProfileSettingsPage.ts:40:34)
    at D:\QA Madness\gitea-practice\tests\profileSettingsPageFixture.spec.ts:80:31
```

# Test source

```ts
   1 | import { Locator } from "@playwright/test";
   2 | import BasePage from "../basePage";
   3 |
   4 | export default class ProfileSettingsPage extends BasePage {
   5 |     readonly usernameField: Locator = this.page.locator('#username');
   6 |     readonly fullNameField: Locator = this.page.locator('#full_name');
   7 |     readonly biographyField: Locator = this.page.locator('#description');
   8 |     readonly webSiteField: Locator = this.page.locator('#website');
   9 |     readonly locationField: Locator = this.page.locator('#location');
  10 |     readonly userVisibilityDropdown: Locator = this.page.locator('svg[class="dropdown icon svg octicon-triangle-down"]');
  11 |     readonly limitedVisibilityOption: Locator = this.page.locator('#_aria_auto_id_16');
  12 |     readonly hideEmailAddressCheckbox: Locator = this.page.locator('#_aria_auto_id_0');
  13 |     readonly updateProfileButton: Locator = this.page.locator('button[class="ui primary button"]:only-child');
  14 |     readonly chooseFileButton: Locator = this.page.locator('#new-avatar');
  15 |     readonly updateAvatarButton: Locator = this.page.locator('form[action="/user/settings/avatar"]>div>[class="ui primary button"]')
  16 |     readonly deleteAvatarButton: Locator = this.page.locator('button[class="ui red button link-action"]');
  17 |     readonly successUpdateMessage: Locator = this.page.locator('[class="ui positive message flash-message flash-success"]')
  18 |
  19 |     async openPage () {
  20 |         await this.page.goto('/user/settings')
  21 |     }
  22 |     
  23 |     async enterUsername(username: string) {
  24 |         await this.usernameField.fill(username);
  25 |     }
  26 |
  27 |     async enterFullName(fullName: string) {
  28 |         await this.fullNameField.fill(fullName);
  29 |     }
  30 |
  31 |     async enterBiography(biography: string) {
  32 |         await this.biographyField.fill(biography);
  33 |     }
  34 |     
  35 |     async enterWebSite(webSite: string) {
  36 |         await this.webSiteField.fill(webSite);
  37 |     }
  38 |       
  39 |     async enterLocation(location: string) {
> 40 |         await this.locationField.fill(location);
     |                                  ^ Error: locator.fill: Target page, context or browser has been closed
  41 |     }
  42 |     
  43 |     async makeUserLimitedVisible() {
  44 |         await this.userVisibilityDropdown.click();
  45 |         await this.limitedVisibilityOption.click();
  46 |         await this.updateProfileButton.click();
  47 |     }
  48 |
  49 |     async checkHideEmailAddressCheckbox() {
  50 |         await this.hideEmailAddressCheckbox.check();
  51 |     }
  52 |
  53 |     async clickUpdateProfileButton() {
  54 |         await this.updateProfileButton.click();
  55 |     }
  56 |
  57 |     async clickChooseFileButton () {
  58 |         await this.chooseFileButton.click();
  59 |     }
  60 |
  61 |     async clickUpdateAvatarButton () {
  62 |         await this.updateAvatarButton.click();
  63 |     }
  64 |
  65 |     async clickDeleteAvatarButton() {
  66 |         await this.deleteAvatarButton.click();
  67 |     }
  68 |
  69 | }
```