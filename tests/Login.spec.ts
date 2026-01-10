/**
 * Test case : Login with valid credentials
 * 
 * Tags: @master @sanuty @regression
 * 
 * Steps:
 * 1. Navifate to application url
 * 2. Navigate to login page via home page
 * 3.enter valid credentials and log in
 * 4. Verify successful login by checking 'My Account' page presence
 */

import {test,expect} from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { TestConfig } from '../test.config';

let config:TestConfig;
let homePage :HomePage;
let loginPage:LoginPage;
let myAccountPage :MyAccountPage;

//This hook runs before each test
test.beforeEach(async({page})=>{
    config = new TestConfig();
    await page.goto(config.appUrl);

    //Intialise page objects
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    myAccountPage = new MyAccountPage(page);
});

//Optional cleanup after each test
test.afterEach(async({page})=>{
    await page.close();
});

test('User login test @master @sanity @regression',async()=>{
    //navigate to login page via homepage
    await homePage.clickMyAccount();
    await homePage.clickLogin();

    //Enter valid credentials and log in
    await loginPage.setEmail(config.email);
    await loginPage.setPassword(config.password);
    await loginPage.clickLogin();

    //alternatively
    //await loginPage.login(config.email,config.password);

    //verify successful login by checking "My Account" page presence
    const isLoggedIn = await myAccountPage.isMyAccountPageExists();
    expect(isLoggedIn).toBeTruthy();
})