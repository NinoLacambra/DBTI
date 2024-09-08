import { chromium, firefox, webkit } from '@playwright/test';
import newLogin from '../pages/loginPage';

async function saveStorageState(browserType: 'chromium' | 'firefox' | 'webkit', path: string) {
    // Launch the specified browser
    const browser = browserType === 'chromium' ? await chromium.launch() :
                    browserType === 'firefox' ? await firefox.launch() :
                    await webkit.launch();
    
    // Create a new context and page
    const context = await browser.newContext({
        ignoreHTTPSErrors: true,
    });
    const page = await context.newPage();

    // Perform login
    const loginPage = new newLogin(page);
    await loginPage.login();

    // Save storage state
    await context.storageState({ path });

    // Close the browser
    await browser.close();
}

export default async function globalSetup() {
    // Save storage state for Chromium
    await saveStorageState('chromium', './wms_tests/data/loginAuth_chromium.json');
    
    // Save storage state for Firefox
    await saveStorageState('firefox', './wms_tests/data/loginAuth_firefox.json');
    
    // Save storage state for WebKit
    await saveStorageState('webkit', './wms_tests/data/loginAuth_webkit.json');
}
