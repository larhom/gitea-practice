import { expect } from '@playwright/test';
import { test } from '../fixtures/auth-fixture';
import { test as loggedOutTest } from '../fixtures/not-auth-fixtures';
import path from 'path';
// import RegisterPage from '../pom/pages/RegisterPage';
// import { UserGenerator } from '../testdata/users';
// import SignInPage from '../pom/pages/SignInPage';
// import MainPage from '../pom/pages/MainPage';
// import ProfileSettingsPage from '../pom/pages/ProfileSettingsPage';
// import Header from '../pom/modules/Header';
// import ProfilePage from '../pom/pages/ProfilePage';
// import UsersPage from '../pom/pages/UsersPage';
// import { Locator } from '@playwright/test';
import { loadTestUsers } from '../utils/loadTestUsers';
// import { loadTestUser2 } from '../utils/loadTestUsers';
import { Locator } from '@playwright/test';

// let testUser = new UserGenerator();
// test.describe ('Profile Settings tests', () => {
//   let registerPage: RegisterPage;
//   let testUser: UserGenerator;
//   let mainPage: MainPage;
//   let signInPage: SignInPage;
//   let profileSettingsPage: ProfileSettingsPage;
//   let header: Header;
//   let profilePage: ProfilePage;
//   let usersPage: UsersPage;

//   test.beforeAll (async({ page }) => {
//     registerPage = new RegisterPage (page);
//     mainPage = new MainPage (page);
//     testUser = new UserGenerator;
//     header = new Header (page);
//     signInPage = new SignInPage (page);
//     profileSettingsPage = new ProfileSettingsPage (page);
//     profilePage = new ProfilePage (page);
//     usersPage = new UsersPage (page);
//   })

//   test.beforeEach (async({ storageStatePage }) => {
//     await storageStatePage.
//     await header.openSettingsPage();
//   })

