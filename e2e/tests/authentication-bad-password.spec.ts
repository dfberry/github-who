const { chromium } = require('playwright');
import { test, expect } from '@playwright/test';
import { config } from './setup';

test('Authenticate, get profile', async ({ page }) => {

  const env = config();

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
    await page.fill('input[name="login"]', env.GITHUB_USER_NAME);
    // Press Tab
    await page.press('input[name="login"]', 'Tab');
    // Fill input[name="password"]
    await page.fill('input[name="password"]', '');
    // Click input:has-text("Sign in")
    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://mango-mushroom-00bed2310.azurestaticapps.net/github-profile' }*/),
      page.click('input:has-text("Sign in")')
    ]);
    expect(page.url()).toEqual('https://github.com/session');


    // ---------------------
    await context.close();
    await browser.close();
  })();

});