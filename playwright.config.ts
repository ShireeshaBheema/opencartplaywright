import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  timeout:30*1000,
  testDir: './tests',
  
  fullyParallel: true,
  
  /* Retry on CI only */
  //retries: process.env.CI ? 2 : 0,
  retries:1,
  /* Opt out of parallel tests on CI. */
  //workers: process.env.CI ? 1 : undefined,
  workers:2,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter:[
    ['html',{outputFolder:'../reports/html-report'}],
    ['allure-playwright',{outFolder:'../reports/allure-results'}],
    ['dot'],
    ['list']
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    
     trace: 'on-first-retry',
     screenshot:'only-on-failure',
     video:'retain-on-failure',
     viewport:{width: 1280, height : 720},
     ignoreHTTPSErrors : true,
     //permissions:['geolocations']

  },
  //grep:/@master/,

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

  ]
});
