
/**
 * Test case: User Logout
 * 
 * Tags: @master @regression
 * 
 * Steps:
 * 1.Navigate to the application URL
 * 2. Go to Login page from Home Page
 * 3.Login with Valid credentials
 * 4.Verify 'My Account' page
 * 5. Click on Logout link
 * 6.Click on Continue button
 * 7. verify user is redrected to Home Page 
 */

import {test,expect} from '@playwright/test';
import { TestConfig } from '../test.config';
import { HomePage } from '../pages/HomePage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { LoginPage } from '../pages/LoginPage';
import { LogoutPage } from '../pages/LogoutPage';

//Declare shared variables
let config:TestConfig;
let homePage:HomePage;
let myAccountPage:MyAccountPage;
let loginPage:LoginPage;
let logoutPage :LogoutPage;

//Setup before each test
test.beforeEach(async({page})=>{
    config = new TestConfig(); 
    await page.goto(config.appUrl);


//Intialise page objects
homePage = new HomePage(page);
loginPage = new LoginPage(page);
myAccountPage = new MyAccountPage(page);
logoutPage = new LogoutPage(page);
});

//Optional cleanup after each test
test.afterEach(async({page})=>{
    await page.close(); 
});

test('User logout test @master @regression',async({page})=>{
    //Step 2:Navigate to Login page
    await homePage.clickMyAccount();
    await homePage.clickLogin();

    //Step 3: Perform login using valid credentials
    await loginPage.login(config.email,config.password);

    //Step 4 : Verify successful login
    expect(await myAccountPage.isMyAccountPageExists()).toBeTruthy();
    

    //Step 5 : Click Logout, which returns LogoutPage instance
    logoutPage = await myAccountPage.clickLogout();
    
    //page.waitForTimeout(5000);
    //Step 6:verify "continue" button is visible before clicking
     expect(await logoutPage.isContinueButtonVisible()).toBe(true);
    // Step 6: verify "Continue" button
    //await expect(logoutPage.continueButton).toBeVisible();


    //step 7 : click continue and verify redirection to HomePage
    homePage = await logoutPage.clickContinue();
    expect(await homePage.isHomePageExists()).toBe(true);

});