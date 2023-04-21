import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {

  await page.goto('https://portal-test.goya.com/oms2/#/login');
  //Add assertions to check element
  await expect(page.getByPlaceholder('Username')).toHaveCount(1);
  await expect(page.getByPlaceholder('Password')).toHaveCount(1);
  await expect(page.getByRole('button', { name: 'Login' })).toBeEnabled();

  await page.getByPlaceholder('Username').fill('013506');
  await page.getByPlaceholder('Password').fill('Pwd@013506');
  await page.getByRole('button', { name: 'Login' }).click();
})
test.afterAll(async ({ page }) => {
  await page.close()
})

test('Place Order', async ({ page }) => {
  await expect(page).toHaveURL('https://portal-test.goya.com/oms2/#/home');
  await expect(page.getByRole('button', { name: 'Order', exact: true })).toBeEnabled();
  await page.getByRole('button', { name: 'Order', exact: true }).click();
  //Add assertions to verify the URL of the Order-Entry page.
  await expect(page).toHaveURL('https://portal-test.goya.com/oms2/#/order-entry');

  await page.getByRole('searchbox', { name: 'Customer' }).click();
  await page.getByRole('searchbox', { name: 'Customer' }).fill('712450');
  await page.getByText('712450-SHOP RITE 130').click();

  await page.getByRole('textbox', { name: 'Amount' }).fill('300');
  await page.getByRole('textbox', { name: 'Item / UPC#' }).fill('1222');
  await page.getByPlaceholder('Cases').fill('10');

  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('button', { name: '+' }).click();
  //await page.pause();
  await page.getByRole('button', { name: 'Submit' }).click();

  //if (await page.getByRole('button', { name: 'Continue Without Merge' }).isEnabled)
  //{
    //console.log("Continue without merge button is coming");
    //await page.getByRole('button', { name: 'Continue Without Merge' }).click();
  //}

  await page.getByRole('checkbox').nth(3).check();
  
  if (await page.$("//input[@ng-model='allData.proceedDuplicateOrderss']")) {
    console.log("Duplicate order checkbox is present");
    await page.locator("//input[@ng-model='allData.proceedDuplicateOrderss']").check();
  }
  await page.screenshot({ path: Date.now() + 'screenshot1.png' });

  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => { });
  });
  //await page.locator("//button[contains(@ng-click,'duplicateData()')]").click();
  await page.locator('#duplicateOrderModalPopup').getByRole('button', { name: 'Submit' }).click();
})

test('logout', async ({ page }) => {
  //go to the home page again:
  await page.goto('https://portal-test.goya.com/oms2/#/home');
  await page.getByRole('button', { name: '013506-CARLOS MORATO' }).click();
  await page.getByRole('link', { name: 'Logout' }).click();
  //Add assertion to verify that after logout we are getting back to the login screen.
  await expect(page).toHaveURL('https://portal-test.goya.com/oms2/#/login');

})