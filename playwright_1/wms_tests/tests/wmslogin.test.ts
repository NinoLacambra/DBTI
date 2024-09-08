import { test } from '../utils/wmsfixture';
import { zoomFunction } from '../utils/zoomFunction';


test.beforeEach('Navigation to Good Receipt', async ({ page, baseURL }) => {
  
  await zoomFunction(page, '0.67');
  // Navigate to the URL
  await page.goto(`${baseURL}`);


})

test('Act 1 - WMS Goods Receipt ', async ({ goodRec, goodRecAdd}) => {
  //Navigation to GoodReceipt
  await goodRec.goodReceipt();
  //Adding Items
  await goodRecAdd.goodReceiptFinal();

})
