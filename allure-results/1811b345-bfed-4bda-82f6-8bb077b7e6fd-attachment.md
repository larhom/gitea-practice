# Test info

- Name: Negative Sign Up tests >> User with the same username cannot be registered twice.
- Location: D:\QA Madness\gitea-practice\tests\registerPageFixture.spec.ts:36:7

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toHaveText(expected)

Locator: locator('[class="ui negative message flash-message flash-error"]')
Expected string: "The username is already taken."
Received: <element(s) not found>
Call log:
  - expect.toHaveText with timeout 5000ms
  - waiting for locator('[class="ui negative message flash-message flash-error"]')

    at D:\QA Madness\gitea-practice\tests\registerPageFixture.spec.ts:43:45
```

# Page snapshot

```yaml
- navigation "Navigation Bar":
  - link "Dashboard":
    - /url: /
  - link "Issues":
    - /url: /issues
  - link "Pull Requests":
    - /url: /pulls
  - link "Milestones":
    - /url: /milestones
  - link "Explore":
    - /url: /explore/repos
  - link "Notifications":
    - /url: /notifications
  - menu "Create…"
  - menu "Profile and Settings…":
    - img "QaAuto_user11748720944037"
- main "QaAuto_user11748720944037 - Dashboard":
  - menu:
    - img "QaAuto_user11748720944037"
    - text: QaAuto_user11748720944037
  - paragraph: Account was successfully created. Welcome!
  - text: Repository Organization
  - heading "Repositories 0 New Repository" [level=4]:
    - text: Repositories 0
    - link "New Repository":
      - /url: /repo/create
  - searchbox "Search repos..."
  - combobox "Other Filters"
  - navigation:
    - text: All 0 Sources Forks Mirrors
    - button "More items"
- group "Footer":
  - contentinfo "About Software":
    - link "Powered by Gitea":
      - /url: https://about.gitea.com
    - text: "Version: 1.23.8 Page:"
    - strong: 35ms
    - text: "Template:"
    - strong: 31ms
  - group "Links":
    - menu: English
    - link "Licenses":
      - /url: /assets/licenses.txt
    - link "API":
      - /url: /api/swagger
```

# Test source

```ts
   1 | import { expect } from '@playwright/test';
   2 | import { test } from '../fixtures/my-fixtures';
   3 | import RegisterPage from '../pom/pages/RegisterPage';
   4 | import { UserGenerator } from '../testdata/users';
   5 | import MainPage from '../pom/pages/MainPage';
   6 | import { errorMessages } from '../testdata/errors';
   7 |
   8 | test.describe ('Positive Sign Up tests', () => {
   9 |
  10 |   test('Verify the register form UI', async ({ registerPage }) => {
  11 |     await registerPage.verifyRegisterFormUI();
  12 |   })
  13 |
  14 |   test('OpenId button redirects to the OpenId login page', async ({ registerPage, openIdLoginPage, page }) => {
  15 |     await registerPage.clickOpenIdButton();
  16 |     await expect (page).toHaveURL('/user/login/openid');
  17 |     await expect(openIdLoginPage.formName).toHaveText('OpenID')
  18 |   })
  19 |
  20 |   test('Already have an account link redirects to the Sign in page', async ({ registerPage, signInPage, page }) => {
  21 |     await registerPage.clickAlreadyHaveAccountLink();
  22 |     await expect (page).toHaveURL('/user/login');
  23 |     await expect (signInPage.formName).toHaveText('Sign In')
  24 |   })
  25 |
  26 |   test ('Successful registration', async ({ registerPage, mainPage, testUser }) => {
  27 |     await registerPage.registerWithCredentials(testUser.users.QaAutoUser1.username, testUser.users.QaAutoUser1.email, testUser.users.QaAutoUser1.password);
  28 |     await expect (mainPage.accountCreatedMessage).toHaveText('Account was successfully created. Welcome!');
  29 |     await expect (mainPage.switchDashboardDropdown).toHaveText(testUser.users.QaAutoUser1.username);
  30 |   })
  31 |
  32 | })
  33 |
  34 | test.describe ('Negative Sign Up tests', () => {
  35 |
  36 |   test('User with the same username cannot be registered twice.', async ({registration, registerPage, testUser}) => {
  37 |     await registration;
  38 |     await registerPage.enterUsername(testUser.users.QaAutoUser1.username);
  39 |     await registerPage.enterEmail(testUser.users.QaAutoUser2.email);
  40 |     await registerPage.enterPassword(testUser.users.QaAutoUser2.password);
  41 |     await registerPage.confirmPassword(testUser.users.QaAutoUser2.password);
  42 |     await registerPage.clickRegisterButton();
> 43 |     await expect(registerPage.errorMessage).toHaveText(errorMessages.usernameUsed);
     |                                             ^ Error: Timed out 5000ms waiting for expect(locator).toHaveText(expected)
  44 |   })
  45 |
  46 |   test('User with the same email cannot be registered twice.', async ({ page }) => {
  47 |     await registerPage.enterUsername(testUser.users.QaAutoUser2.username);
  48 |     await registerPage.enterEmail(testUser.users.QaAutoUser1.email);
  49 |     await registerPage.enterPassword(testUser.users.QaAutoUser2.password);
  50 |     await registerPage.confirmPassword(testUser.users.QaAutoUser2.password);
  51 |     await registerPage.clickRegisterButton();
  52 |     await expect(registerPage.errorMessage).toHaveText(errorMessages.emailUsed);
  53 |   })
  54 |
  55 |   test('User cannot be registered if passwords do not match.', async ({ page }) => {
  56 |     await registerPage.enterUsername(testUser.users.QaAutoUser2.username);
  57 |     await registerPage.enterEmail(testUser.users.QaAutoUser2.email);
  58 |     await registerPage.enterPassword('12345678');
  59 |     await registerPage.confirmPassword('123456789');
  60 |     await registerPage.clickRegisterButton();
  61 |     await expect(registerPage.errorMessage).toHaveText(errorMessages.passwordsNotMatch);
  62 |   })
  63 |
  64 |   test('User cannot be registered if the password is less than 8 characters.', async ({ page }) => {
  65 |     await registerPage.enterUsername(testUser.users.QaAutoUser2.username);
  66 |     await registerPage.enterEmail(testUser.users.QaAutoUser2.email);
  67 |     await registerPage.enterPassword('1234567');
  68 |     await registerPage.confirmPassword('1234567');
  69 |     await registerPage.clickRegisterButton();
  70 |     await expect(registerPage.errorMessage).toHaveText(errorMessages.weakPassword);
  71 |   })
  72 |
  73 | })
```