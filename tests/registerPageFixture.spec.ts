import { expect } from '@playwright/test';
import { test } from '../fixtures/not-auth-fixtures';
import { UserGenerator } from '../testdata/users';
import { errorMessages } from '../testdata/errors';

test.describe ('Positive Sign Up tests', () => {

    test('Verify the register form UI', async ({ registerPage }) => {
        await registerPage.verifyRegisterFormUI();
    })

    test('OpenId button redirects to the OpenId login page', async ({ registerPage, openIdLoginPage, page }) => {
        await registerPage.clickOpenIdButton();
        await expect (page).toHaveURL('/user/login/openid');
        await expect(openIdLoginPage.formName).toHaveText('OpenID')
    })

    test('Already have an account link redirects to the Sign in page', async ({ registerPage, signInPage, page }) => {
        await registerPage.clickAlreadyHaveAccountLink();
        await expect (page).toHaveURL('/user/login');
        await expect (signInPage.formName).toHaveText('Sign In')
    })

    test ('Successful registration', async ({ registerPage, mainPage, testUser }) => {
        await registerPage.registerWithCredentials(testUser.users.QaAutoUser1.username, testUser.users.QaAutoUser1.email, testUser.users.QaAutoUser1.password);
        await expect (mainPage.accountCreatedMessage).toHaveText('Account was successfully created. Welcome!');
        await expect (mainPage.switchDashboardDropdown).toHaveText(testUser.users.QaAutoUser1.username);
    })

})

test.describe ('Negative Sign Up tests', () => {
    
    let registeredUser: UserGenerator;
    test.beforeAll(async ({ registration }) => {
         const [registerPage, testUser, header] = registration;
        registeredUser = testUser; // Save user for later tests if needed
      })

    test('User with the same username cannot be registered twice.', async ({registerPage, testUser}) => {
        await registerPage.enterUsername(registeredUser.users.QaAutoUser1.username);
        await registerPage.enterEmail(testUser.users.QaAutoUser2.email);
        await registerPage.enterPassword(testUser.users.QaAutoUser2.password);
        await registerPage.confirmPassword(testUser.users.QaAutoUser2.password);
        await registerPage.clickRegisterButton();
        await expect(registerPage.errorMessage).toHaveText(errorMessages.usernameUsed);
    })

    test('User with the same email cannot be registered twice.', async ({registerPage, testUser}) => {
        await registerPage.enterUsername(testUser.users.QaAutoUser2.username);
        await registerPage.enterEmail(registeredUser.users.QaAutoUser1.email);
        await registerPage.enterPassword(testUser.users.QaAutoUser2.password);
        await registerPage.confirmPassword(testUser.users.QaAutoUser2.password);
        await registerPage.clickRegisterButton();
        await expect(registerPage.errorMessage).toHaveText(errorMessages.emailUsed);
    })

    test('User cannot be registered if passwords do not match.', async ({registerPage, testUser}) => {
        await registerPage.enterUsername(testUser.users.QaAutoUser2.username);
        await registerPage.enterEmail(testUser.users.QaAutoUser2.email);
        await registerPage.enterPassword('12345678');
        await registerPage.confirmPassword('123456789');
        await registerPage.clickRegisterButton();
        await expect(registerPage.errorMessage).toHaveText(errorMessages.passwordsNotMatch);
    })

    test('User cannot be registered if the password is less than 8 characters.', async ({ registerPage, testUser }) => {
        await registerPage.enterUsername(testUser.users.QaAutoUser2.username);
        await registerPage.enterEmail(testUser.users.QaAutoUser2.email);
        await registerPage.enterPassword('1234567');
        await registerPage.confirmPassword('1234567');
        await registerPage.clickRegisterButton();
        await expect(registerPage.errorMessage).toHaveText(errorMessages.weakPassword);
    })

})