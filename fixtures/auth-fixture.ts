import { test as base } from '@playwright/test';
import path from 'path';
import RegisterPage from '../pom/pages/RegisterPage';
import ProfileSettingsPage from '../pom/pages/ProfileSettingsPage';
import ProfilePage from '../pom/pages/ProfilePage';
import Header from '../pom/modules/Header';
import UsersPage from '../pom/pages/UsersPage';
import SignInPage from '../pom/pages/SignInPage';

// Extend base to include storageState and page objects
export const test = base.extend<{
    storageStatePage: import('@playwright/test').Page;
    registerPage: RegisterPage;
    // testUser: UserGenerator;
    // openIdLoginPage: OpenIdLoginPage;
    signInPage: SignInPage;
    // userGenerator: UserGenerator;
    header: Header;
    profilePage: ProfilePage;
    profileSettingsPage: ProfileSettingsPage;
    usersPage: UsersPage;

}>({
  // Logged-in page fixture
  storageStatePage: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: path.resolve(__dirname, '../.auth/testUser1-state.json'),
    });
    const page = await context.newPage();
    await use(page);
    await context.close();
  },

  // Page object fixtures using the logged-in page
    profileSettingsPage: async ({ storageStatePage }, use) => {
        const profileSettingsPage = new ProfileSettingsPage(storageStatePage);
        await use(profileSettingsPage);
    },

    profilePage: async ({ storageStatePage }, use) => {
        const profilePage = new ProfilePage(storageStatePage);
        await use(profilePage);
    },

    header: async ({ storageStatePage }, use) => {
        const header = new Header(storageStatePage);
        await use(header);
    },

    usersPage: async ({ storageStatePage }, use) => {
        const usersPage = new UsersPage(storageStatePage);
        await use(usersPage);
    },

  // Page object fixtures using the logged-out page  
    signInPage: async ({ page }, use) => {
        const signInPage = new SignInPage(page);
        await use(signInPage);
    },

});

export { expect } from '@playwright/test';