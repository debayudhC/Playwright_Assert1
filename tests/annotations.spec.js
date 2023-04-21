import { test, expect } from '@playwright/test';

test('Demo Login 1 @smoke', async ({ page }) => {

    await page.goto('https://demo.applitools.com/');


    //get the locator for username and fill it
    await page.getByPlaceholder('Enter your username').fill('User 1');
    //get the locator for password and fill it
    await page.getByPlaceholder('Enter your password').fill('1234');
    //click on the login button
    //await page.getByRole('link', { name: 'Sign in' }).click();
    const loginBtn = await page.locator(("//a[contains(.,'Sign in')]"));
    loginBtn.click();
    await page.getByRole('link', { name: 'ACME' }).isVisible();
    await page.close();
})


test('Demo Login 2', async ({ page }) => {
    test.slow();
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    //add a delay after typing each character of 200ms.
    await page.getByPlaceholder("Username").fill('Admin', { delay: 200 });
    //await page.getByPlaceholder("Password").fill('admin123');

    await page.locator("input[name='password']").type("admin123", { delay: 200 });

    //await page.getByRole('button', { name: 'Login' }).click();
    await page.locator("button[type='submit']").click();

    //add a delay for 2 sec
    await page.waitForTimeout(2000);
    //assert that the page url contains Dashboard
    await expect(page).toHaveURL(/dashboard/);
    //logout
    await page.locator("//span[@class='oxd-userdropdown-tab']").click();
    await page.getByRole('menuitem', { name: 'Logout' }).click();

    await page.waitForTimeout(3000);
    //verify that after logout we have got the login page
    await expect(page).toHaveURL(/login/);
    await page.close();

})

test('Demo Login 3 @smoke', async ({ page }) => {
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
    await page.close();

})