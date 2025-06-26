# Test info

- Name: Profile Settings tests that require the second user >> Profile visibility can be changed to limited on the profile settings page
- Location: D:\QA Madness\gitea-practice\tests\profileSettingsPage.spec.ts:139:7

# Error details

```
Error: "context" and "page" fixtures are not supported in "beforeAll" since they are created on a per-test basis.
If you would like to reuse a single page between tests, create context manually with browser.newContext(). See https://aka.ms/playwright/reuse-page for details.
If you would like to configure your page before each test, do that in beforeEach hook instead.
```

# Test source

```ts
   39 |     await signInPage.openPage();
   40 |     await signInPage.signInWithUsername(testUser.users.QaAutoUser1.username, testUser.users.QaAutoUser1.password);
   41 |     await expect (mainPage.switchDashboardDropdown).toHaveText(testUser.users.QaAutoUser1.username);
   42 |     await header.openSettingsPage();
   43 |   })
   44 |
   45 |   test('Full name can be added on the profile settings page', async ({ page }) => {
   46 |     await profileSettingsPage.enterFullName(testUser.users.QaAutoUser1.fullName);
   47 |     await profileSettingsPage.clickUpdateProfileButton();
   48 |     await expect (profileSettingsPage.successUpdateMessage).toHaveText('Your profile has been updated.');
   49 |     await expect (profileSettingsPage.fullNameField).toHaveValue(testUser.users.QaAutoUser1.fullName);
   50 |     await profilePage.openPage(testUser.users.QaAutoUser1.username);
   51 |     await expect (profilePage.profileFullName).toHaveText(testUser.users.QaAutoUser1.fullName);
   52 |   })
   53 |
   54 |   test('Biography can be added on the profile settings page', async ({ page }) => {
   55 |     await profileSettingsPage.enterBiography(testUser.users.QaAutoUser1.biography);
   56 |     await profileSettingsPage.clickUpdateProfileButton();
   57 |     await expect (profileSettingsPage.successUpdateMessage).toHaveText('Your profile has been updated.');
   58 |     await expect (profileSettingsPage.biographyField).toHaveValue(testUser.users.QaAutoUser1.biography);
   59 |     await header.openProfilePage();
   60 |     await expect (profilePage.profileBiography).toHaveText(testUser.users.QaAutoUser1.biography);
   61 |   })
   62 |
   63 |   test('Website can be added on the profile settings page', async ({ page }) => {
   64 |     await profileSettingsPage.enterWebSite(testUser.users.QaAutoUser1.website);
   65 |     await profileSettingsPage.clickUpdateProfileButton();
   66 |     await expect (profileSettingsPage.successUpdateMessage).toHaveText('Your profile has been updated.');
   67 |     await expect (profileSettingsPage.webSiteField).toHaveValue(testUser.users.QaAutoUser1.website);
   68 |     await header.openProfilePage();
   69 |     await expect (profilePage.profileWebSite).toHaveText(testUser.users.QaAutoUser1.website);
   70 |   })
   71 |
   72 |   test('Location can be added on the profile settings page', async ({ page }) => {
   73 |     await profileSettingsPage.enterLocation(testUser.users.QaAutoUser1.location);
   74 |     await profileSettingsPage.clickUpdateProfileButton();
   75 |     await expect (profileSettingsPage.successUpdateMessage).toHaveText('Your profile has been updated.');
   76 |     await expect (profileSettingsPage.locationField).toHaveValue(testUser.users.QaAutoUser1.location);
   77 |     await header.openProfilePage();
   78 |     await expect (profilePage.profileLocation).toHaveText(testUser.users.QaAutoUser1.location);
   79 |   })
   80 |
   81 |   test('Email address can be hidden on the profile settings page', async ({ page }) => {
   82 |     await usersPage.openPage();
   83 |     await usersPage.searchForUser(testUser.users.QaAutoUser1.username);
   84 |     await expect (usersPage.searchResult).toContainText(testUser.users.QaAutoUser1.username);
   85 |     await expect (usersPage.userEmail).toBeVisible();
   86 |     await header.openSettingsPage();
   87 |     await profileSettingsPage.checkHideEmailAddressCheckbox();
   88 |     await profileSettingsPage.clickUpdateProfileButton();
   89 |     await expect (profileSettingsPage.hideEmailAddressCheckbox).toBeChecked();
   90 |     await usersPage.openPage();
   91 |     await usersPage.searchForUser(testUser.users.QaAutoUser1.username);
   92 |     await expect (usersPage.searchResult).toContainText(testUser.users.QaAutoUser1.username);
   93 |     await expect (usersPage.userEmail).not.toBeVisible();
   94 |   })
   95 |
   96 |   test('Update avatar on the profile settings page', async ({ page }) => {
   97 |     const imgElement = await header.profileImage;
   98 |     const oldSrc = await imgElement.getAttribute('src');
   99 |     await profileSettingsPage.chooseFileButton.setInputFiles(path.join(__dirname, '../testdata', 'OIP.jpg'));
  100 |     await profileSettingsPage.clickUpdateAvatarButton();
  101 |     await expect (profileSettingsPage.successUpdateMessage).toHaveText('Your avatar has been updated.');
  102 |     await expect(imgElement).not.toHaveAttribute('src', oldSrc!);
  103 |     const newSrc = await imgElement.getAttribute('src');
  104 |     expect(newSrc).not.toBe(oldSrc);
  105 |   })
  106 |
  107 | })
  108 |
  109 | test.describe ('Profile Settings tests that require the second user', () => {
  110 |   let registerPage: RegisterPage;
  111 |   let testUser: UserGenerator;
  112 |   let mainPage: MainPage;
  113 |   let signInPage: SignInPage;
  114 |   let profileSettingsPage: ProfileSettingsPage;
  115 |   let header: Header;
  116 |   let profilePage: ProfilePage;
  117 |   let usersPage: UsersPage;
  118 |
  119 |   test.beforeAll (async({ page }) => {
  120 |     registerPage = new RegisterPage (page);
  121 |     mainPage = new MainPage (page);
  122 |     testUser = new UserGenerator;
  123 |     header = new Header (page);
  124 |     signInPage = new SignInPage (page);
  125 |     profileSettingsPage = new ProfileSettingsPage (page);
  126 |     profilePage = new ProfilePage (page);
  127 |     usersPage = new UsersPage (page);
  128 |     await registerPage.openPage();
  129 |     await registerPage.registerWithCredentials(testUser.users.QaAutoUser1.username, testUser.users.QaAutoUser1.email, testUser.users.QaAutoUser1.password);
  130 |     await expect (mainPage.accountCreatedMessage).toHaveText('Account was successfully created. Welcome!');
  131 |     await expect (mainPage.switchDashboardDropdown).toHaveText(testUser.users.QaAutoUser1.username);
  132 |     await header.signOut();
  133 |     await registerPage.openPage();
  134 |     await registerPage.registerWithCredentials(testUser.users.QaAutoUser2.username, testUser.users.QaAutoUser2.email, testUser.users.QaAutoUser2.password);
  135 |     await expect (mainPage.accountCreatedMessage).toHaveText('Account was successfully created. Welcome!');
  136 |     await expect (mainPage.switchDashboardDropdown).toHaveText(testUser.users.QaAutoUser2.username);
  137 |   })
  138 |
> 139 |   test('Profile visibility can be changed to limited on the profile settings page', async ({ page }) => {
      |       ^ Error: "context" and "page" fixtures are not supported in "beforeAll" since they are created on a per-test basis.
  140 |     await test.step('Check the user is visible in the list of users by default', async () => {
  141 |       await usersPage.openPage();
  142 |       await usersPage.searchForUser(testUser.users.QaAutoUser1.username);
  143 |       await expect (usersPage.searchResult).toContainText(testUser.users.QaAutoUser1.username);
  144 |     });
  145 |     await test.step('Change the user visibility to limited', async () => {
  146 |       await signInPage.openPage();
  147 |       await signInPage.signInWithEmail(testUser.users.QaAutoUser1.email, testUser.users.QaAutoUser1.password);
  148 |       await header.openSettingsPage();
  149 |       await profileSettingsPage.makeUserLimitedVisible();
  150 |     });
  151 |     await test.step('Check the limited user isn\'t visible for not signed users', async () => {
  152 |       await header.signOut();
  153 |       await expect (mainPage.loggedOutUserHeader).toBeVisible();
  154 |       await usersPage.openPage();
  155 |       await usersPage.searchForUser(testUser.users.QaAutoUser1.username);
  156 |       await expect (usersPage.noSearchResults).toBeVisible();
  157 |     });
  158 |     await test.step('Check the limited user is visible for signed users', async () => {
  159 |       await signInPage.openPage();
  160 |       await signInPage.signInWithEmail(testUser.users.QaAutoUser2.email, testUser.users.QaAutoUser2.password);
  161 |       await expect (mainPage.switchDashboardDropdown).toHaveText(testUser.users.QaAutoUser2.username);
  162 |       await usersPage.openPage();
  163 |       await usersPage.searchForUser(testUser.users.QaAutoUser1.username);
  164 |       await expect (usersPage.searchResult).toContainText(testUser.users.QaAutoUser1.username);
  165 |     });
  166 |   })
  167 |
  168 |   test('Delete avatar on the profile settings page', async ({ page }) => {
  169 |     let imgElement: Locator;
  170 |     let src1: string | null;
  171 |     let src2: string | null;
  172 |     let src3: string | null;
  173 |     await test.step('Check a user doesn\'t have a default profile image', async () => {
  174 |       await signInPage.openPage();
  175 |       await signInPage.signInWithEmail(testUser.users.QaAutoUser2.email, testUser.users.QaAutoUser2.password);
  176 |       await header.openSettingsPage();
  177 |       imgElement = await header.profileImage;
  178 |       src1 = await imgElement.getAttribute('src');
  179 |     });
  180 |     await test.step('Update the profile image', async () => {
  181 |       await profileSettingsPage.chooseFileButton.setInputFiles(path.join(__dirname, '../testdata', 'OIP.jpg'));
  182 |       await profileSettingsPage.clickUpdateAvatarButton();
  183 |       await expect (profileSettingsPage.successUpdateMessage).toHaveText('Your avatar has been updated.');
  184 |       await expect(imgElement).not.toHaveAttribute('src', src1!);
  185 |       src2 = await imgElement.getAttribute('src');
  186 |       expect(src2).not.toBe(src1);
  187 |     });
  188 |     await test.step('Log in', async () => {
  189 |       await profileSettingsPage.clickDeleteAvatarButton();
  190 |       await expect(imgElement).not.toHaveAttribute('src', src2!);
  191 |       src3 = await imgElement.getAttribute('src');
  192 |       expect(src3).toBe(src1);
  193 |     });
  194 |   })
  195 |
  196 | })
```