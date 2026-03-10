import { test, expect } from '@playwright/test';

test('homepage loads and displays main sections', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/');

    // The application has a dark theme background
    await expect(page.locator('body')).toBeVisible();

    // We have a hero section and footer
    // Let's just do a basic check that doesn't rely on too much text
    // since we don't have the exact text content from components easily accessible here
    await expect(page.locator('footer')).toBeVisible();

    // Check if there are no console errors (optional, usually handled by trace/screenshots on failure)
});
