import { Page,Locator } from '@playwright/test';
import {LogoutPage} from './LogoutPage';

export class MyAccountPage{
    private readonly page:Page;

    //locators
    private readonly msgHeading:Locator;
    private readonly lnkLogout : Locator;

    constructor (page :Page){
        this.page = page;

        //Initalise locators with css selectors
        this.msgHeading = page.locator('h2:has-text("My Account")');
        this.lnkLogout = page.locator("div.list-group [href*='account/logout']");
        
    }

    /**
     *  Verifies if My Account page is displayed
     * @returns Promise<boolean>  - returns true if heading is visible
     **/
    async isMyAccountPageExists():Promise<boolean>{
        try{
            const isVisible = await this.msgHeading.isVisible();
            return isVisible;
        }
        catch(error){
            console.log(`Error checking My Account page visibility: ${error}`);
            return false;
        }
    }
    /**
     * Clicks on Logout link
     * @returns Promise<LogoutPage>  - returns instance of Logout Page
     **/
    async clickLogout():Promise<LogoutPage>{
        try{
            await this.lnkLogout.click();
            return new LogoutPage(this.page);
        }
        catch(error){
            console.log(`Unable to click logout link: ${error}`);
            throw error;//Re-throw the error to fail the test
        }
    }
    /**
     * Alternative method to return page exists using title
     * @returns Promise<boolean>  - returns true if page title matches
     */

    async getPgeTitle():Promise<string>{
        return(this.page.title());
    }
}