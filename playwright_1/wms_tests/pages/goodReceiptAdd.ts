import { Page, expect } from "@playwright/test";
import data from '../data/wms_data.json';
import { add1 }  from '../pages/gr_add/add1'; // Import only add1

export default class GoodReceiptAdd {
    constructor(public page: Page) { }

    async add() {
        await this.page.locator(data.goodreceipt.addbtn1).waitFor({ state: 'visible' });
        await this.page.locator(data.goodreceipt.addbtn1).click();
    }

    async addItem() {
        await this.page.locator(data.goodreceipt.create.addbtn2).waitFor({ state: 'visible' });
        await this.page.locator(data.goodreceipt.create.addbtn2).click();
    }

    async randomPick1() {
        const randomItem = this.page.locator(data.goodreceipt.create.items1);
        const count = await randomItem.count();
        if (count > 0) {
            const randomIndex = Math.floor(Math.random() * count);
            await randomItem.nth(randomIndex).click();
        }
    }

    async randomPick2() {
        const randomItem = this.page.locator(data.goodreceipt.create.items2);
        const count = await randomItem.count();
        if (count > 0) {
            const randomIndex = Math.floor(Math.random() * count);
            await randomItem.nth(randomIndex).click();
        }
    }

    async selectWH(warehouseName: string): Promise<string> {
        await this.page.click(data.goodreceipt.create.warehouse);
        await this.page.selectOption(data.goodreceipt.create.warehousesOption, { label: warehouseName });
        return warehouseName; // Return the selected warehouse name
    }

    async batches(warehouseName: string) {
        // Directly call add1 and pass the warehouse name
        await add1(this.page, warehouseName); 
    }

    async goodReceiptFinal() {
        await this.add();
        await expect(this.page).toHaveTitle(/Create/);
        await this.addItem();
        await this.randomPick1();       
        await this.randomPick2();

        const selectedWarehouse = await this.selectWH(data.warehouses.RM); // Capture the warehouse name
        await this.batches(selectedWarehouse); // Pass the selected warehouse name to batches
    }
}
