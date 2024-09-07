import { test, expect } from '../utils/wmsfixture';
import { zoomFunction } from '../utils/zoomFunction';


test('WMS Login', async ({ page, logIn }) => {

  await zoomFunction(page, '0.67');
  // Navigate to the URL
  //login credential
  await logIn.login();

})

test('Navigation to Good Receipt', async ({ page, baseURL, logIn, goodRec}) => {
  
  await zoomFunction(page, '0.67');
  // Navigate to the URL
  await page.goto(`${baseURL}`);
  await expect.soft(page).toHaveTitle(/Lo/); // Check if the page have login title  
  
  //login credentials here
  await logIn.login();
  //
  await expect(page).toHaveTitle(/Dashboard/);

  //navigation to goodReceipt
  await goodRec.goodReceipt();
  await expect(page).toHaveTitle(/Goods Receipt/);

})

test('Act 1 - WMS Goods Receipt ', async ({ page, baseURL, logIn, goodRec, goodRecAdd}) => { // multiple fixtures assignment, storage state
  
  await zoomFunction(page, '0.67');
  // Navigate to the URL
  await page.goto(`${baseURL}`);
  await expect(page).toHaveTitle(/Login/); // Check if the page have login title  

  //login credential
  await logIn.login();
  await expect(page).toHaveTitle(/Dashboard/);

  //navigation to goodReceipt
  await goodRec.goodReceipt();
  await expect(page).toHaveTitle(/Goods Receipt/);

  
  await goodRecAdd.goodReceiptFinal();
  await expect(page).toHaveTitle(/Create/);
})
