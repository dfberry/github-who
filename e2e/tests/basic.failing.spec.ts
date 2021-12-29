import { test, expect } from '@playwright/test';

test('basic not found test', async ({ page }) => {
  await page.goto('https://mango-mushroom-00bed2310.azurestaticapps.net/');
  const title = page.locator('.Home');
  await expect(title).not.toHaveText('Thimble is the best dog');
});