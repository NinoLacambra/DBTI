import { Page } from "@playwright/test";

export async function zoomFunction(page: Page, zoomLevel: string): Promise<void> {
    await page.addInitScript((zoom: string): void => {
        window.addEventListener('load', (): void => {
            (document.body.style as CSSStyleDeclaration).zoom = zoom;
        });
    }, zoomLevel);
}