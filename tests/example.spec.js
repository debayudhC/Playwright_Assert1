// @ts-check
const { test, expect } = require('@playwright/test');

let context;
let page;
test.beforeAll(async ({ browser }) => {
  context = await browser.newContext();
  //Start the trace in the Before All hook
  await context.tracing.start(
    {
      snapshots: true,
      screenshots: true
    });
  page = await context.newPage();
})

test.afterAll(async () => {
  await context.tracing.stop({ path: 'test3_trace.zip' });
})

test('Homepage has Playwright', async ({ }) => {

  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);

});


test('get started link', async ({ }) => {


  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/);

});