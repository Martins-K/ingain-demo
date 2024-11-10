const Frames = require("./frames.component");

class FiltersComponent {
  constructor() {
    this.frames = new Frames();
  }

  get dateFromField() {
    return $("//input[@id='date_from']");
  }

  get dateToField() {
    return $("//input[@id='date_to']");
  }

  get createdFromField() {
    return $("//input[@id='created_from']");
  }

  get createdToField() {
    return $("//input[@id='created_to']");
  }

  get filterButton() {
    return $("//input[@name='_filterDo']");
  }

  get filterResetButton() {
    return $("//input[@name='_filterReset']");
  }

  get firstListItem() {
    return $("//table[contains(@id, 'dgv')]//tbody/tr[1]");
  }

  get userField() {
    return $("//input[@id='user_content']");
  }

  get showDeletedCheckbox() {
    return $("//input[@id='show_deleted']");
  }

  get patientPersonalCode() {
    return $("//input[@id='patient']");
  }

  /**
   * Sets a date in the 'Date from' and 'Date to' fields
   * @param {string} dateFrom - Date in format "DD.MM.YYY"
   * @param {string} dateTo - Date in format "DD.MM.YYY"
   */
  async setDateFromTo(dateFrom, dateTo) {
    await this.frames.switchToContentFrame();
    await this.dateFromField.waitAndSetValue(dateFrom);
    await this.dateToField.waitAndSetValue(dateTo);
  }

  /**
   * Sets a date in the 'Created from' and 'Created to' fields
   * @param {string} createdFrom - Date in format "DD.MM.YYY"
   * @param {string} createdTo - Date in format "DD.MM.YYY"
   */
  async setCreatedFromTo(createdFrom, createdTo) {
    await this.frames.switchToContentFrame();
    await this.createdFromField.waitAndSetValue(createdFrom);
    await this.createdToField.waitAndSetValue(createdTo);
  }

  /**
   * Sets a date in the 'Created to' using selector
   * @param {string} selector - Selector (CSS/xPath)
   * @param {string} value - Value to input
   */
  async setValueByInputId(selector, value) {
    await this.frames.switchToContentFrame();
    await $(`//input[@id='${selector}']`).waitAndSetValue(value);
    await this.filter();
  }

  // async selectAllOptionsForLabel(label) {
  //   const inputElement = await $(
  //     `//td[contains(text(),'${label}')]/following-sibling::td//input[@value='Sāciet ievadīt tekstu']`,
  //   );
  //   await inputElement.waitAndClick();
  //   const items = await $$(`//td[contains(text(),'${label}')]/following-sibling::td//li[@class='active-result']`);
  //   await this.frames.switchToContentFrame();
  //   for (const item of items) {
  //     await inputElement.waitAndClick();
  //     await item.scrollIntoView();
  //     await item.waitAndClick();
  //   }
  // }

  async selectOptionsForLabel(label, options = []) {
    const inputElement = await $(
      `//td[contains(text(),'${label}')]/following-sibling::td//input[@value='Sāciet ievadīt tekstu']`,
    );
    await inputElement.waitAndClick();
    const items = await $$(`//td[contains(text(),'${label}')]/following-sibling::td//li[@class='active-result']`);
    await this.frames.switchToContentFrame();
    for (const item of items) {
      const itemText = await item.getText();
      if (options.length === 0 || options.includes(itemText)) {
        await inputElement.waitAndClick();
        await item.scrollIntoView();
        await item.waitAndClick();
      }
    }
  }

  /**
   * Performs the filtering
   */
  async filter() {
    await this.frames.switchToContentFrame();
    await this.filterButton.waitAndClick();
  }

  /**
   * Resets the filtering
   */
  async resetFilter() {
    await this.frames.switchToContentFrame();
    await this.filterResetButton.waitAndClick();
  }

  /**
   * Clicks the first item from the table
   */
  async clickFirstListItem() {
    await this.frames.switchToContentFrame();
    await this.firstListItem.waitAndClick();
  }

  /**
   * Sets user field
   * @param {string} user - SM user name
   */
  async setUserField(user) {
    await this.frames.switchToContentFrame();
    await this.userField.waitAndSetValue(user);
  }

  /**
   * Ticks the checkbox which filters deleted items
   */
  async clickShowDeletedItemsCheckBox() {
    await this.frames.switchToContentFrame();
    await this.showDeletedCheckbox.waitAndClick();
  }

  /**
   * Searches by patient personal code
   * @param {string} personalCode - Patient personal code
   */
  async searchByPatientPersonalCode(personalCode) {
    await this.frames.switchToContentFrame();
    await this.patientPersonalCode.waitAndSetValue(personalCode);
    await this.filter();
  }
}

module.exports = FiltersComponent;