test.describe ('Profile Settings tests', () => {
  let testUsers: any;
  test.beforeEach  (async({ storageStatePage }) => {
    await storageStatePage.goto('/user/settings')
    testUsers = loadTestUsers();
  })

  test('Full name can be added on the profile settings page', async ({ profileSettingsPage, profilePage }) => {
    await profileSettingsPage.enterFullName(testUsers.users.QaAutoUser1.fullName);
    await profileSettingsPage.clickUpdateProfileButton();
    await expect (profileSettingsPage.successUpdateMessage).toHaveText('Your profile has been updated.');
    await expect (profileSettingsPage.fullNameField).toHaveValue(testUsers.users.QaAutoUser1.fullName);
    await profilePage.openPage(testUsers.users.QaAutoUser1.username);
    await expect (profilePage.profileFullName).toHaveText(testUsers.users.QaAutoUser1.fullName);
  })

  test('Biography can be added on the profile settings page', async ({ profileSettingsPage, profilePage }) => {
    await profileSettingsPage.enterBiography(testUsers.users.QaAutoUser1.biography);
    await profileSettingsPage.clickUpdateProfileButton();
    await expect (profileSettingsPage.successUpdateMessage).toHaveText('Your profile has been updated.');
    await expect (profileSettingsPage.biographyField).toHaveValue(testUsers.users.QaAutoUser1.biography);
    await profilePage.openPage(testUsers.users.QaAutoUser1.username);
    await expect (profilePage.profileBiography).toHaveText(testUsers.users.QaAutoUser1.biography);
  })

  test('Website can be added on the profile settings page', async ({ profileSettingsPage, profilePage }) => {
    await profileSettingsPage.enterWebSite(testUsers.users.QaAutoUser1.website);
    await profileSettingsPage.clickUpdateProfileButton();
    await expect (profileSettingsPage.successUpdateMessage).toHaveText('Your profile has been updated.');
    await expect (profileSettingsPage.webSiteField).toHaveValue(testUsers.users.QaAutoUser1.website);
    await profilePage.openPage(testUsers.users.QaAutoUser1.username);
    await expect(profilePage.profileWebSite).toBeVisible();
    await expect (profilePage.profileWebSite).toHaveText(testUsers.users.QaAutoUser1.website);
  })

  test('Location can be added on the profile settings page', async ({ profileSettingsPage, profilePage }) => {
    await profileSettingsPage.enterLocation(testUsers.users.QaAutoUser1.location);
    await profileSettingsPage.clickUpdateProfileButton();
    await expect (profileSettingsPage.successUpdateMessage).toHaveText('Your profile has been updated.');
    await expect (profileSettingsPage.locationField).toHaveValue(testUsers.users.QaAutoUser1.location);
    await profilePage.openPage(testUsers.users.QaAutoUser1.username);
    await expect (profilePage.profileLocation).toHaveText(testUsers.users.QaAutoUser1.location);
  })

  test('Email address can be hidden on the profile settings page', async ({ profileSettingsPage, usersPage }) => {
    await usersPage.openPage();
    await usersPage.searchForUser(testUsers.users.QaAutoUser1.username);
    await expect (usersPage.searchResult).toContainText(testUsers.users.QaAutoUser1.username);
    await expect (usersPage.userEmail).toBeVisible();
    await profileSettingsPage.openPage();
    await profileSettingsPage.checkHideEmailAddressCheckbox();
    await profileSettingsPage.clickUpdateProfileButton();
    await expect (profileSettingsPage.hideEmailAddressCheckbox).toBeChecked();
    await usersPage.openPage();
    await usersPage.searchForUser(testUsers.users.QaAutoUser1.username);
    await expect (usersPage.searchResult).toContainText(testUsers.users.QaAutoUser1.username);
    await expect (usersPage.userEmail).not.toBeVisible();
  })

  test('Update avatar on the profile settings page', async ({ header, profileSettingsPage }) => {
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

  let testUsers: any;
  // let testUser2: any
  loggedOutTest.beforeEach  (async({ }) => {
    testUsers = loadTestUsers();
    // testUser2 = loadTestUser2();
  })
//   let registerPage: RegisterPage;
//   let testUser: UserGenerator;
//   let mainPage: MainPage;
//   let signInPage: SignInPage;
//   let profileSettingsPage: ProfileSettingsPage;
//   let header: Header;
//   let profilePage: ProfilePage;
//   let usersPage: UsersPage;

//   test.beforeAll (async({ page }) => {
//     registerPage = new RegisterPage (page);
//     mainPage = new MainPage (page);
//     testUser = new UserGenerator;
//     header = new Header (page);
//     signInPage = new SignInPage (page);
//     profileSettingsPage = new ProfileSettingsPage (page);
//     profilePage = new ProfilePage (page);
//     usersPage = new UsersPage (page);
//     await registerPage.openPage();
//     await registerPage.registerWithCredentials(testUser.users.QaAutoUser1.username, testUser.users.QaAutoUser1.email, testUser.users.QaAutoUser1.password);
//     await expect (mainPage.accountCreatedMessage).toHaveText('Account was successfully created. Welcome!');
//     await expect (mainPage.switchDashboardDropdown).toHaveText(testUser.users.QaAutoUser1.username);
//     await header.signOut();
//     await registerPage.openPage();
//     await registerPage.registerWithCredentials(testUser.users.QaAutoUser2.username, testUser.users.QaAutoUser2.email, testUser.users.QaAutoUser2.password);
//     await expect (mainPage.accountCreatedMessage).toHaveText('Account was successfully created. Welcome!');
//     await expect (mainPage.switchDashboardDropdown).toHaveText(testUser.users.QaAutoUser2.username);
//   })

  loggedOutTest('Profile visibility can be changed to limited on the profile settings page', async ({ usersPage, signInPage, header, profileSettingsPage, mainPage }) => {
    await loggedOutTest.step('Check the user is visible in the list of users by default', async () => {
      await usersPage.openPage();
      await usersPage.searchForUser(testUsers.users.QaAutoUser1.username);
      await expect (usersPage.searchResult).toContainText(testUsers.users.QaAutoUser1.username);
    });
    await loggedOutTest.step('Change the user visibility to limited', async () => {
      await signInPage.openPage();
      await signInPage.signInWithEmail(testUsers.users.QaAutoUser1.email, testUsers.users.QaAutoUser1.password);
      await profileSettingsPage.openPage();
      await profileSettingsPage.makeUserLimitedVisible();
    });
    await loggedOutTest.step('Check the limited user isn\'t visible for not signed users', async () => {
      await header.signOut();
      await expect (mainPage.loggedOutUserHeader).toBeVisible();
      await usersPage.openPage();
      await usersPage.searchForUser(testUsers.users.QaAutoUser1.username);
      await expect (usersPage.noSearchResults).toBeVisible();
    });
    await loggedOutTest.step('Check the limited user is visible for signed users', async () => {
      await signInPage.openPage();
      await signInPage.signInWithEmail(testUsers.users.QaAutoUser2.email, testUsers.users.QaAutoUser2.password);
      await expect (mainPage.switchDashboardDropdown).toHaveText(testUsers.users.QaAutoUser2.username);
      await usersPage.openPage();
      await usersPage.searchForUser(testUsers.users.QaAutoUser1.username);
      await expect (usersPage.searchResult).toContainText(testUsers.users.QaAutoUser1.username);
    });
  })

  loggedOutTest('Delete avatar on the profile settings page', async ({ signInPage, profileSettingsPage, header }) => {
    let imgElement: Locator;
    let src1: string | null;
    let src2: string | null;
    let src3: string | null;
    await loggedOutTest.step('Check a user doesn\'t have a default profile image', async () => {
      await signInPage.openPage();
      await signInPage.signInWithEmail(testUsers.users.QaAutoUser2.email, testUsers.users.QaAutoUser2.password);
      await profileSettingsPage.openPage();
      imgElement = await header.profileImage;
      src1 = await imgElement.getAttribute('src');
    });
    await loggedOutTest.step('Update the profile image', async () => {
      await profileSettingsPage.chooseFileButton.setInputFiles(path.join(__dirname, '../testdata', 'OIP.jpg'));
      await profileSettingsPage.clickUpdateAvatarButton();
      await expect (profileSettingsPage.successUpdateMessage).toHaveText('Your avatar has been updated.');
      await expect(imgElement).not.toHaveAttribute('src', src1!);
      src2 = await imgElement.getAttribute('src');
      expect(src2).not.toBe(src1);
    });
    await loggedOutTest.step('Log in', async () => {
      await profileSettingsPage.clickDeleteAvatarButton();
      await expect(imgElement).not.toHaveAttribute('src', src2!);
      src3 = await imgElement.getAttribute('src');
      expect(src3).toBe(src1);
    });
  })

})