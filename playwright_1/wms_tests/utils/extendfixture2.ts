import { test as baseTest } from "@playwright/test";
import GoodReceiptAdd from "../pages/goodReceiptAdd";

type pages = {
    goodRecAdd: GoodReceiptAdd;
};

const testPages1 = baseTest.extend<pages>({
    goodRecAdd: async ({ page }, use) => {
        await use(new GoodReceiptAdd(page));
    },

});

export const test3 = testPages1;
export const expect3 = testPages1.expect;
