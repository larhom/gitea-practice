# Test info

- Name: Profile Settings tests >> Website can be added on the profile settings page
- Location: D:\QA Madness\gitea-practice\tests\profileSettingsPageFixture.spec.ts:70:7

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toHaveText(expected)

Locator: locator('li>a[target="_blank"]')
Expected string: "https://loremipsum1.com"
Received: <element(s) not found>
Call log:
  - expect.toHaveText with timeout 5000ms
  - waiting for locator('li>a[target="_blank"]')

    at D:\QA Madness\gitea-practice\tests\profileSettingsPageFixture.spec.ts:76:47
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
    - img "QaAuto_user11750721268009"
- main "Klavdiia Petrivna":
  - img "Klavdiia Petrivna"
  - text: Klavdiia Petrivna QaAuto_user11750721263201
  - link "0 Followers":
    - /url: /QaAuto_user11750721263201?tab=followers
  - text: ·
  - link "0 Following":
    - /url: /QaAuto_user11750721263201?tab=following
  - link "RSS Feed":
    - /url: /QaAuto_user11750721263201.rss
  - list:
    - listitem:
      - link "larhom+QaAuto_user11750721263201@qamadness.com":
        - /url: mailto:larhom+QaAuto_user11750721263201@qamadness.com
    - listitem:
      - paragraph: Klavdiia Petrivna lorem ipsum
    - listitem: Joined on 2025-06-23Jun 23, 2025
    - listitem:
      - button "Follow"
    - listitem:
      - link "Block user":
        - /url: "#"
  - navigation:
    - link "Repositories":
      - /url: /QaAuto_user11750721263201?tab=repositories
    - link "Projects":
      - /url: /QaAuto_user11750721263201/-/projects
    - link "Packages":
      - /url: /QaAuto_user11750721263201/-/packages
    - link "Public Activity":
      - /url: /QaAuto_user11750721263201?tab=activity
    - link "Starred Repositories":
      - /url: /QaAuto_user11750721263201?tab=stars
  - searchbox "Search repos..."
  - button "Search..."
  - combobox: Filter
  - combobox: Sort
  - text: No matching results found.
