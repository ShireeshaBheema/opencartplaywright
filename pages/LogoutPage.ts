import {Page,Locator} from '@playwright/test';
import { HomePage } from './HomePage';

export class LogoutPage{
    private readonly page:Page;
    private readonly btnContinue:Locator;

    constructor(page:Page){
        this.page = page;
        //locators
        this.btnContinue = page.locator('.btn.btn-primary');

    }
    /**
     * clicks the continue button after logout
     * @returns Promise<HomePage> - returns instance of HomePage
     */
    async clickContinue():Promise<HomePage>{
        await this.btnContinue.click();
        return new HomePage(this.page);
    }

    /**
     * Verifies if the contine button is visible
     * @returns Promise<boolean> - returns true if button is visible
     */
    async isContinueButtonVisible(): Promise<boolean>{
        return await this.btnContinue.isVisible();
    }
}