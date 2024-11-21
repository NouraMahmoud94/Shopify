const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://tranquilomatcha.com',
    supportFile: 'cypress/support/e2e.js',
    fixturesFolder: 'cypress/fixtures',
    specPattern: 'cypress/e2e/**/*.cy.js',
    defaultCommandTimeout: 100000, // Timeout for element appearance
    retries: {
      runMode: 2, // Retry failed tests twice in headless mode
      openMode: 1 // Retry failed tests once in interactive mode
    },
    // setupNodeEvents(on, config) {
    //   implement node event listeners here
    // },
  },
  video: false,
  screenshotsFolder: 'cypress/screenshots',
  videosFolder: 'cypress/videos',
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: true,
    json: true,
  },
});