- group "Footer":
  - contentinfo "About Software":
    - link "Powered by Gitea":
      - /url: https://about.gitea.com
    - text: "Version: 1.23.8 Page:"
    - strong: 10ms
    - text: "Template:"
    - strong: 3ms
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
>  76 |     await expect (profilePage.profileWebSite).toHaveText(testUsers.users.QaAutoUser1.website);
      |                                               ^ Error: Timed out 5000ms waiting for expect(locator).toHaveText(expected)
   77 |   })
   78 |
   79 |   test('Location can be added on the profile settings page', async ({ profileSettingsPage, profilePage }) => {
   80 |     await profileSettingsPage.enterLocation(testUsers.users.QaAutoUser1.location);
   81 |     await profileSettingsPage.clickUpdateProfileButton();
   82 |     await expect (profileSettingsPage.successUpdateMessage).toHaveText('Your profile has been updated.');
   83 |     await expect (profileSettingsPage.locationField).toHaveValue(testUsers.users.QaAutoUser1.location);
   84 |     await profilePage.openPage(testUsers.users.QaAutoUser1.username);
   85 |     await expect (profilePage.profileLocation).toHaveText(testUsers.users.QaAutoUser1.location);
   86 |   })
   87 |
   88 |   test('Email address can be hidden on the profile settings page', async ({ profileSettingsPage, usersPage }) => {
   89 |     await usersPage.openPage();
   90 |     await usersPage.searchForUser(testUsers.users.QaAutoUser1.username);
   91 |     await expect (usersPage.searchResult).toContainText(testUsers.users.QaAutoUser1.username);
   92 |     await expect (usersPage.userEmail).toBeVisible();
   93 |     await profileSettingsPage.openPage();
   94 |     await profileSettingsPage.checkHideEmailAddressCheckbox();
   95 |     await profileSettingsPage.clickUpdateProfileButton();
   96 |     await expect (profileSettingsPage.hideEmailAddressCheckbox).toBeChecked();
   97 |     await usersPage.openPage();
   98 |     await usersPage.searchForUser(testUsers.users.QaAutoUser1.username);
   99 |     await expect (usersPage.searchResult).toContainText(testUsers.users.QaAutoUser1.username);
  100 |     await expect (usersPage.userEmail).not.toBeVisible();
  101 |   })
  102 |
  103 |   test('Update avatar on the profile settings page', async ({ header, profileSettingsPage }) => {
  104 |     const imgElement = await header.profileImage;
  105 |     const oldSrc = await imgElement.getAttribute('src');
  106 |     await profileSettingsPage.chooseFileButton.setInputFiles(path.join(__dirname, '../testdata', 'OIP.jpg'));
  107 |     await profileSettingsPage.clickUpdateAvatarButton();
  108 |     await expect (profileSettingsPage.successUpdateMessage).toHaveText('Your avatar has been updated.');
  109 |     await expect(imgElement).not.toHaveAttribute('src', oldSrc!);
  110 |     const newSrc = await imgElement.getAttribute('src');
  111 |     expect(newSrc).not.toBe(oldSrc);
  112 |   })
  113 |
  114 | })
  115 |
  116 | test.describe ('Profile Settings tests that require the second user', () => {
  117 |
  118 |   let testUsers: any;
  119 |   // let testUser2: any
  120 |   loggedOutTest.beforeEach  (async({ }) => {
  121 |     testUsers = loadTestUsers();
  122 |     // testUser2 = loadTestUser2();
  123 |   })
  124 | //   let registerPage: RegisterPage;
  125 | //   let testUser: UserGenerator;
  126 | //   let mainPage: MainPage;
  127 | //   let signInPage: SignInPage;
  128 | //   let profileSettingsPage: ProfileSettingsPage;
  129 | //   let header: Header;
  130 | //   let profilePage: ProfilePage;
  131 | //   let usersPage: UsersPage;
  132 |
  133 | //   test.beforeAll (async({ page }) => {
  134 | //     registerPage = new RegisterPage (page);
  135 | //     mainPage = new MainPage (page);
  136 | //     testUser = new UserGenerator;
  137 | //     header = new Header (page);
  138 | //     signInPage = new SignInPage (page);
  139 | //     profileSettingsPage = new ProfileSettingsPage (page);
  140 | //     profilePage = new ProfilePage (page);
  141 | //     usersPage = new UsersPage (page);
  142 | //     await registerPage.openPage();
  143 | //     await registerPage.registerWithCredentials(testUser.users.QaAutoUser1.username, testUser.users.QaAutoUser1.email, testUser.users.QaAutoUser1.password);
  144 | //     await expect (mainPage.accountCreatedMessage).toHaveText('Account was successfully created. Welcome!');
  145 | //     await expect (mainPage.switchDashboardDropdown).toHaveText(testUser.users.QaAutoUser1.username);
  146 | //     await header.signOut();
  147 | //     await registerPage.openPage();
  148 | //     await registerPage.registerWithCredentials(testUser.users.QaAutoUser2.username, testUser.users.QaAutoUser2.email, testUser.users.QaAutoUser2.password);
  149 | //     await expect (mainPage.accountCreatedMessage).toHaveText('Account was successfully created. Welcome!');
  150 | //     await expect (mainPage.switchDashboardDropdown).toHaveText(testUser.users.QaAutoUser2.username);
  151 | //   })
  152 |
  153 |   loggedOutTest('Profile visibility can be changed to limited on the profile settings page', async ({ usersPage, signInPage, header, profileSettingsPage, mainPage }) => {
  154 |     await loggedOutTest.step('Check the user is visible in the list of users by default', async () => {
  155 |       await usersPage.openPage();
  156 |       await usersPage.searchForUser(testUsers.users.QaAutoUser1.username);
  157 |       await expect (usersPage.searchResult).toContainText(testUsers.users.QaAutoUser1.username);
  158 |     });
  159 |     await loggedOutTest.step('Change the user visibility to limited', async () => {
  160 |       await signInPage.openPage();
  161 |       await signInPage.signInWithEmail(testUsers.users.QaAutoUser1.email, testUsers.users.QaAutoUser1.password);
  162 |       await profileSettingsPage.openPage();
  163 |       await profileSettingsPage.makeUserLimitedVisible();
  164 |     });
  165 |     await loggedOutTest.step('Check the limited user isn\'t visible for not signed users', async () => {
  166 |       await header.signOut();
  167 |       await expect (mainPage.loggedOutUserHeader).toBeVisible();
  168 |       await usersPage.openPage();
  169 |       await usersPage.searchForUser(testUsers.users.QaAutoUser1.username);
  170 |       await expect (usersPage.noSearchResults).toBeVisible();
  171 |     });
  172 |     await loggedOutTest.step('Check the limited user is visible for signed users', async () => {
  173 |       await signInPage.openPage();
  174 |       await signInPage.signInWithEmail(testUsers.users.QaAutoUser2.email, testUsers.users.QaAutoUser2.password);
  175 |       await expect (mainPage.switchDashboardDropdown).toHaveText(testUsers.users.QaAutoUser2.username);
  176 |       await usersPage.openPage();
```