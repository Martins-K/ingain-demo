const { browser } = require("@wdio/globals");

class topNavigationComponent {
  get smartMedicalMenu() {
    return $("(//a[normalize-space()='SmartMedical'])[1]");
  }

  get dataExchangeMenu() {
    return $("(//a[normalize-space()='Datu apmaiņa'])[1]");
  }

  get patientInSession() {
    return $("//img[@id='patient_icon']");
  }

  get hospitalModuleLink() {
    return $("//a[@href='main.php?menu=f_hospital']");
  }

  get patientModuleLink() {
    return $("//a[@id='sm-44']");
  }

  get paymentsModuleLink() {
    return $("//a[@id='sm-37']");
  }

  get dataExchangeDCLink() {
    return $("//a[@id='sm-26']");
  }

  get exitBtn() {
    return $("//a[@href = '/?exit']");
  }

  async waitForPageLoad() {
    await browser.waitUntil(async () => {
      const state = await browser.execute(() => document.readyState);
      return state === "complete";
    });
  }

  async removePatientFromSession() {
    await browser.switchToFrame(null);
    await browser.waitUntil(async () => {
      return await $("//img[@src='/_gtk/images/patient_unpin.png']").isExisting();
    });
    await this.patientInSession.waitAndClick();
    if (await browser.isAlertOpen()) {
      await browser.acceptAlert();
    }
  }

  /**
   * Clicks patient in session button
   */
  async clickPatientInSession() {
    await browser.switchToFrame(null);
    await this.patientInSession.waitAndClick();
  }

  async navigateToModule(moduleMenu, moduleLink) {
    await browser.switchToFrame(null);
    await this.waitForPageLoad();
    await moduleMenu.waitForDisplayed();
    await moduleMenu.moveTo();
    await browser.pause(1000);
    await moduleLink.waitForDisplayed();
    await moduleLink.moveTo();
    await moduleLink.click();
  }

  async goToHospitalModule() {
    await this.navigateToModule(this.smartMedicalMenu, this.hospitalModuleLink);
  }

  async goToPatientModule() {
    await this.navigateToModule(this.smartMedicalMenu, this.patientModuleLink);
  }

  async goToDataExchangeDC() {
    await this.navigateToModule(this.dataExchangeMenu, this.dataExchangeDCLink);
  }

  async goToPaymentsModule() {
    await this.navigateToModule(this.smartMedicalMenu, this.paymentsModuleLink);
  }

  /**
   * Refreshes the browser and logs out the user out. If the page is not fully reloaded in 2 seconds, the loading will be stopped
   */
  async logout() {
    await browser.refresh();
    await this.exitBtn.waitForClickable({ timeout: 5000, interval: 500 });
    await browser.execute(() => window.stop());
    await this.exitBtn.click();
  }
}

module.exports = topNavigationComponent;
