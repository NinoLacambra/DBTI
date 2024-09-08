import { Page, expect } from '@playwright/test';
import data from '../data/wms_data.json';

const login = data.loginpage;

export default class newLogin {
  constructor(public page: Page) {}

  async enterEmail(email: string) {
    const emailInput = this.page.locator(login.emailIn);
    await expect(emailInput).toBeVisible();
    await emailInput.fill(email);
  }

  async enterPassword(pass: string) {
    const passInput = this.page.locator(login.passIn);
    await expect(passInput).toBeVisible();
    await passInput.fill(pass);
  }

  async clickBtn() {
    const btn = this.page.locator(login.btn);
    await expect(btn).toBeVisible();
    await btn.click();
  }

  async login() {
    // Navigate to baseURL
    await this.page.goto('https://192.168.2.32:8094/'); // Will navigate to baseURL + '/'
    
    await expect.soft(this.page).toHaveTitle(/Login/);
    await this.enterEmail(data.user.email);
    await this.enterPassword(data.user.password);
    await this.clickBtn();
    await this.page.waitForURL('https://192.168.2.32:8094/');
    await expect(this.page).toHaveTitle(/Dashboard/);
  }
}
