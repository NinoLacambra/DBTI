import { test as baseTest} from "@playwright/test";
import Login from "../pages/loginPage";
import GoodReceiptNavigation from "../pages/goodReceiptNavigation";
import GoodReceiptAdd from "../pages/goodReceiptAdd";


type pages = {
    logIn: Login;
    goodRec: GoodReceiptNavigation;
    goodRecAdd: GoodReceiptAdd;
}

const testPages = baseTest.extend<pages>({


    logIn: async ({ page }, use) => {
        await use(new Login(page));
    },

    goodRec: async ({page}, use) =>{
        await use (new GoodReceiptNavigation(page));
        
    },

    goodRecAdd: async ({page}, use) => {
        await use (new GoodReceiptAdd(page));
    }
})

export const test = testPages;
export const expect = testPages.expect;