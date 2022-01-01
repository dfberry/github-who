const { chromium } = require('playwright');
import { test, expect } from '@playwright/test';

test('Authenticate, get profile', async ({ page }) => {

  (async () => {
    const browser = await chromium.launch({
      headless: false
    });
    const context = await browser.newContext();
    // Open new page
    const page = await context.newPage();
    // Go to https://mango-mushroom-00bed2310.azurestaticapps.net/
    await page.goto('https://mango-mushroom-00bed2310.azurestaticapps.net/');
    // Click text=Login
    await page.click('text=Login');
    // assert.equal(page.url(), 'https://mango-mushroom-00bed2310.azurestaticapps.net/login');
    // Click text=GitHub App Login
    await page.click('text=GitHub App Login');
    // assert.equal(page.url(), 'https://github.com/login?client_id=438cc26450f36a5730f2&return_to=%2Flogin%2Foauth%2Fauthorize%3Fclient_id%3D438cc26450f36a5730f2%26redirect_uri%3Dhttps%253A%252F%252Fmango-mushroom-00bed2310.azurestaticapps.net%252Fauth-redirect%26state%3D123');
    // Click input[name="login"]
    await page.click('input[name="login"]');
    // Fill input[name="login"]
    await page.fill('input[name="login"]', 'dfberry1-test');
    // Press Tab
    await page.press('input[name="login"]', 'Tab');
    // Fill input[name="password"]
    await page.fill('input[name="password"]', 'TestGit1234! ');
    // Click input:has-text("Sign in")
    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://mango-mushroom-00bed2310.azurestaticapps.net/github-profile' }*/),
      page.click('input:has-text("Sign in")')
    ]);

    // TBD: I don't trust this works
    // Playwright issue: https://github.com/microsoft/playwright/issues/11126
    const title = page.locator('.GitHubProfile');
    await expect(title).toContainText('GitHub Profile');
    //await expect(title).toEqual('george ezra');

    // ---------------------
    await context.close();
    await browser.close();
  })();

});