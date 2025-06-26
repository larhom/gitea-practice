# Test info

- Name: Profile Settings tests >> Location can be added on the profile settings page
- Location: D:\QA Madness\gitea-practice\tests\profileSettingsPageFixture.spec.ts:80:7

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toHaveValue(expected)

Locator: locator('#location')
Expected string: "Kalynivka"
Received string: ""
Call log:
  - expect.toHaveValue with timeout 5000ms
  - waiting for locator('#location')
    8 × locator resolved to <input value="" dir="auto" id="location" maxlength="50" name="location" placeholder="Share your approximate location with others"/>
      - unexpected value ""

    at D:\QA Madness\gitea-practice\tests\profileSettingsPageFixture.spec.ts:84:54
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
    - img "QaAuto_user11750723629639"
- main "Profile":
  - text: User Settings
  - link "Profile":
    - /url: /user/settings
  - link "Account":
    - /url: /user/settings/account
  - link "Appearance":
    - /url: /user/settings/appearance
  - link "Security":
    - /url: /user/settings/security
  - link "Blocked users":
    - /url: /user/settings/blocked_users
  - link "Applications":
    - /url: /user/settings/applications
  - link "SSH / GPG Keys":
    - /url: /user/settings/keys
  - group: Actions
  - link "Packages":
    - /url: /user/settings/packages
  - link "Webhooks":
    - /url: /user/settings/hooks
  - link "Organizations":
    - /url: /user/settings/organization
  - link "Repositories":
    - /url: /user/settings/repos
  - paragraph: Your profile has been updated.
  - heading "Public Profile" [level=4]
  - paragraph: Control how your profile is show to other users. Your primary email address will be used for notifications, password recovery and web-based Git operations.
  - text: Username *
  - textbox "Username *": QaAuto_user11750723629639
  - text: Full Name
  - textbox "Full Name"
  - text: Email Address
  - paragraph: larhom+QaAuto_user11750723629639@qamadness.com
  - text: Biography
  - textbox "Biography": Klavdiia Petrivna lorem ipsum
  - text: Website
  - textbox "Website"
  - text: Location
  - textbox "Location"
  - strong: Privacy
  - text: User visibility *
  - combobox: Public
  - strong: Hide Email Address
  - checkbox "This will hide your email address from your profile, as well as when you make a pull request or edit a file using the web interface. Pushed commits will not be modified. Use qaauto_user11750723629639@noreply.localhost in commits to associate them with your account."
  - strong: Hide Activity from profile page
  - checkbox "Makes the activity visible only for you and the admins"
  - button "Update Profile"
  - heading "Avatar" [level=4]
  - radio "Use Custom Avatar"
  - text: Use Custom Avatar Choose new avatar
  - button "Choose new avatar"
  - button "Update Avatar"
  - button "Delete Current Avatar"
