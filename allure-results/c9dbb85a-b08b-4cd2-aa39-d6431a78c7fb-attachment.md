# Test info

- Name: Negative Sign Up tests >> User with the same username cannot be registered twice.
- Location: D:\QA Madness\gitea-practice\tests\registerPageFixture.spec.ts:49:7

# Error details

```
Error: "context" and "page" fixtures are not supported in "beforeAll" since they are created on a per-test basis.
If you would like to reuse a single page between tests, create context manually with browser.newContext(). See https://aka.ms/playwright/reuse-page for details.
If you would like to configure your page before each test, do that in beforeEach hook instead.
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
  35 |     let registeredUser: UserGenerator;
  36 |
  37 |     test.beforeAll(async ({ registration }) => {
  38 |         const [registerPage, testUser, header] = registration;
  39 |         registeredUser = testUser; // Save user for later tests if needed
  40 |     });
  41 |     
  42 |     // test.beforeAll (async({ registerPage, testUser, mainPage, header }) => {
  43 |     //     await registerPage.registerWithCredentials(testUser.users.QaAutoUser1.username, testUser.users.QaAutoUser1.email, testUser.users.QaAutoUser1.password);
  44 |     //     await expect (mainPage.accountCreatedMessage).toHaveText('Account was successfully created. Welcome!');
  45 |     //     await expect (mainPage.switchDashboardDropdown).toHaveText(testUser.users.QaAutoUser1.username);
  46 |     //     await header.signOut();
  47 |     //   })
  48 |
> 49 |   test('User with the same username cannot be registered twice.', async ({ registerPage, testUser }) => {
     |       ^ Error: "context" and "page" fixtures are not supported in "beforeAll" since they are created on a per-test basis.
  50 |     await registerPage.enterUsername(registeredUser.users.QaAutoUser1.username);
  51 |     await registerPage.enterEmail(testUser.users.QaAutoUser2.email);
  52 |     await registerPage.enterPassword(testUser.users.QaAutoUser2.password);
  53 |     await registerPage.confirmPassword(testUser.users.QaAutoUser2.password);
  54 |     await registerPage.clickRegisterButton();
  55 |     await expect(registerPage.errorMessage).toHaveText(errorMessages.usernameUsed);
  56 |   })
  57 |
  58 |   test('User with the same email cannot be registered twice.', async ({ registerPage, testUser }) => {
  59 |     await registerPage.enterUsername(testUser.users.QaAutoUser2.username);
  60 |     await registerPage.enterEmail(registeredUser.users.QaAutoUser1.email);
  61 |     await registerPage.enterPassword(testUser.users.QaAutoUser2.password);
  62 |     await registerPage.confirmPassword(testUser.users.QaAutoUser2.password);
  63 |     await registerPage.clickRegisterButton();
  64 |     await expect(registerPage.errorMessage).toHaveText(errorMessages.emailUsed);
  65 |   })
  66 |
  67 |   test('User cannot be registered if passwords do not match.', async ({ registerPage, testUser }) => {
  68 |     await registerPage.enterUsername(testUser.users.QaAutoUser2.username);
  69 |     await registerPage.enterEmail(testUser.users.QaAutoUser2.email);
  70 |     await registerPage.enterPassword('12345678');
  71 |     await registerPage.confirmPassword('123456789');
  72 |     await registerPage.clickRegisterButton();
  73 |     await expect(registerPage.errorMessage).toHaveText(errorMessages.passwordsNotMatch);
  74 |   })
  75 |
  76 |   test('User cannot be registered if the password is less than 8 characters.', async ({ registerPage, testUser }) => {
  77 |     await registerPage.enterUsername(testUser.users.QaAutoUser2.username);
  78 |     await registerPage.enterEmail(testUser.users.QaAutoUser2.email);
  79 |     await registerPage.enterPassword('1234567');
  80 |     await registerPage.confirmPassword('1234567');
  81 |     await registerPage.clickRegisterButton();
  82 |     await expect(registerPage.errorMessage).toHaveText(errorMessages.weakPassword);
  83 |   })
  84 |
  85 | })
```