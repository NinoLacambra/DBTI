import { chromium } from '@playwright/test';
import newLogin from '../pages/loginPage';

export default async function globalSetup() {
    const browser = await chromium.launch();
    const context = await browser.newContext({
        ignoreHTTPSErrors: true,
    });
  
    // Create a new page instance
    const page = await context.newPage();

    const loginPage = new newLogin(page);

    await loginPage.login();

    await context.storageState({ path: './wms_tests/data/loginAuth.json'})
}