class Popup {
  get popupFrame() {
    return (counter) => $(`//iframe[contains(@id, '_popup_${counter !== undefined ? `${counter.toString()}` : ""}')]`);
  }

  get diagnosisPopup() {
    return $("//iframe[contains(@src,'classificator_diagnosis')]");
  }

  get vaccinesPopup() {
    return $("//iframe[contains(@src,'vak_title')]");
  }

  get templatePopup() {
    return $("//iframe[contains(@src,'template')]");
  }

  get billPopup() {
    return $("//iframe[contains(@src, 'findPatientForBilling')]");
  }

  get cancelVFPopup() {
    return $("//iframe[contains(@src,'cancel')]");
  }

  get patientSearchPopup() {
    return $("//iframe[@id='patient_search_frame']");
  }

  get stateRegisteredVaccinesPopup() {
    return $("//table[contains(@id,'ev_registered_state')]");
  }

  get closePopupBtn() {
    return $("//i[@onclick='$_popup.close()']");
  }

  get searchPatientField() {
    return $("//input[@value = 'Meklēt pacientu']");
  }

  get firstPatient() {
    return $("//table[@class='_table _tableNopadding']//tbody//tr[1]");
  }

  get patientPersonalCodeField() {
    return $("//input[@id='patient_search_pk']");
  }

  get findPatientBtn() {
    return $("//input[@value='Meklēt pacientu']");
  }

  get saveFormBtnField() {
    return $("//input[@name = 'saveData']");
  }

  get firstTemplatesItem() {
    return $("//table[@id='template_list']//tbody//tr[1]");
  }

  get searchParamsField() {
    return $("//input[@id='srch_param']");
  }

  /**
   * Switches to popup specified by the ID in the popup's name (i.e., "_popup_3" ).
   * @param {number} index - Popup frame by index in the name attribute
   */
  async switchToPopup(index) {
    await browser.switchToFrame(null);
    await browser.waitUntil(
      async () => {
        return await this.popupFrame(index).isDisplayed();
      },
      { timeout: 5000 },
    );
    await browser.switchToFrame(await this.popupFrame(index));
  }

  /**
   * Switches to the popup with the highest index on the page
   */
  async switchToActivePopup() {
    await browser.switchToFrame(null);
    const popups = await $$("//iframe[contains(@name,'_popup_')]");
    const popupNames = [];
    for (const popup of popups) {
      const name = await popup.getAttribute("name");
      popupNames.push(name);
    }
    const popupNumbers = popupNames.map((name) => parseInt(name.match(/\d+/)[0]));
    popupNumbers.sort((a, b) => a - b);
    const sortedPopupNumbers = popupNumbers.map((number) => number.toString());
    const lastIndex = sortedPopupNumbers[sortedPopupNumbers.length - 1];

    await browser.waitUntil(
      async () => {
        return await this.popupFrame(lastIndex).isDisplayed();
      },
      { timeout: 5000 },
    );
    await browser.switchToFrame(await this.popupFrame(lastIndex));
  }

  async switchToDiagnosisPopup() {
    await browser.switchToFrame(null);
    await browser.switchToFrame(await this.diagnosisPopup);
  }

  async switchToVaccinesPopup() {
    await browser.switchToFrame(null);
    await browser.switchToFrame(await this.vaccinesPopup);
  }

  async switchToStateRegisteredVaccinesPopup() {
    await browser.switchToFrame(null);
    await browser.switchToFrame(await this.stateRegisteredVaccinesPopup);
  }

  async switchToPatientSearchPopup() {
    await browser.switchToFrame(null);
    await browser.switchToFrame(await this.patientSearchPopup);
  }

  async closePopupById(id) {
    await browser.switchToFrame(null);
    await this.switchToPopup(id);
    await browser.waitUntil(async () => await this.closePopupBtn.isDisplayed(), { timeout: 3000 });
    await this.closePopupBtn.click();
  }

  async closeActivePopup() {
    await this.switchToActivePopup();
    await browser.waitUntil(async () => await this.closePopupBtn.isDisplayed(), { timeout: 3000 });
    await this.closePopupBtn.click();
  }

  async clickSearchPatient() {
    await this.switchToPopup();
    await this.searchPatientField.waitAndClick();
  }

  async setPatientPersonalCode(value) {
    await this.switchToActivePopup();
    await this.patientPersonalCodeField.waitAndSetValue(value);
  }

  async clickFindPatientBtn() {
    await this.switchToActivePopup();
    await this.findPatientBtn.waitAndClick();
  }

  async selectFirstPatient() {
    await this.switchToActivePopup();
    await this.firstPatient.waitAndClick();
  }

  async setPatient(value) {
    await this.setPatientPersonalCode(value);
    await this.clickFindPatientBtn();
    await this.selectFirstPatient();
  }

  async clickSaveBtn() {
    await this.switchToActivePopup();
    await this.saveFormBtnField.waitAndClick();
  }

  async selectFirstTemplate() {
    await browser.switchToFrame(null);
    await browser.switchToFrame(await this.templatePopup);
    await this.firstTemplatesItem.waitAndClick();
  }

  async goToTemplate(value) {
    const selector = $(
      `//div[contains(text(), '${value}')]/following::img[@src='/imgCollector.php?med_dnl_ev_episode:find_1.png']`,
    );
    await selector.waitAndClick();
  }

  async switchToBillPopup() {
    await browser.switchToFrame(null);
    await browser.waitUntil(() => this.billPopup.isExisting(), {
      timeout: 3000,
    });
    await browser.switchToFrame(await this.billPopup);
  }

  async switchToCancelVFPopup() {
    await browser.switchToFrame(null);
    await browser.waitUntil(() => this.cancelVFPopup.isExisting(), {
      timeout: 2000,
    });
    await browser.switchToFrame(await this.cancelVFPopup);
  }

  async switchToFrameBySrc(src) {
    const iframeSelector = `//iframe[contains(@src, '${src}')]`;

    await browser.waitUntil(
      async () => {
        await browser.switchToFrame(null);
        return await $(iframeSelector).isExisting();
      },
      { timeout: 7000, interval: 1000 },
    );

    await browser.switchToFrame(await $(iframeSelector));
  }
}

module.exports = Popup;
