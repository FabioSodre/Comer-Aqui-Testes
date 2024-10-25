const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  e2e: {
    // baseUrl: 'https://comeraqui.com.br/gerence',
    // env: {
    //   apiUrl: 'http://api.comeraqui.com.br:249/'
    // },

    // baseUrl: Cypress.env('url_site'),
    // env: {
    //   apiUrl: Cypress.env('url_api')
    // },

    viewportWidth: 1920,
    viewportHeight: 1080,
    videoCompression: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      allureWriter(on, config);
      return config;
    },
  },
});
