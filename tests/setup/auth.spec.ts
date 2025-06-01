import { expect, test } from '@playwright/test';
import RegisterPage from '../../pom/pages/RegisterPage';
import { UserGenerator } from '../../testdata/users';
import fs from 'fs';
import path from 'path';
import MainPage from '../../pom/pages/MainPage';

test('Sign up and save a storage state of the first user', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const mainPage = new MainPage(page);
    const testUser = new UserGenerator();

    await registerPage.openPage();
    await registerPage.registerWithCredentials(testUser.users.QaAutoUser1.username, testUser.users.QaAutoUser1.email, testUser.users.QaAutoUser1.password);
    
    await expect (mainPage.accountCreatedMessage).toHaveText('Account was successfully created. Welcome!');
    await expect (mainPage.switchDashboardDropdown).toHaveText(testUser.users.QaAutoUser1.username);

    await page.context().storageState({ path: '.auth/testUser1-state.json' })

    const userDataPath = path.resolve(__dirname, '../../.auth/testUser1-user.json');
    fs.writeFileSync(userDataPath, JSON.stringify(testUser, null, 2));

    page.close();
})

test('Sign up and save a storage state of the second user', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const mainPage = new MainPage(page);
    const testUser = new UserGenerator();

    await registerPage.openPage();
    await registerPage.registerWithCredentials(testUser.users.QaAutoUser2.username, testUser.users.QaAutoUser2.email, testUser.users.QaAutoUser2.password);
    
    await expect (mainPage.accountCreatedMessage).toHaveText('Account was successfully created. Welcome!');
    await expect (mainPage.switchDashboardDropdown).toHaveText(testUser.users.QaAutoUser2.username);

    await page.context().storageState({ path: '.auth/testUser2-state.json' })

    const userDataPath = path.resolve(__dirname, '../../.auth/testUser2-user.json');
    fs.writeFileSync(userDataPath, JSON.stringify(testUser, null, 2));

    page.close();
})