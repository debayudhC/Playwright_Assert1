const { test, expect } = require('@playwright/test');

test('Valid Login', async function ({ page }) {
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    //add a delay after typing each character of 200ms.
    await page.getByPlaceholder("Username").fill('Admin',{delay:200});
    //await page.getByPlaceholder("Password").fill('admin123');
    
    await page.locator("input[name='password']").type("admin123",{delay:200});
    
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

test.only('Invalid Login', async function ({ page }) {
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    //add a delay after typing each character of 200ms.
    await page.getByPlaceholder("Username").fill('Admin',{delay:200});
    //await page.getByPlaceholder("Password").fill('admin123');
    
    await page.locator("input[name='password']").type("admin1234",{delay:200});
    
    //await page.getByRole('button', { name: 'Login' }).click();
    await page.locator("button[type='submit']").click();
    
    //pick the error message from the locator
    const errMessg = await page.locator("//p[@class='oxd-text oxd-text--p oxd-alert-content-text']").textContent();
    //await page.pause();
    console.log("Error Message is " +errMessg);
 // expecting the error message contains "invalid". Expecting true value
   expect(errMessg.includes("Invalid")).toBeTruthy();

})
