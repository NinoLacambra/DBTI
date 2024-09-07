import { test as baseTest} from "@playwright/test";
import Login from "../pages/loginPage";
import GoodReceiptNavigation from "../pages/goodReceiptNavigation";


type pages = {
    logIn: Login;
    goodRec: GoodReceiptNavigation;
}

const testPages = baseTest.extend<pages>({


    logIn: async ({ page }, use) => {
        await use(new Login(page));
    },

    goodRec: async ({page}, use) =>{
        await use (new GoodReceiptNavigation(page));
        
    },

})

export const test1 = testPages;
export const expect = testPages.expect;