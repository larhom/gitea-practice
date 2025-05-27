import { test, expect } from '@playwright/test';
import RegisterPage from '../pom/pages/RegisterPage';
import { UserGenerator } from '../testdata/users';
import OpenIdLoginPage from '../pom/pages/OpenIdLoginPage';
import SignInPage from '../pom/pages/SignInPage';
import MainPage from '../pom/pages/MainPage';
import { errorMessages } from '../testdata/errors';

test.describe ('Positive Sign Up tests', () => {
  let registerPage: RegisterPage;
  let testUser: UserGenerator;
  let openIdLoginPage: OpenIdLoginPage;
  let signInPage: SignInPage;
  let mainPage: MainPage;

  test.beforeEach (async({ page }) => {
    registerPage = new RegisterPage (page);
    openIdLoginPage = new OpenIdLoginPage (page);
    signInPage = new SignInPage (page);
    mainPage = new MainPage (page);
    testUser = new UserGenerator;
    await registerPage.openPage();
  })

  test('Verify the register form UI', async () => {
    await registerPage.verifyRegisterFormUI();
  })

  test('OpenId button redirects to the OpenId login page', async ({ page }) => {
    await registerPage.clickOpenIdButton();
    await expect (page).toHaveURL('/user/login/openid');
    await expect(openIdLoginPage.formName).toHaveText('OpenID')
  })

  test('Already have an account link redirects to the Sign in page', async ({ page }) => {
    await registerPage.clickAlreadyHaveAccountLink();
    await expect (page).toHaveURL('/user/login');
    await expect (signInPage.formName).toHaveText('Sign In')
  })

  test ('Successful registration', async () => {
    await registerPage.registerWithCredentials(testUser.users.QaAutoUser1.username, testUser.users.QaAutoUser1.email, testUser.users.QaAutoUser1.password);
    await expect (mainPage.accountCreatedMessage).toHaveText('Account was successfully created. Welcome!');
    await expect (mainPage.switchDashboardDropdown).toHaveText(testUser.users.QaAutoUser1.username);
  })

})

test.describe ('Negative Sign Up tests', () => {
  let registerPage: RegisterPage;
  let testUser: UserGenerator;
  let mainPage: MainPage;

  test.beforeAll (async({ page }) => {
    registerPage = new RegisterPage (page);
    mainPage = new MainPage (page);
    testUser = new UserGenerator;
    await registerPage.openPage();
    await registerPage.registerWithCredentials(testUser.users.QaAutoUser1.username, testUser.users.QaAutoUser1.email, testUser.users.QaAutoUser1.password);
    await expect (mainPage.accountCreatedMessage).toHaveText('Account was successfully created. Welcome!');
    await expect (mainPage.switchDashboardDropdown).toHaveText(testUser.users.QaAutoUser1.username);
  })

  test.beforeEach (async({ page }) => {
    await registerPage.openPage();
  })

  test('User with the same username cannot be registered twice.', async ({ page }) => {
    await registerPage.enterUsername(testUser.users.QaAutoUser1.username);
    await registerPage.enterEmail(testUser.users.QaAutoUser2.email);
    await registerPage.enterPassword(testUser.users.QaAutoUser2.password);
    await registerPage.confirmPassword(testUser.users.QaAutoUser2.password);
    await registerPage.clickRegisterButton();
    await expect(registerPage.errorMessage).toHaveText(errorMessages.usernameUsed);
  })

  test('User with the same email cannot be registered twice.', async ({ page }) => {
    await registerPage.enterUsername(testUser.users.QaAutoUser2.username);
    await registerPage.enterEmail(testUser.users.QaAutoUser1.email);
    await registerPage.enterPassword(testUser.users.QaAutoUser2.password);
    await registerPage.confirmPassword(testUser.users.QaAutoUser2.password);
    await registerPage.clickRegisterButton();
    await expect(registerPage.errorMessage).toHaveText(errorMessages.emailUsed);
  })

  test('User cannot be registered if passwords do not match.', async ({ page }) => {
    await registerPage.enterUsername(testUser.users.QaAutoUser2.username);
    await registerPage.enterEmail(testUser.users.QaAutoUser2.email);
    await registerPage.enterPassword('12345678');
    await registerPage.confirmPassword('123456789');
    await registerPage.clickRegisterButton();
    await expect(registerPage.errorMessage).toHaveText(errorMessages.passwordsNotMatch);
  })

  test('User cannot be registered if the password is less than 8 characters.', async ({ page }) => {
    await registerPage.enterUsername(testUser.users.QaAutoUser2.username);
    await registerPage.enterEmail(testUser.users.QaAutoUser2.email);
    await registerPage.enterPassword('1234567');
    await registerPage.confirmPassword('1234567');
    await registerPage.clickRegisterButton();
    await expect(registerPage.errorMessage).toHaveText(errorMessages.weakPassword);
  })

})