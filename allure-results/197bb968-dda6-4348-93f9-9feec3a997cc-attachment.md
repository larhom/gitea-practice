# Test info

- Name: Sign up and save a storage state of the second user
- Location: D:\QA Madness\gitea-practice\tests\setup\auth.spec.ts:27:5

# Error details

```
Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
Call log:
  - navigating to "http://localhost:3000/user/sign_up", waiting until "load"

    at RegisterPage.openPage (D:\QA Madness\gitea-practice\pom\pages\RegisterPage.ts:16:25)
    at D:\QA Madness\gitea-practice\tests\setup\auth.spec.ts:32:24
```

# Test source

```ts
   1 | import { expect, Locator } from "@playwright/test";
   2 | import BasePage from "../basePage";
   3 |
   4 | export default class RegisterPage extends BasePage {
   5 |     readonly formName: Locator = this.page.locator('[class = "ui top attached header center"]');
   6 |     readonly usernameField: Locator = this.page.locator('#user_name');
   7 |     readonly emailAddressField: Locator = this.page.locator('#email');
   8 |     readonly passwordField: Locator = this.page.locator('#password');
   9 |     readonly confirmPasswordField: Locator = this.page.locator('#retype');
  10 |     readonly registerButton: Locator = this.page.locator('[class="ui primary button tw-w-full"]');
  11 |     readonly openIdButton: Locator = this.page.locator('[href="/user/login/openid"]');
  12 |     readonly alreadyHaveAccountLink: Locator = this.page.locator('[href="/user/login"]');
  13 |     readonly errorMessage: Locator= this.page.locator('[class="ui negative message flash-message flash-error"]');
  14 |
  15 |     async openPage() {
> 16 |         await this.page.goto('/user/sign_up')
     |                         ^ Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
  17 |     }
  18 |
  19 |     async verifyRegisterFormUI() {
  20 |         await expect(this.formName).toHaveText('Register');
  21 |         expect(this.usernameField).toBeVisible;
  22 |         expect(this.emailAddressField).toBeVisible;
  23 |         expect(this.passwordField).toBeVisible;
  24 |         expect(this.confirmPasswordField).toBeVisible;
  25 |         expect(this.registerButton).toBeVisible;
  26 |         expect(this.openIdButton).toBeVisible;
  27 |         expect(this.alreadyHaveAccountLink).toBeVisible;
  28 |     }
  29 |
  30 |     async enterUsername(username: string) {
  31 |         await this.usernameField.fill(username);
  32 |     }
  33 |
  34 |     async enterEmail(email: string) {
  35 |         await this.emailAddressField.fill(email);
  36 |     }
  37 |
  38 |     async enterPassword(password: string) {
  39 |         await this.passwordField.fill(password);
  40 |     }
  41 |
  42 |     async confirmPassword(password: string) {
  43 |         await this.confirmPasswordField.fill(password);
  44 |     }
  45 |
  46 |     async clickRegisterButton() {
  47 |         await this.registerButton.click();
  48 |     }
  49 |
  50 |     async registerWithCredentials(username: string, email: string, password: string) {
  51 |         await this.usernameField.fill(username);
  52 |         await this.emailAddressField.fill(email);
  53 |         await this.passwordField.fill(password);
  54 |         await this.confirmPasswordField.fill(password);
  55 |         await this.registerButton.click();
  56 |     }
  57 |
  58 |     async clickOpenIdButton () {
  59 |         await this.openIdButton.click();
  60 |     }
  61 |
  62 |     async clickAlreadyHaveAccountLink() {
  63 |         await this.alreadyHaveAccountLink.click();
  64 |     }
  65 | }
```