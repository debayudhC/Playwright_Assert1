const {test,expect} = require('@playwright/test')

test('Selector demo',async({page})=>
{
  await page.goto('https://www.saucedemo.com/');
// pause the test here and open playwright inspector:
await page.pause();
//use any object property for locator:
await page.click('id=user-name');
//get the locator using the locator class:
await page.locator('[id = "user-name"]').fill('standard_user');
//using CSS selector
await page.locator('#login-button').click();

//get the locator from the playwrigth inspector:
await page.locator('[data-test="password"]').fill('joker');

//get the locator using the text property:
await page.locator('text = Login').click();
//OR
await page.locator('input:has-text("Login")').click();





})
