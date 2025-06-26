import { expect, test } from "@playwright/test";
import RegisterPage from "../../pom/pages/RegisterPage";
import { UserGenerator } from "../../testdata/users";
import fs from "fs";
import path from "path";
import ProfileSettingsPage from "../../pom/pages/ProfileSettingsPage";

test("Sign up and save storage states for two users", async ({ browser }) => {
  const testUser = new UserGenerator();

  // First user: new context
  const context1 = await browser.newContext();
  const page1 = await context1.newPage();
  const registerPage1 = new RegisterPage(page1);
  const successMessage1 = page1.locator('[class="ui positive message flash-message flash-success"]');
  const profileSettingsPage1 = new ProfileSettingsPage(page1);

  await registerPage1.openPage();
  await registerPage1.registerWithCredentials(
    testUser.users.QaAutoUser1.username,
    testUser.users.QaAutoUser1.email,
    testUser.users.QaAutoUser1.password
  );
  await expect(successMessage1).toHaveText(
    "Account was successfully created. Welcome!"
  );
  const apiKey1 = await profileSettingsPage1.generateToken("new_token");
  testUser.users.QaAutoUser1.apiKey = apiKey1;

  await context1.storageState({ path: ".auth/testUser1-state.json" });
  await context1.close();

  // Second user: new context
  const context2 = await browser.newContext();
  const page2 = await context2.newPage();
  const registerPage2 = new RegisterPage(page2);
  const successMessage2 = page2.locator('[class="ui positive message flash-message flash-success"]');
  const profileSettingsPage2 = new ProfileSettingsPage(page2);

  await registerPage2.openPage();
  await registerPage2.registerWithCredentials(
    testUser.users.QaAutoUser2.username,
    testUser.users.QaAutoUser2.email,
    testUser.users.QaAutoUser2.password
  );
  await expect(successMessage2).toHaveText(
    "Account was successfully created. Welcome!"
  );
  const apiKey2 = await profileSettingsPage2.generateToken("new_token");
  testUser.users.QaAutoUser2.apiKey = apiKey2;

  await context2.storageState({ path: ".auth/testUser2-state.json" });
  await context2.close();

  // Save both users to testUsers.json
  const authDir = path.resolve(__dirname, "../../.auth");
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  const userDataPath = path.join(authDir, "testUsers-user.json");
  fs.writeFileSync(
    userDataPath,
    JSON.stringify({ users: testUser.users }, null, 2)
  );
});
