const { test, expect } = require('@playwright/test');
//OR
//import {test,expect} from '@playwright/test';

test('Assertion Test 1', async ({ page }) => {
    await page.goto('https://kitchen.applitools.com/');
    //Assert to check if element is present or not
    await expect(page.getByRole('heading', { name: 'The Kitchen' })).toHaveCount(1);
    console.log('The Kitchen element is present');
    //If element is visible, then click the element:
    if (await page.getByRole('heading', { name: 'The Kitchen' }).isVisible()) {
        console.log('Click the kitchen element');
        await page.getByRole('heading', { name: 'The Kitchen' }).click();
    }
    //check element hidden or visible:
    await expect(page.getByRole('heading', { name: 'The Kitchen' })).toBeVisible();
    //await expect.soft(page.getByRole('heading', { name: 'The Kitchen' })).toBeHidden();

    //check element enabled or disabled:
    await expect(page.getByRole('heading', { name: 'The Kitchen' })).toBeEnabled();
    //await expect.soft(page.getByRole('heading', { name: 'The Kitchen' })).toBeDisabled();

    //check text:
    await expect(page.getByRole('heading', { name: 'The Kitchen' })).toHaveText('The Kitchen');
    //await expect.soft(page.getByRole('heading', { name: 'The Kitchen' })).not.toHaveText('The Kitchen');


    //check attribute value:
    await expect(page.getByRole('heading', { name: 'The Kitchen' })).toHaveAttribute('class', 'chakra-heading css-dpmy2a');
    //check attribute value with reg ex:
    await expect(page.getByRole('heading', { name: 'The Kitchen' })).toHaveClass(/.*css-dpmy2a/);

    //assert to check the URL and title of a page:
    await expect(page).toHaveURL('https://kitchen.applitools.com/');
    //use regular exp for title:
    await expect(page).toHaveTitle(/.*Kitchen/);
    
    //visual validation with screenshot:
    await expect(page).toHaveScreenshot();
    await page.close();

})