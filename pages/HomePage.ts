import {Page,expect,Locator} from '@playwright/test';

export class HomePage{
    private readonly page:Page;
    //locators
    private readonly lnkMyAcount :Locator;
    private readonly lnkRegister: Locator;
    private readonly linkLogin:Locator;
    private readonly txtSearchbox: Locator;
    private readonly btnSearch :Locator;

    //constructor
    constructor(page:Page){
        this.page= page;
        this.lnkMyAcount = page.locator('span:has-text("My Account")');
        this.lnkRegister = page.locator('a:has-text("Register")');
        this.linkLogin = page.locator('a:has-text("Login")');
        this.txtSearchbox = page.locator('input[name="search"]');
        this.btnSearch = page.locator('.btn.btn-default.btn-lg');
    }

    //action methods

    //check if home page exists
    async isHomePageExists(){
        let title:string = await this.page.title();
        if(title){
            return true;
        }
        return false;
    }

    //click "My Account" link
    async clickMyAccount(){
        try{
            await this.lnkMyAcount.click();
        }
        catch(error){
            console.log(`Exception occured while clicking 'My Account': ${error}`);
            throw error;
        }
        
    }

    async clickRegister(){
        try{
            await this.lnkRegister.click();
        }
         catch(error){
            console.log(`Exception occured while clicking 'Register': ${error}`);
            throw error;
        }
    }

    //click "Login" link
    async clickLogin(){
        try{
            await this.linkLogin.click();
        }
        catch(error){
            console.log(`Exception occured while clicking 'Login: ${error}`);
            throw error;
        }
    }

    //enter product name in the search box
    async enterProductname(pName: string){
        try{
            await this.txtSearchbox.fill(pName);
        }
        catch(error){
            console.log(`Exception occured while entering product name: ${error}`);
            throw error;
        }
    }
    //click the search button
    async clickSearch(){
        try{
            await this.btnSearch.click();
        }
        catch(error){
            console.log(`Exception occured while clicking search button: ${error}`);
            throw error;
        }
    }

}