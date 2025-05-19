/** @type {import('@jest/types').Config.InitialOptions} */

// const isAndroid = process.env.TEST_PLATFORM === 'android';
module.exports = {
  preset: 'ts-jest',
  rootDir: '..',
  testMatch: ['<rootDir>/e2e/tests/**/*.test.ts'], 
  testTimeout: 120000,
  maxWorkers: 1,
  globalSetup: 'detox/runners/jest/globalSetup',
  globalTeardown: 'detox/runners/jest/globalTeardown',
  reporters: [
    'default',
    ['jest-html-reporter', {
      pageTitle: 'LAFISE Digital - E2E Tests',
      outputPath: `./e2e/reports/report.html`,
      logo: './logo.png',
      dateFormat: 'dd-mm-yyyy hh:MM:ss',
    }]
  ],
  testEnvironment: 'detox/runners/jest/testEnvironment',
  verbose: true,
};
