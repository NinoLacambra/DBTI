import { Page } from 'playwright';
import data from '../../data/wms_data.json';

export async function add2(page: Page, warehouseName: string) {
    function formatDateWithName(name: string): string {
        const now = new Date();

        // Extract date components
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so we add 1
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const milliseconds = String(now.getMilliseconds()).padStart(3, '0');

        // Combine components into a formatted string
        const formattedDate = `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;

        // Get the first letter of each word in the name, convert to lowercase, and remove spaces
        const formattedName = name
            .split(' ')                   // Split the name into words
            .map(word => word.charAt(0))  // Get the first letter of each word
            .join('')                     // Join letters without spaces
            .toLowerCase();              // Convert to lowercase

        // Return the formatted date with the formatted name
        return `${formattedDate}${formattedName}`;
    }

    const formattedString = formatDateWithName(warehouseName);
    await page.locator(data.goodreceipt.inBatch.refNum).fill(formattedString);

    await page.locator(data.goodreceipt.calendar.openCalendar).click();
    await page.locator(data.goodreceipt.calendar.prevMon).click()
    const randomDay = Math.floor(Math.random() * 31) + 1;
    const daySelector = `//span[@aria-label='August ${randomDay}, 2024']`;
    await page.locator(daySelector).click();
    
    // Use the warehouse name in place of "RMW"

    await page.locator(data.goodreceipt.create.singleQuantity).fill("10");
    
    const submit = await page.isEnabled(data.goodreceipt.inBatch.submitBatch);
    if (submit) {
        await page.locator(data.goodreceipt.inBatch.submitBatch).click();
    } else {
        await page.locator(data.goodreceipt.inBatch.returnBatch).click();
    }

    await page.locator(data.goodreceipt.inBatch.confirmBatch).click();
}