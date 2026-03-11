import { test, expect } from '@playwright/test';

test.describe('Services Section on Homepage', () => {
    test.beforeEach(async ({ page }) => {
        // Mock the services API response
        await page.route('**/service/getServices*', async (route) => {
            const json = {
                data: [
                    {
                        _id: 1,
                        serviceName: 'Basic Service Test',
                        serviceShortDescription:
                            'A basic tune up for your bike.',
                        isActive: true,
                        serviceImageUrl: '/images/service1.png',
                        serviceChecks:
                            '[true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]',
                        orderNo: 1,
                        createdAt: '2023-01-01T00:00:00.000Z',
                        updatedAt: '2023-01-01T00:00:00.000Z',
                        prices: [
                            { id: 1, price: 499, type: 'gear' },
                            { id: 2, price: 399, type: 'nonGear' },
                        ],
                    },
                    {
                        _id: 2,
                        serviceName: 'Advanced Service Test',
                        serviceShortDescription: 'A comprehensive tune up.',
                        isActive: true,
                        serviceImageUrl: '/images/service2.png',
                        serviceChecks:
                            '[true, true, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false]',
                        orderNo: 2,
                        createdAt: '2023-01-01T00:00:00.000Z',
                        updatedAt: '2023-01-01T00:00:00.000Z',
                        prices: [
                            { id: 3, price: 999, type: 'gear' },
                            { id: 4, price: 899, type: 'nonGear' },
                        ],
                    },
                ],
            };
            await route.fulfill({ json });
        });

        // Mock the homePage data API response to prevent it from failing and blocking load if needed
        await page.route('**/content/getHomePage*', async (route) => {
            const json = { data: { s5: [] } };
            await route.fulfill({ json });
        });

        // Set locale storage for cityId to trigger fetching if components rely on it
        await page.addInitScript(() => {
            window.localStorage.setItem('cityId', '1');
        });

        await page.goto('/');
    });

    test('should load services with price, title, and image correctly', async ({
        page,
    }) => {
        // Wait for the Our services section to be visible
        const servicesHeading = page.locator('h2', { hasText: 'Our services' });
        await expect(servicesHeading).toBeVisible();

        // The first service (Basic Service Test) should be active by default and displayed in the right panel
        const serviceTitle = page.locator('h3', {
            hasText: 'Basic Service Test',
        });
        await expect(serviceTitle).toBeVisible();

        // Check if image is displayed for the selected service
        const serviceImage = page.locator('img[alt="Basic Service Test"]');
        await expect(serviceImage).toBeVisible();

        // Check if price is displayed correctly for Gear (default is true)
        // Basic Service Test gear price is 499
        // Target the right panel price which is visible
        let priceElement = page.locator('div.bg-\\[\\#3c9306\\]');
        await expect(priceElement).toContainText('499 Rs');
    });

    test('should update prices when switching between Gear and Non-Gear', async ({
        page,
    }) => {
        // Wait for services to load
        const servicesHeading = page.locator('h2', { hasText: 'Our services' });
        await expect(servicesHeading).toBeVisible();

        // Gear is selected by default, Basic Service price should be 499 Rs
        let priceElement = page.locator('div.bg-\\[\\#3c9306\\]');
        await expect(priceElement).toContainText('499 Rs');

        // Click on Non-Gear button
        const nonGearButton = page.locator('button', { hasText: 'Non-Gear' });
        await nonGearButton.click();

        // Non-Gear price for Basic Service Test should be 399 Rs
        await expect(priceElement).toContainText('399 Rs');

        // Toggle back to Gear
        const gearButton = page.locator('button', { hasText: 'Gear' });
        await gearButton.click();
        await expect(priceElement).toContainText('499 Rs');
    });
});
