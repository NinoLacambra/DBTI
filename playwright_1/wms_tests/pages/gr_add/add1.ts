import { promises as fs } from 'fs';
import { Page } from 'playwright';
import data from '../../data/wms_data.json';

export async function add1(page: Page, warehouseName: string) {
    // Function to format the current date with the warehouse name
    function formatDateWithName(name: string): string {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const milliseconds = String(now.getMilliseconds()).padStart(3, '0');

        // Combine the date components into a formatted string
        const formattedDate = `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;

        // Get the first letter of each word in the warehouse name
        const formattedName = name
            .split(' ')                   // Split the name into words
            .map(word => word.charAt(0))  // Get the first letter of each word
            .join('')                     // Join letters without spaces
            .toLowerCase();               // Convert to lowercase

        return `${formattedDate}${formattedName}`;
    }

    // Function to generate a random alphanumeric string (used for reference and palette numbers)
    function generateRandomString(length: number = 8): string {
        const charac = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charac.length);
            result += charac[randomIndex];
        }
        return result;
    }

    // Fill batch details
    await page.locator(data.goodreceipt.create.batches).click();

    // Format and fill reference number based on warehouse name and date
    const formattedString = formatDateWithName(warehouseName);
    await page.locator(data.goodreceipt.inBatch.refNum).fill(formattedString);

    // Open calendar and select a random day in August
    await page.locator(data.goodreceipt.calendar.openCalendar).click();
    await page.locator(data.goodreceipt.calendar.prevMon).click();
    const randomDay = Math.floor(Math.random() * 31) + 1;
    const daySelector = `//span[@aria-label='August ${randomDay}, 2024']`;
    await page.locator(daySelector).click();

    // Fill reference number and palette number
    const reference = generateRandomString();
    const paletteNum = generateRandomString();
    await page.locator(data.goodreceipt.inBatch.reference).fill(reference);
    await page.locator(data.goodreceipt.inBatch.palletNum).fill(paletteNum);

    // Fill quantity
    await page.locator(data.goodreceipt.inBatch.quantity).fill("100");
    await page.locator(data.goodreceipt.inBatch.addBatch).click();
    await page.locator(data.goodreceipt.inBatch.checkBatch).click();

    // Handle submission or return based on form validity
    const submit = await page.isEnabled(data.goodreceipt.inBatch.submitBatch);
    if (submit) {
        await page.locator(data.goodreceipt.inBatch.submitBatch).click();
    } else {
        await page.locator(data.goodreceipt.inBatch.returnBatch).click();
    }

    // Confirm the batch submission
    await page.locator(data.goodreceipt.inBatch.confirmBatch).click();

    // Store the generated values in a text file
    const dataToStore = `Warehouse: ${warehouseName}\nFormatted String: ${formattedString}\nReference Number: ${reference}\nPalette Number: ${paletteNum}\n\n`;
    await fs.appendFile('output.txt', dataToStore);
}
