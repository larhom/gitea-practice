import test, { expect } from "@playwright/test"

test('Install Gitea with basic settings', async ({ page }) => {
    test.setTimeout(60000);
    if (process.env.CI) {
        await page.goto('');
        await page.locator('[class="ui primary button"]').click();
        await expect (page.locator('[href="/explore/repos"]')).toBeVisible({ timeout: 50000 });
    }
});