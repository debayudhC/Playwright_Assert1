import { test, expect } from '@playwright/test';

test('Demo Login 1', async ({ page }) => {

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

})


test('Demo Login 2', async ({ page }) => {

   await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByPlaceholder('Username').click();
  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  
  await page.getByText('Alan Collingslae').click();
  await page.getByRole('menuitem', { name: 'Logout' }).click();

  // ---------------------
  await page.close();
})

test.only('Demo Login 3', async ({ page }) => {
//await page.pause();

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