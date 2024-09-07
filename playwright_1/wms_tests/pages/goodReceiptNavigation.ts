import { Page, expect } from "@playwright/test";
import data from '../data/wms_data.json'

export default class GoodReceiptNavigation{

    constructor(public page: Page) { }

    async goodReceiptNav() {
        const goodreceivenav = this.page.locator(data.modulesnav.inventory);
        await expect(goodreceivenav).toContainText("Inventory");
        await goodreceivenav.click();
    }

    async goodReceiptClk() {
        const goodreceiptclk = this.page.locator(data.goodreceipt.link);
        await expect(goodreceiptclk).toContainText("Goods Receipt");
        await goodreceiptclk.click()
    }
    
    async goodReceipt(){
        await this.goodReceiptNav();
        await this.goodReceiptClk();
    }
}
