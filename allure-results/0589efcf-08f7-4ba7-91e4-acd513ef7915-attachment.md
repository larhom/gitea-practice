# Test info

- Name: Negative Sign Up tests >> User with the same username cannot be registered twice.
- Location: D:\QA Madness\gitea-practice\tests\registerPage.spec.ts:68:7

# Error details

```
Error: "context" and "page" fixtures are not supported in "beforeAll" since they are created on a per-test basis.
If you would like to reuse a single page between tests, create context manually with browser.newContext(). See https://aka.ms/playwright/reuse-page for details.
If you would like to configure your page before each test, do that in beforeEach hook instead.
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 | import RegisterPage from '../pom/pages/RegisterPage';
   3 | import { UserGenerator } from '../testdata/users';
   4 | import OpenIdLoginPage from '../pom/pages/OpenIdLoginPage';
   5 | import SignInPage from '../pom/pages/SignInPage';
   6 | import MainPage from '../pom/pages/MainPage';
   7 | import { errorMessages } from '../testdata/errors';
   8 |
   9 | test.describe ('Positive Sign Up tests', () => {
   10 |   let registerPage: RegisterPage;
   11 |   let testUser: UserGenerator;
   12 |   let openIdLoginPage: OpenIdLoginPage;
   13 |   let signInPage: SignInPage;
   14 |   let mainPage: MainPage;
   15 |
   16 |   test.beforeEach (async({ page }) => {
   17 |     registerPage = new RegisterPage (page);
   18 |     openIdLoginPage = new OpenIdLoginPage (page);
   19 |     signInPage = new SignInPage (page);
   20 |     mainPage = new MainPage (page);
   21 |     testUser = new UserGenerator;
   22 |     await registerPage.openPage();
   23 |   })
   24 |
   25 |   test('Verify the register form UI', async () => {
   26 |     await registerPage.verifyRegisterFormUI();
   27 |   })
   28 |
   29 |   test('OpenId button redirects to the OpenId login page', async ({ page }) => {
   30 |     await registerPage.clickOpenIdButton();
   31 |     await expect (page).toHaveURL('/user/login/openid');
   32 |     await expect(openIdLoginPage.formName).toHaveText('OpenID')
   33 |   })
   34 |
   35 |   test('Already have an account link redirects to the Sign in page', async ({ page }) => {
   36 |     await registerPage.clickAlreadyHaveAccountLink();
   37 |     await expect (page).toHaveURL('/user/login');
   38 |     await expect (signInPage.formName).toHaveText('Sign In')
   39 |   })
   40 |
   41 |   test ('Successful registration', async () => {
   42 |     await registerPage.registerWithCredentials(testUser.users.QaAutoUser1.username, testUser.users.QaAutoUser1.email, testUser.users.QaAutoUser1.password);
   43 |     await expect (mainPage.accountCreatedMessage).toHaveText('Account was successfully created. Welcome!');
   44 |     await expect (mainPage.switchDashboardDropdown).toHaveText(testUser.users.QaAutoUser1.username);
   45 |   })
   46 |
   47 | })
   48 |
   49 | test.describe ('Negative Sign Up tests', () => {
   50 |   let registerPage: RegisterPage;
   51 |   let testUser: UserGenerator;
   52 |   let mainPage: MainPage;
   53 |
   54 |   test.beforeAll (async({ page }) => {
   55 |     registerPage = new RegisterPage (page);
   56 |     mainPage = new MainPage (page);
   57 |     testUser = new UserGenerator;
   58 |     await registerPage.openPage();
   59 |     await registerPage.registerWithCredentials(testUser.users.QaAutoUser1.username, testUser.users.QaAutoUser1.email, testUser.users.QaAutoUser1.password);
   60 |     await expect (mainPage.accountCreatedMessage).toHaveText('Account was successfully created. Welcome!');
   61 |     await expect (mainPage.switchDashboardDropdown).toHaveText(testUser.users.QaAutoUser1.username);
   62 |   })
   63 |
   64 |   test.beforeEach (async({ page }) => {
   65 |     await registerPage.openPage();
   66 |   })
   67 |
>  68 |   test('User with the same username cannot be registered twice.', async ({ page }) => {
      |       ^ Error: "context" and "page" fixtures are not supported in "beforeAll" since they are created on a per-test basis.
   69 |     await registerPage.enterUsername(testUser.users.QaAutoUser1.username);
   70 |     await registerPage.enterEmail(testUser.users.QaAutoUser2.email);
   71 |     await registerPage.enterPassword(testUser.users.QaAutoUser2.password);
   72 |     await registerPage.confirmPassword(testUser.users.QaAutoUser2.password);
   73 |     await registerPage.clickRegisterButton();
   74 |     await expect(registerPage.errorMessage).toHaveText(errorMessages.usernameUsed);
   75 |   })
   76 |
   77 |   test('User with the same email cannot be registered twice.', async ({ page }) => {
   78 |     await registerPage.enterUsername(testUser.users.QaAutoUser2.username);
   79 |     await registerPage.enterEmail(testUser.users.QaAutoUser1.email);
   80 |     await registerPage.enterPassword(testUser.users.QaAutoUser2.password);
   81 |     await registerPage.confirmPassword(testUser.users.QaAutoUser2.password);
   82 |     await registerPage.clickRegisterButton();
   83 |     await expect(registerPage.errorMessage).toHaveText(errorMessages.emailUsed);
   84 |   })
   85 |
   86 |   test('User cannot be registered if passwords do not match.', async ({ page }) => {
   87 |     await registerPage.enterUsername(testUser.users.QaAutoUser2.username);
   88 |     await registerPage.enterEmail(testUser.users.QaAutoUser2.email);
   89 |     await registerPage.enterPassword('12345678');
   90 |     await registerPage.confirmPassword('123456789');
   91 |     await registerPage.clickRegisterButton();
   92 |     await expect(registerPage.errorMessage).toHaveText(errorMessages.passwordsNotMatch);
   93 |   })
   94 |
   95 |   test('User cannot be registered if the password is less than 8 characters.', async ({ page }) => {
   96 |     await registerPage.enterUsername(testUser.users.QaAutoUser2.username);
   97 |     await registerPage.enterEmail(testUser.users.QaAutoUser2.email);
   98 |     await registerPage.enterPassword('1234567');
   99 |     await registerPage.confirmPassword('1234567');
  100 |     await registerPage.clickRegisterButton();
  101 |     await expect(registerPage.errorMessage).toHaveText(errorMessages.weakPassword);
  102 |   })
  103 |
  104 | })
```