import {test as base} from '@playwright/test';
import RegisterPage from '../pom/pages/RegisterPage';
import { UserGenerator } from '../testdata/users';
import OpenIdLoginPage from '../pom/pages/OpenIdLoginPage';
import SignInPage from '../pom/pages/SignInPage';
import MainPage from '../pom/pages/MainPage';
import Header from '../pom/modules/Header';
import { chromium } from '@playwright/test';
import ProfilePage from '../pom/pages/ProfilePage'; 
import ProfileSettingsPage from '../pom/pages/ProfileSettingsPage';
import UsersPage from '../pom/pages/UsersPage';

type MyFixtures = {
    registerPage: RegisterPage;
    testUser: UserGenerator;
    openIdLoginPage: OpenIdLoginPage;
    signInPage: SignInPage;
    mainPage: MainPage;
    userGenerator: UserGenerator;
    header: Header;
    registration: [RegisterPage: any, UserGenerator: any, Header: any];
    profilePage: ProfilePage;
    profileSettingsPage: ProfileSettingsPage;
    usersPage: UsersPage;
}

export const test = base.extend<MyFixtures> ({
        registerPage: async ({ page }, use) => {
            const registerPage = new RegisterPage(page);

            await registerPage.openPage();

            await use(registerPage);
        },

        openIdLoginPage: async ({ page }, use) => {
            const openIdLoginPage = new OpenIdLoginPage (page);

            await use(openIdLoginPage);
        },

        signInPage: async ({ page }, use) => {
            const signInPage = new SignInPage(page);

            await use(signInPage);
        },

        mainPage: async ({ page }, use) => {
            const mainPage = new MainPage(page);

            await use (mainPage);
        },

        testUser: async ({}, use) => {
            const userGenerator = new UserGenerator();

            await use (userGenerator);
        },

        header: async ({ page }, use) => {
            const header = new Header(page);

            await use (header);
        },

        registration: async({ }, use) => {
            const browser = await chromium.launch();
            const context = await browser.newContext();
            const page = await context.newPage();
            const registerPage = new RegisterPage (page);
            const testUser = new UserGenerator();
            const header = new Header (page);

            await registerPage.openPage();
            await registerPage.registerWithCredentials(testUser.users.QaAutoUser1.username, testUser.users.QaAutoUser1.email, testUser.users.QaAutoUser1.password);

            await use ([registerPage, testUser, header]);  

        },

        profilePage: async ({page}, use) => {
            const profilePage = new ProfilePage(page);
            
            await use (profilePage);
        },

        profileSettingsPage: async ({page}, use) => {
            const profileSettingsPage = new ProfileSettingsPage(page);

            await use (profileSettingsPage);
        },

        usersPage: async ({ page }, use) => {
            const usersPage = new UsersPage(page);

            await use (usersPage);

            page.close();
        }
        
})
