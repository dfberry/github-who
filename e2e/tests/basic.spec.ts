import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('https://mango-mushroom-00bed2310.azurestaticapps.net/');
  const title = page.locator('.Home');
  await expect(title).toHaveText('Home View 1Lorem ipsum dolor sit amet, consectetur adip.');
});