

 import {test,expect} from '@playwright/test';
 import { HomePage } from '../pages/HomePage';
 import { RegistrationPage } from '../pages/RegistrationPage';
 import { RandomDataUtil } from '../utils/randomDataGenerator';
 import { TestConfig } from '../test.config';

 let homePage:HomePage;
 let registartionPage:RegistrationPage;
 let config:TestConfig;

 test.beforeEach(async({page})=>{
    const config = new TestConfig();
    await page.goto(config.appUrl); //navigate to application URL
    homePage = new HomePage(page);
    registartionPage = new RegistrationPage(page);

 })

 test.afterEach(async({page})=>{
    await page.waitForTimeout(2000);
    await page.close();
 })


 test('User registration test @master @sanity @regression',async()=>{
   

    //go to 'My Account' and click 'register'
    
    await homePage.clickMyAccount();
    await homePage.clickRegister();

    //Fill in registration details with random data
    

    await registartionPage.setFirstName(RandomDataUtil.getFirstName());
    await registartionPage.setLastName(RandomDataUtil.getLastName());
    await registartionPage.setEmail(RandomDataUtil.getEmail());
    await registartionPage.setTelephone(RandomDataUtil.getPhomeNumber());

    const password = RandomDataUtil.getPassword();
    await registartionPage.setPassword(password);
    await registartionPage.setConfirmPassword(password);
    await registartionPage.setPrivacyPolicy();
    await registartionPage.clickContinue();

    //validate confirmation message
    const confirmationMsg=await registartionPage.getConfirmationMsg();
    expect(confirmationMsg).toContain("Your Account Has Been Created");

   

 })