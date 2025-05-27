import { test, expect, LocatorScreenshotOptions } from '@playwright/test';
import path from 'path';
import RegisterPage from '../pom/pages/RegisterPage';
import { UserGenerator } from '../testdata/users';
import SignInPage from '../pom/pages/SignInPage';
import MainPage from '../pom/pages/MainPage';
import ProfileSettingsPage from '../pom/pages/ProfileSettingsPage';
import Header from '../pom/modules/Header';
import ProfilePage from '../pom/pages/ProfilePage';
import UsersPage from '../pom/pages/UsersPage';
import { Locator } from '@playwright/test';

test.describe ('Profile Settings tests', () => {
  let registerPage: RegisterPage;
  let testUser: UserGenerator;
  let mainPage: MainPage;
  let signInPage: SignInPage;
  let profileSettingsPage: ProfileSettingsPage;
  let header: Header;
  let profilePage: ProfilePage;
  let usersPage: UsersPage;

  test.beforeAll (async({ page }) => {
    registerPage = new RegisterPage (page);
    mainPage = new MainPage (page);
    testUser = new UserGenerator;
    header = new Header (page);
    signInPage = new SignInPage (page);
    profileSettingsPage = new ProfileSettingsPage (page);
    profilePage = new ProfilePage (page);
    usersPage = new UsersPage (page);
    await registerPage.openPage();
    await registerPage.registerWithCredentials(testUser.users.QaAutoUser1.username, testUser.users.QaAutoUser1.email, testUser.users.QaAutoUser1.password);
    await expect (mainPage.accountCreatedMessage).toHaveText('Account was successfully created. Welcome!');
    await expect (mainPage.switchDashboardDropdown).toHaveText(testUser.users.QaAutoUser1.username);
  })

  test.beforeEach (async({ page }) => {
    await signInPage.openPage();
    await signInPage.signInWithUsername(testUser.users.QaAutoUser1.username, testUser.users.QaAutoUser1.password);
    await expect (mainPage.switchDashboardDropdown).toHaveText(testUser.users.QaAutoUser1.username);
    await header.openSettingsPage();
  })

  test('Full name can be added on the profile settings page', async ({ page }) => {
    await profileSettingsPage.enterFullName(testUser.users.QaAutoUser1.fullName);
    await profileSettingsPage.clickUpdateProfileButton();
    await expect (profileSettingsPage.successUpdateMessage).toHaveText('Your profile has been updated.');
    await expect (profileSettingsPage.fullNameField).toHaveValue(testUser.users.QaAutoUser1.fullName);
    await profilePage.openPage(testUser.users.QaAutoUser1.username);
    await expect (profilePage.profileFullName).toHaveText(testUser.users.QaAutoUser1.fullName);
  })

  test('Biography can be added on the profile settings page', async ({ page }) => {
    await profileSettingsPage.enterBiography(testUser.users.QaAutoUser1.biography);
    await profileSettingsPage.clickUpdateProfileButton();
    await expect (profileSettingsPage.successUpdateMessage).toHaveText('Your profile has been updated.');
    await expect (profileSettingsPage.biographyField).toHaveValue(testUser.users.QaAutoUser1.biography);
    await header.openProfilePage();
    await expect (profilePage.profileBiography).toHaveText(testUser.users.QaAutoUser1.biography);
  })

  test('Website can be added on the profile settings page', async ({ page }) => {
    await profileSettingsPage.enterWebSite(testUser.users.QaAutoUser1.website);
    await profileSettingsPage.clickUpdateProfileButton();
    await expect (profileSettingsPage.successUpdateMessage).toHaveText('Your profile has been updated.');
    await expect (profileSettingsPage.webSiteField).toHaveValue(testUser.users.QaAutoUser1.website);
    await header.openProfilePage();
    await expect (profilePage.profileWebSite).toHaveText(testUser.users.QaAutoUser1.website);
  })

  test('Location can be added on the profile settings page', async ({ page }) => {
    await profileSettingsPage.enterLocation(testUser.users.QaAutoUser1.location);
    await profileSettingsPage.clickUpdateProfileButton();
    await expect (profileSettingsPage.successUpdateMessage).toHaveText('Your profile has been updated.');
    await expect (profileSettingsPage.locationField).toHaveValue(testUser.users.QaAutoUser1.location);
    await header.openProfilePage();
    await expect (profilePage.profileLocation).toHaveText(testUser.users.QaAutoUser1.location);
  })

  test('Email address can be hidden on the profile settings page', async ({ page }) => {
    await usersPage.openPage();
    await usersPage.searchForUser(testUser.users.QaAutoUser1.username);
    await expect (usersPage.searchResult).toContainText(testUser.users.QaAutoUser1.username);
    await expect (usersPage.userEmail).toBeVisible();
    await header.openSettingsPage();
    await profileSettingsPage.checkHideEmailAddressCheckbox();
    await profileSettingsPage.clickUpdateProfileButton();
    await expect (profileSettingsPage.hideEmailAddressCheckbox).toBeChecked();
    await usersPage.openPage();
    await usersPage.searchForUser(testUser.users.QaAutoUser1.username);
    await expect (usersPage.searchResult).toContainText(testUser.users.QaAutoUser1.username);
    await expect (usersPage.userEmail).not.toBeVisible();
  })

  test('Update avatar on the profile settings page', async ({ page }) => {
    const imgElement = await header.profileImage;
    const oldSrc = await imgElement.getAttribute('src');
    await profileSettingsPage.chooseFileButton.setInputFiles(path.join(__dirname, '../testdata', 'OIP.jpg'));
    await profileSettingsPage.clickUpdateAvatarButton();
    await expect (profileSettingsPage.successUpdateMessage).toHaveText('Your avatar has been updated.');
    await expect(imgElement).not.toHaveAttribute('src', oldSrc!);
    const newSrc = await imgElement.getAttribute('src');
    expect(newSrc).not.toBe(oldSrc);
  })

})

