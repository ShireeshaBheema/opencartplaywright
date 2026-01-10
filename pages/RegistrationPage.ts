import {Page,expect,Locator} from '@playwright/test';

export class RegistrationPage{
    private readonly page:Page;
    //locators
    private readonly txtFirstName:Locator;
    private readonly txtLastName:Locator;
    private readonly txtEmail:Locator;
    private readonly txtTelephone:Locator;
    private readonly txtPassword:Locator;
    private readonly txtConfirmPassword:Locator;
    private readonly chkdPolicy:Locator;
    private readonly btnContinue:Locator;
    private readonly msgConfirmation:Locator;

    constructor(page:Page){
        this.page=page;

        //intialise locators with css selectors
        this.txtFirstName = page.locator('#input-firstname');
        this.txtLastName = page.locator('#input-lastname');
        this.txtEmail = page.locator('#input-email');
        this.txtTelephone = page.locator('#input-telephone');
        this.txtPassword = page.locator('#input-password');
        this.txtConfirmPassword=page.locator('#input-confirm');
        this.chkdPolicy = page.locator('input[name="agree"]');
        this.btnContinue = page.locator("input[value='Continue']");
        this.msgConfirmation = page.locator('h1:has-text("Your Account Has Been Created")');
    }

    /**
     * Sets the first name in the registration form 
     * @param fname - First name to enter
     */
    async setFirstName(fname:string):Promise<void>{
        await this.txtFirstName.fill(fname);
    }

     /**
     * Sets the last name in the registration form 
     * @param lname - last name to enter
     */
    async setLastName(lname:string):Promise<void>{
        await this.txtLastName.fill(lname);
    }

     /**
     * Sets the email in the registration form 
     * @param email - email to enter
     */
    async setEmail(email:string):Promise<void>{
        await this.txtEmail.fill(email);
    }

     /**
     * Sets the telephone number in the registration form 
     * @param telephone - telephone number to enter
     */
    async setTelephone(telephone:string):Promise<void>{
        await this.txtTelephone.fill(telephone);
    }

    /**
     * Sets the password in the registration form 
     * @param password - password to enter
     */
    async setPassword(pwd:string):Promise<void>{
        await this.txtPassword.fill(pwd);
    }
    /**
     * Sets the confirm password in the registration form 
     * @param confirm password - confirm password to enter
     */
    async setConfirmPassword(pwd:string):Promise<void>{
        await this.txtConfirmPassword.fill(pwd);
    }

     /**
     * Checks the privacy policy checkbox
     */
    async setPrivacyPolicy():Promise<void>{
        await this.chkdPolicy.check();
    }

     /**
     * Clicks the continue button
     */
    async clickContinue():Promise<void>{
        await this.btnContinue.click();
    }

     /**
     *Gets the confirmation message text
     * @returns Promise<string> - confirmation msg text</string>
     */
    async getConfirmationMsg():Promise<string>{
        return await this.msgConfirmation.textContent()??'';
    }

     /**
     * Complete the registration workflow
     * @param userdata - object containing registration data
     */
    async completeRegistration(userData:{
        firstName:string;
        lastName:string;
        email:string;
        password:string;
    }):Promise<void>{
        await this.setFirstName(userData.firstName);
        await this.setLastName(userData.lastName);
        await this.setEmail(userData.email);
        await this.setPassword(userData.password);
        await this.setConfirmPassword(userData.password);
        await this.setPrivacyPolicy();
        await this.clickContinue();
        await expect(this.msgConfirmation).toBeVisible();

    }

}