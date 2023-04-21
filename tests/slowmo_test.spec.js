import { test, expect, chromium } from '@playwright/test';
test('Slow motion and vid recording', async () => {
    // We will create an isolated browser context here.
    //We don't pass the page object in this case in the async function
    // launching a chromium browser
    const browser = await chromium.launch({
        slowMo: 1000,
        headless: false
    });
    //create a context for the above browser:
    const context = await browser.newContext({
        recordVideo: {
            dir: 'videos/',
            size: { width: 800, height: 600 }
        }
    });
    //create a page with the above context:
    const page = await context.newPage();

    //Go to the URL:
    await page.goto('https://admin-demo.nopcommerce.com/login');
    await page.getByLabel('Email:').click();
    await page.getByLabel('Email:').press('Control+a');
    await page.getByLabel('Email:').fill('admin@yourstore.com');
    await page.getByText('Password:', { exact: true }).click();
    await page.getByLabel('Password:').click();
    await page.getByLabel('Password:').press('Control+a');
    await page.getByLabel('Password:').fill('admin');
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.waitForURL('https://admin-demo.nopcommerce.com/admin/');

    await page.getByRole('link', { name: 'Logout' }).click();
    await page.waitForURL('https://admin-demo.nopcommerce.com/login?ReturnUrl=%2Fadmin%2F');

    // must close the context after test:
    await context.close();
})