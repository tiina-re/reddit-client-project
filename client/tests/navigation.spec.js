import { test, expect } from '@playwright/test';

test('user can switch subreddits', async ({ page }) => {
    await page.goto('http://localhost:5173');


    const firstSubreddit = page.locator('.subreddits-list button').first();
    await firstSubreddit.click();

    await expect(page.locator('.post-container').first()).toBeVisible();
});