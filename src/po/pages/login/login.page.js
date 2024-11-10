const config = require("../../../config/config");
const { browser } = require("@wdio/globals");

class LoginPage {
  get usernameField() {
    return $("//input[@id='username']");
  }

  get passwordField() {
    return $("//input[@id='MainContent_password']");
  }

  get loginButton() {
    return $("//input[@id='submitButton']");
  }

  get incorrectCredentialsWarning() {
    return $("//div[contains(@class,'_loginFormError')]");
  }

  get smartMedicalMenuItem() {
    return $("//a[@id='m-6']");
  }

  async trySignIn() {
    const { usernameSM: username, passwordSM: password } = config;
    await browser.maximizeWindow();
    // Waits for data preparation to finish
    await $("//span[@id='spinner_block']").waitForDisplayed({ timeout: 20000, reverse: true });
    await this.usernameField.waitAndSetValue(username);
    await this.passwordField.waitAndSetValue(password);
    // await browser.pause(3000);
    await this.loginButton.waitAndClick();
    await browser.pause(1000);
    const fail = await this.incorrectCredentialsWarning.isExisting();
    if (!fail) {
      const success = await browser.waitUntil(async () => await $("//a[@id='m-6']").isExisting(), {
        timeout: 3000,
      });
      if (success) {
        console.log("Login successful!");
        return true;
      }
    } else {
      console.log("Incorrect credentials warning received. Will try to log in again...");
      // Reset password tries
      await $("//div[@class='header']").waitAndClick();
      return false;
    }
  }
  async login() {
    let loginAttempts = 0;
    let isLoggedIn;
    while (true) {
      console.log("Trying to sign in...");
      isLoggedIn = await this.trySignIn();
      loginAttempts++;
      if (isLoggedIn) {
        break;
      } else {
        loginAttempts++;
        // If 3 failed login attempts, refresh the browser
        console.log("3 failed login attempts, will try to refresh the page...");
        if (loginAttempts % 3 === 0) {
          await browser.refresh();
          await browser.pause(3000);
        }
      }
    }
  }
}

module.exports = LoginPage;
