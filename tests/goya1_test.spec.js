import { test, expect } from '@playwright/test'

test.describe('test', () => {

    let page;
    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        page = await context.newPage();

    });
    test('Login', async () => {

        await page.goto('https://portal-test.goya.com/oms2/#/home')
        //Add assertions to check element
        await expect(page.getByPlaceholder('Username')).toHaveCount(1);
        await expect(page.getByPlaceholder('Password')).toHaveCount(1);
        await expect(page.getByRole('button', { name: 'Login' })).toBeEnabled();

        await page.getByPlaceholder('Username').fill('013506');
        await page.getByPlaceholder('Password').fill('Pwd@013506');
        await page.getByRole('button', { name: 'Login' }).click();
        //Add assertions to verify the URL of the home page .
        await expect(page).toHaveURL('https://portal-test.goya.com/oms2/#/home');

    })


    const demotestdata = [{ name: 'item1', item: '2003' }, { name: 'item2', item: '2052' }, { name: 'item3', item: '2067' },
    { name: 'item4', item: '2071' }, { name: 'item5', item: '2419' }, { name: 'item6', item: '2423' }, { name: 'item7', item: '2435' },
    { name: 'item8', item: '2465' }, { name: 'item9', item: '2469' }, { name: 'item10', item: '2476' }, { name: 'item11', item: '2478' }
        , { name: 'item12', item: '2487' }, { name: 'item13', item: '2605' }, { name: 'item14', item: '2607' }, { name: 'item15', item: '2617' }
    ];
    



    test('Create Order', async () => {

        //Add assertions to verify the Order button

        await expect(page.getByRole('button', { name: 'Order', exact: true })).toBeEnabled();
        await page.getByRole('button', { name: 'Order', exact: true }).click();
        //Add assertions to verify the URL of the Order-Entry page.
        await expect(page).toHaveURL('https://portal-test.goya.com/oms2/#/order-entry');
        await page.locator('#pickUp').check();
        await page.screenshot({ path: "pinkscreen.png", fullPage: true })
        await page.locator('#qk-remove-space div').filter({ hasText: 'Select Customer' }).nth(3).click();
        await page.getByText('712450-SHOP RITE 130').click();
        await page.getByRole('textbox', { name: 'Amount' }).click();
        await page.getByRole('textbox', { name: 'Amount' }).fill('400');


        console.log(demotestdata.length)


        for (const index of demotestdata) {
            console.log(index.item)
            await page.getByRole('textbox', { name: 'Item / UPC#' }).fill(index.item);
            await page.getByPlaceholder('Cases').fill('6');
            await page.getByRole('button', { name: 'Add' }).click();
            await page.waitForTimeout(1000);
        }

        await page.waitForTimeout(2000);
        await page.screenshot({ path: "EOR.png", fullPage: true })


        //Add assertions to verify the Submit button
        await expect(page.getByRole('button', { name: 'Submit', exact: true })).toBeEnabled();
        await page.waitForTimeout(2000);
        
        await page.getByRole('button', { name: 'Submit' }).click();
        await page.waitForTimeout(2000);
        
        


        
        //if (await page.locator('.alert > div:nth-child(2)').isVisible()) {
            //await page.locator('.alert > div:nth-child(2)').click()

        //}

        if (await page.getByRole('button', { name: 'Continue Without Merge' }).isVisible()) {
            await page.getByRole('button', { name: 'Continue Without Merge' }).click();

        }

       
        


       
        if (await page.getByRole('checkbox').nth(3).isVisible()) {
            await page.getByRole('checkbox').nth(3).check();
            
        }

        if (await page.getByRole('checkbox').nth(4).isVisible()) {
            await page.getByRole('checkbox').nth(4).check();

        }


        await page.locator('#duplicateOrderModalPopup').getByRole('button', { name: 'Submit' }).click();

        await page.waitForTimeout(1000);
        page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });


        })


    })

    test('logout', async () => {
        await page.goto('https://portal-test.goya.com/oms2/#/home')
        await page.getByRole('button', { name: '013506-CARLOS MORATO' }).click();
        await page.getByRole('link', { name: 'Logout' }).click();
        //Add assertion to verify that after logout we are getting back to the login screen.
        await expect(page).toHaveURL('https://portal-test.goya.com/oms2/#/login');
        //await page.close();


    })



});