test.describe ('Profile Settings tests that require the second user', () => {
  let registerPage: RegisterPage;
  let testUser: UserGenerator;
  let mainPage: MainPage;
  let signInPage: SignInPage;
  let profileSettingsPage: ProfileSettingsPage;
  let header: Header;
  let profilePage: ProfilePage;
  let usersPage: UsersPage;

  test.beforeAll (async({ page }) => {
    registerPage = new RegisterPage (page);
    mainPage = new MainPage (page);
    testUser = new UserGenerator;
    header = new Header (page);
    signInPage = new SignInPage (page);
    profileSettingsPage = new ProfileSettingsPage (page);
    profilePage = new ProfilePage (page);
    usersPage = new UsersPage (page);
    await registerPage.openPage();
    await registerPage.registerWithCredentials(testUser.users.QaAutoUser1.username, testUser.users.QaAutoUser1.email, testUser.users.QaAutoUser1.password);
    await expect (mainPage.accountCreatedMessage).toHaveText('Account was successfully created. Welcome!');
    await expect (mainPage.switchDashboardDropdown).toHaveText(testUser.users.QaAutoUser1.username);
    await header.signOut();
    await registerPage.openPage();
    await registerPage.registerWithCredentials(testUser.users.QaAutoUser2.username, testUser.users.QaAutoUser2.email, testUser.users.QaAutoUser2.password);
    await expect (mainPage.accountCreatedMessage).toHaveText('Account was successfully created. Welcome!');
    await expect (mainPage.switchDashboardDropdown).toHaveText(testUser.users.QaAutoUser2.username);
  })

  test('Profile visibility can be changed to limited on the profile settings page', async ({ page }) => {
    await test.step('Check the user is visible in the list of users by default', async () => {
      await usersPage.openPage();
      await usersPage.searchForUser(testUser.users.QaAutoUser1.username);
      await expect (usersPage.searchResult).toContainText(testUser.users.QaAutoUser1.username);
    });
    await test.step('Change the user visibility to limited', async () => {
      await signInPage.openPage();
      await signInPage.signInWithEmail(testUser.users.QaAutoUser1.email, testUser.users.QaAutoUser1.password);
      await header.openSettingsPage();
      await profileSettingsPage.makeUserLimitedVisible();
    });
    await test.step('Check the limited user isn\'t visible for not signed users', async () => {
      await header.signOut();
      await expect (mainPage.loggedOutUserHeader).toBeVisible();
      await usersPage.openPage();
      await usersPage.searchForUser(testUser.users.QaAutoUser1.username);
      await expect (usersPage.noSearchResults).toBeVisible();
    });
    await test.step('Check the limited user is visible for signed users', async () => {
      await signInPage.openPage();
      await signInPage.signInWithEmail(testUser.users.QaAutoUser2.email, testUser.users.QaAutoUser2.password);
      await expect (mainPage.switchDashboardDropdown).toHaveText(testUser.users.QaAutoUser2.username);
      await usersPage.openPage();
      await usersPage.searchForUser(testUser.users.QaAutoUser1.username);
      await expect (usersPage.searchResult).toContainText(testUser.users.QaAutoUser1.username);
    });
  })

  test('Delete avatar on the profile settings page', async ({ page }) => {
    let imgElement: Locator;
    let src1: string | null;
    let src2: string | null;
    let src3: string | null;
    await test.step('Check a user doesn\'t have a default profile image', async () => {
      await signInPage.openPage();
      await signInPage.signInWithEmail(testUser.users.QaAutoUser2.email, testUser.users.QaAutoUser2.password);
      await header.openSettingsPage();
      imgElement = await header.profileImage;
      src1 = await imgElement.getAttribute('src');
    });
    await test.step('Update the profile image', async () => {
      await profileSettingsPage.chooseFileButton.setInputFiles(path.join(__dirname, '../testdata', 'OIP.jpg'));
      await profileSettingsPage.clickUpdateAvatarButton();
      await expect (profileSettingsPage.successUpdateMessage).toHaveText('Your avatar has been updated.');
      await expect(imgElement).not.toHaveAttribute('src', src1!);
      src2 = await imgElement.getAttribute('src');
      expect(src2).not.toBe(src1);
    });
    await test.step('Log in', async () => {
      await profileSettingsPage.clickDeleteAvatarButton();
      await expect(imgElement).not.toHaveAttribute('src', src2!);
      src3 = await imgElement.getAttribute('src');
      expect(src3).toBe(src1);
    });
  })

})