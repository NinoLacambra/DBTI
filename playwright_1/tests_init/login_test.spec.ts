import { test, chromium, expect } from '@playwright/test';

test.use({ headless: false });


test("Login Test Demo", async ( {page} ) => {

    //Setup for browser (its already configured in the config.ts)
    //const browser = await chromium.launch();
    //const context = await browser.newContext();
    //const page = await context.newPage();
    
    //accessing lambdatesting playground
    await page.goto('https://ecommerce-playground.lambdatest.io/');
    await expect(page).toHaveTitle(/Your Store/);

    //accessing login 
    await page.locator("li:has-text('My account Login Register')").hover();
    await page.getByRole('link', { name: 'Login' }).click();
    await expect(page.getByRole('heading', { name: 'New Customer' })).toBeVisible();

    //
    await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/login');
    await expect(page).toHaveTitle(/Account Login/);
    await page.locator("//input[@placeholder='E-Mail Address']").fill("koushik350@gmail.com");
    await page.locator("input[placeholder='Password']").fill("Pass123$");
    await page.click("input[type='submit']");

    await page.waitForTimeout(5000);
})


/**
import { test, chromium, expect } from '@playwright/test';

test.use({ headless: false });

test("Login Test Demo", async () => {

    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    
    await page.goto('https://ecommerce-playground.lambdatest.io/');
    await expect(page).toHaveTitle(/Your Store/);
    await page.hover("//a[@data-toggle='dropdown']//span[contains(.,'My account')]");
    await page.click("'Login'")
    await expect(page.locator("//h2[normalize-space(text())='New Customer']")).toBeVisible();

}) 
*/
