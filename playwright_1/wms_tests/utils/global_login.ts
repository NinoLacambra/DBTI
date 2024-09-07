import { Page } from "@playwright/test";
import { test, expect } from './wmsfixture';


export default async function global_Login(page: Page): Promise <void> {
    

    await page.context().storageState({ path: "../data/LoginAuth.json"});
}