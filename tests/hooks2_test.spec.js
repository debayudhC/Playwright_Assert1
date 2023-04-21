const { test, expect } = require('@playwright/test');

test.describe('All my tests in group 1', () => {

//All the tests belong to the above describe group
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();
        await page.waitForURL('https://www.saucedemo.com/inventory.html');
    }) // end of beforeEach

    test.afterAll(async ({ page }) => {
        await page.close();
    }) //end of afterAll

    //create a test to perform some actions on the homepage after login
    test("Homepage", async ({ page }) => {

        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
        await page.locator('#item_1_title_link').click();
        await page.waitForURL('https://www.saucedemo.com/inventory-item.html?id=1');
        await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
        await page.locator('[data-test="back-to-products"]').click();
        await page.waitForURL('https://www.saucedemo.com/inventory.html');

    }) //end of homepage

    //create a test to logout from the app. Login and then logout
    test("Logout", async ({ page }) => {

        await page.getByRole('button', { name: 'Open Menu' }).click();
        await page.getByRole('link', { name: 'Logout' }).click();
        await expect(page).toHaveURL('https://www.saucedemo.com/');

    })//end of logout

})//end of the describe group

test('Outside test',async({page})=>{
    console.log("This test is outside the group")
 })