- group "Footer":
  - contentinfo "About Software":
    - link "Powered by Gitea":
      - /url: https://about.gitea.com
    - text: "Version: 1.23.8 Page:"
    - strong: 48ms
    - text: "Template:"
    - strong: 32ms
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
   2 | import { test } from '../fixtures/auth-fixture';
   3 | import { test as loggedOutTest } from '../fixtures/not-auth-fixtures';
   4 | import path from 'path';
   5 | // import RegisterPage from '../pom/pages/RegisterPage';
   6 | // import { UserGenerator } from '../testdata/users';
   7 | // import SignInPage from '../pom/pages/SignInPage';
   8 | // import MainPage from '../pom/pages/MainPage';
   9 | // import ProfileSettingsPage from '../pom/pages/ProfileSettingsPage';
   10 | // import Header from '../pom/modules/Header';
   11 | // import ProfilePage from '../pom/pages/ProfilePage';
   12 | // import UsersPage from '../pom/pages/UsersPage';
   13 | // import { Locator } from '@playwright/test';
   14 | import { loadTestUsers } from '../utils/loadTestUsers';
   15 | // import { loadTestUser2 } from '../utils/loadTestUsers';
   16 | import { Locator } from '@playwright/test';
   17 |
   18 | // let testUser = new UserGenerator();
   19 | // test.describe ('Profile Settings tests', () => {
   20 | //   let registerPage: RegisterPage;
   21 | //   let testUser: UserGenerator;
   22 | //   let mainPage: MainPage;
   23 | //   let signInPage: SignInPage;
   24 | //   let profileSettingsPage: ProfileSettingsPage;
   25 | //   let header: Header;
   26 | //   let profilePage: ProfilePage;
   27 | //   let usersPage: UsersPage;
   28 |
   29 | //   test.beforeAll (async({ page }) => {
   30 | //     registerPage = new RegisterPage (page);
   31 | //     mainPage = new MainPage (page);
   32 | //     testUser = new UserGenerator;
   33 | //     header = new Header (page);
   34 | //     signInPage = new SignInPage (page);
   35 | //     profileSettingsPage = new ProfileSettingsPage (page);
   36 | //     profilePage = new ProfilePage (page);
   37 | //     usersPage = new UsersPage (page);
   38 | //   })
   39 |
   40 | //   test.beforeEach (async({ storageStatePage }) => {
   41 | //     await storageStatePage.
   42 | //     await header.openSettingsPage();
   43 | //   })
   44 |
   45 | test.describe ('Profile Settings tests', () => {
   46 |   let testUsers: any;
   47 |   test.beforeEach  (async({ storageStatePage }) => {
   48 |     await storageStatePage.goto('/user/settings')
   49 |     testUsers = loadTestUsers();
   50 |   })
   51 |
   52 |   test('Full name can be added on the profile settings page', async ({ profileSettingsPage, profilePage }) => {
   53 |     await profileSettingsPage.enterFullName(testUsers.users.QaAutoUser1.fullName);
   54 |     await profileSettingsPage.clickUpdateProfileButton();
   55 |     await expect (profileSettingsPage.successUpdateMessage).toHaveText('Your profile has been updated.');
   56 |     await expect (profileSettingsPage.fullNameField).toHaveValue(testUsers.users.QaAutoUser1.fullName);
   57 |     await profilePage.openPage(testUsers.users.QaAutoUser1.username);
   58 |     await expect (profilePage.profileFullName).toHaveText(testUsers.users.QaAutoUser1.fullName);
   59 |   })
   60 |
   61 |   test('Biography can be added on the profile settings page', async ({ profileSettingsPage, profilePage }) => {
   62 |     await profileSettingsPage.enterBiography(testUsers.users.QaAutoUser1.biography);
   63 |     await profileSettingsPage.clickUpdateProfileButton();
   64 |     await expect (profileSettingsPage.successUpdateMessage).toHaveText('Your profile has been updated.');
   65 |     await expect (profileSettingsPage.biographyField).toHaveValue(testUsers.users.QaAutoUser1.biography);
   66 |     await profilePage.openPage(testUsers.users.QaAutoUser1.username);
   67 |     await expect (profilePage.profileBiography).toHaveText(testUsers.users.QaAutoUser1.biography);
   68 |   })
   69 |
   70 |   test('Website can be added on the profile settings page', async ({ profileSettingsPage, profilePage }) => {
   71 |     await profileSettingsPage.enterWebSite(testUsers.users.QaAutoUser1.website);
   72 |     await profileSettingsPage.clickUpdateProfileButton();
   73 |     await expect (profileSettingsPage.successUpdateMessage).toHaveText('Your profile has been updated.');
   74 |     await expect (profileSettingsPage.webSiteField).toHaveValue(testUsers.users.QaAutoUser1.website);
   75 |     await profilePage.openPage(testUsers.users.QaAutoUser1.username);
   76 |     await expect(profilePage.profileWebSite).toBeVisible();
   77 |     await expect (profilePage.profileWebSite).toHaveText(testUsers.users.QaAutoUser1.website);
   78 |   })
   79 |
   80 |   test('Location can be added on the profile settings page', async ({ profileSettingsPage, profilePage }) => {
   81 |     await profileSettingsPage.enterLocation(testUsers.users.QaAutoUser1.location);
   82 |     await profileSettingsPage.clickUpdateProfileButton();
   83 |     await expect (profileSettingsPage.successUpdateMessage).toHaveText('Your profile has been updated.');
>  84 |     await expect (profileSettingsPage.locationField).toHaveValue(testUsers.users.QaAutoUser1.location);
      |                                                      ^ Error: Timed out 5000ms waiting for expect(locator).toHaveValue(expected)
   85 |     await profilePage.openPage(testUsers.users.QaAutoUser1.username);
   86 |     await expect (profilePage.profileLocation).toHaveText(testUsers.users.QaAutoUser1.location);
   87 |   })
   88 |
   89 |   test('Email address can be hidden on the profile settings page', async ({ profileSettingsPage, usersPage }) => {
   90 |     await usersPage.openPage();
   91 |     await usersPage.searchForUser(testUsers.users.QaAutoUser1.username);
   92 |     await expect (usersPage.searchResult).toContainText(testUsers.users.QaAutoUser1.username);
   93 |     await expect (usersPage.userEmail).toBeVisible();
   94 |     await profileSettingsPage.openPage();
   95 |     await profileSettingsPage.checkHideEmailAddressCheckbox();
   96 |     await profileSettingsPage.clickUpdateProfileButton();
   97 |     await expect (profileSettingsPage.hideEmailAddressCheckbox).toBeChecked();
   98 |     await usersPage.openPage();
   99 |     await usersPage.searchForUser(testUsers.users.QaAutoUser1.username);
  100 |     await expect (usersPage.searchResult).toContainText(testUsers.users.QaAutoUser1.username);
  101 |     await expect (usersPage.userEmail).not.toBeVisible();
  102 |   })
  103 |
  104 |   test('Update avatar on the profile settings page', async ({ header, profileSettingsPage }) => {
  105 |     const imgElement = await header.profileImage;
  106 |     const oldSrc = await imgElement.getAttribute('src');
  107 |     await profileSettingsPage.chooseFileButton.setInputFiles(path.join(__dirname, '../testdata', 'OIP.jpg'));
  108 |     await profileSettingsPage.clickUpdateAvatarButton();
  109 |     await expect (profileSettingsPage.successUpdateMessage).toHaveText('Your avatar has been updated.');
  110 |     await expect(imgElement).not.toHaveAttribute('src', oldSrc!);
  111 |     const newSrc = await imgElement.getAttribute('src');
  112 |     expect(newSrc).not.toBe(oldSrc);
  113 |   })
  114 |
  115 | })
  116 |
  117 | test.describe ('Profile Settings tests that require the second user', () => {
  118 |
  119 |   let testUsers: any;
  120 |   // let testUser2: any
  121 |   loggedOutTest.beforeEach  (async({ }) => {
  122 |     testUsers = loadTestUsers();
  123 |     // testUser2 = loadTestUser2();
  124 |   })
  125 | //   let registerPage: RegisterPage;
  126 | //   let testUser: UserGenerator;
  127 | //   let mainPage: MainPage;
  128 | //   let signInPage: SignInPage;
  129 | //   let profileSettingsPage: ProfileSettingsPage;
  130 | //   let header: Header;
  131 | //   let profilePage: ProfilePage;
  132 | //   let usersPage: UsersPage;
  133 |
  134 | //   test.beforeAll (async({ page }) => {
  135 | //     registerPage = new RegisterPage (page);
  136 | //     mainPage = new MainPage (page);
  137 | //     testUser = new UserGenerator;
  138 | //     header = new Header (page);
  139 | //     signInPage = new SignInPage (page);
  140 | //     profileSettingsPage = new ProfileSettingsPage (page);
  141 | //     profilePage = new ProfilePage (page);
  142 | //     usersPage = new UsersPage (page);
  143 | //     await registerPage.openPage();
  144 | //     await registerPage.registerWithCredentials(testUser.users.QaAutoUser1.username, testUser.users.QaAutoUser1.email, testUser.users.QaAutoUser1.password);
  145 | //     await expect (mainPage.accountCreatedMessage).toHaveText('Account was successfully created. Welcome!');
  146 | //     await expect (mainPage.switchDashboardDropdown).toHaveText(testUser.users.QaAutoUser1.username);
  147 | //     await header.signOut();
  148 | //     await registerPage.openPage();
  149 | //     await registerPage.registerWithCredentials(testUser.users.QaAutoUser2.username, testUser.users.QaAutoUser2.email, testUser.users.QaAutoUser2.password);
  150 | //     await expect (mainPage.accountCreatedMessage).toHaveText('Account was successfully created. Welcome!');
  151 | //     await expect (mainPage.switchDashboardDropdown).toHaveText(testUser.users.QaAutoUser2.username);
  152 | //   })
  153 |
  154 |   loggedOutTest('Profile visibility can be changed to limited on the profile settings page', async ({ usersPage, signInPage, header, profileSettingsPage, mainPage }) => {
  155 |     await loggedOutTest.step('Check the user is visible in the list of users by default', async () => {
  156 |       await usersPage.openPage();
  157 |       await usersPage.searchForUser(testUsers.users.QaAutoUser1.username);
  158 |       await expect (usersPage.searchResult).toContainText(testUsers.users.QaAutoUser1.username);
  159 |     });
  160 |     await loggedOutTest.step('Change the user visibility to limited', async () => {
  161 |       await signInPage.openPage();
  162 |       await signInPage.signInWithEmail(testUsers.users.QaAutoUser1.email, testUsers.users.QaAutoUser1.password);
  163 |       await profileSettingsPage.openPage();
  164 |       await profileSettingsPage.makeUserLimitedVisible();
  165 |     });
  166 |     await loggedOutTest.step('Check the limited user isn\'t visible for not signed users', async () => {
  167 |       await header.signOut();
  168 |       await expect (mainPage.loggedOutUserHeader).toBeVisible();
  169 |       await usersPage.openPage();
  170 |       await usersPage.searchForUser(testUsers.users.QaAutoUser1.username);
  171 |       await expect (usersPage.noSearchResults).toBeVisible();
  172 |     });
  173 |     await loggedOutTest.step('Check the limited user is visible for signed users', async () => {
  174 |       await signInPage.openPage();
  175 |       await signInPage.signInWithEmail(testUsers.users.QaAutoUser2.email, testUsers.users.QaAutoUser2.password);
  176 |       await expect (mainPage.switchDashboardDropdown).toHaveText(testUsers.users.QaAutoUser2.username);
  177 |       await usersPage.openPage();
  178 |       await usersPage.searchForUser(testUsers.users.QaAutoUser1.username);
  179 |       await expect (usersPage.searchResult).toContainText(testUsers.users.QaAutoUser1.username);
  180 |     });
  181 |   })
  182 |
  183 |   loggedOutTest('Delete avatar on the profile settings page', async ({ signInPage, profileSettingsPage, header }) => {
  184 |     let imgElement: Locator;
```