const { urlSM } = require("./config");

exports.config = {
  runner: "local",
  specs: ["../tests/**/*.spec.js"],
  suites: {
    doctorExamination: ["../tests/e2e/*/patient.doctorExamination.spec.js"],
  },
  exclude: [],
  maxInstances: 1,
  capabilities: [
    {
      browserName: "chrome",
      "goog:chromeOptions": {
        args: ["--ignore-certificate-errors-spki-list"],
      },
    },
  ],
  logLevel: "silent",
  bail: 0,
  baseUrl: urlSM,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  framework: "mocha",
  reporters: [
    "spec",
    [
      "allure",
      {
        outputDir: "allure-results",
        issueLinkTemplate: "https://bb-tech.atlassian.net/browse/{}",
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
        disableMochaHooks: true,
      },
    ],
  ],
  mochaOpts: {
    ui: "bdd",
    timeout: 1200000,
  },
  before: function () {
    browser.addCommand(
      "waitAndClick",
      async function () {
        await this.waitForDisplayed();
        await this.click();
      },
      true,
    );
    browser.addCommand(
      "waitAndSetValue",
      async function (value) {
        await this.waitForDisplayed();
        await this.setValue(value);
      },
      true,
    );
    browser.addCommand(
      "waitAndSelectByIndex",
      async function (value) {
        await this.waitForDisplayed();
        await this.selectByIndex(value);
      },
      true,
    );
    browser.addCommand(
      "waitAndSelectByVisibleText",
      async function (value) {
        await this.waitForDisplayed();
        await this.selectByVisibleText(value);
      },
      true,
    );
    browser.addCommand("getMemoryMetrics", async function () {
      const puppeteerBrowser = await this.getPuppeteer();
      const pages = await puppeteerBrowser.pages();
      const page = pages[0];
      return await page.metrics();
    });
  },
  afterTest: async function (test, context, { error }) {
    if (error) {
      await browser.takeScreenshot();
    }
  },
};
