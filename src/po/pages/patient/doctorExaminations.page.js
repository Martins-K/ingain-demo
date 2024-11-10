const Components = require("../../components/common/common.index");

class DoctorExaminationPage {
  constructor() {
    this.components = new Components();
  }

  get doctorExaminationsLink() {
    return $("//a[@id='window.list.med_inspection.php']");
  }

  get startDateField() {
    return $("//input[@id='date_from']");
  }

  get endDateField() {
    return $("//input[@id='date_to']");
  }

  get doctorField() {
    return $("//input[@id='doctor']");
  }

  get diagnosisField() {
    return $("//input[@id='diagnosis']");
  }

  get listFirstItemField() {
    return $("//table[@id='_dgv_screens_med_inspection_window_list_med_inspection_phpmed_inspection']/tbody/tr[1]");
  }

  get patientField() {
    return $("//input[@id='patient']");
  }

  get createNewLink() {
    return $("//a[contains(@onclick,'med_inspection')]");
  }

  get complaintsField() {
    return $("//textarea[@id='complaints']");
  }

  get conditionsField() {
    return $("//textarea[@id='conditions']");
  }

  get anamnesisTemplateField() {
    return $("//select[@id='med_inspection_history']");
  }

  get anamnesisField() {
    return $("//textarea[@id='history']");
  }

  get examinationsField() {
    return $("//textarea[@id='examinations']");
  }

  get prescriptionsField() {
    return $("//textarea[@id='prescriptions']");
  }

  get statusLocalisField() {
    return $("//textarea[@id='status_localis']");
  }

  get diagnosisCommentField() {
    return $("//textarea[@id='diagnoses[comment]']");
  }

  get diagnosisIcon() {
    return $$("//img[contains(@src,'classificator_diagnosis')]");
  }

  get saveBtn() {
    return $("//input[@name='saveData']");
  }

  get printBtn() {
    return $("//input[@name='saveAndPrint']");
  }

  async setDiagnosis(diagnosis) {
    await this.components.popupComponent.switchToActivePopup();
    await $("//input[@id='title']").waitAndSetValue(diagnosis);
    await browser.keys("Enter");
    const firstDiagnosis = $("//table[contains(@id,'diagnosis')]//tbody//tr");
    await firstDiagnosis.waitAndClick();
  }

  /**
   * Retrieves the form ID of the newly created patient
   * @returns {Promise<string>} - Form ID
   */
  async getFormId() {
    await this.components.popupComponent.switchToActivePopup();
    const selector = await $("//div[@id='sm_filters_block']");
    await selector.waitForExist();
    await browser.waitUntil(async () => {
      const id = await selector.getAttribute("data-object");
      return id !== "0";
    });
    const id = await selector.getAttribute("data-object");
    return id;
  }

  async openFormById(id) {
    const formNumber = $(`//table[contains(@id,'med_inspection')]//tbody//tr[contains(@id,'item-${id}')]`);
    await this.components.framesComponent.switchToContentFrame();
    await formNumber.waitAndClick();
  }

  /**
   * Opens doctor examination page from the Patient base page
   */
  async openPage() {
    await this.components.framesComponent.switchToMenuFrame();
    await this.doctorExaminationsLink.waitForExist();
    await this.doctorExaminationsLink.scrollIntoView();
    await this.doctorExaminationsLink.click();
  }

  /**
   * Sets the start date filter in the doctor examination page filter section
   * @param {string} value - Date in format DD-MM-YYYY
   */
  async setStartDateFilter(value) {
    await this.components.framesComponent.switchToContentFrame();
    await this.startDateField.waitAndSetValue(value);
  }

  /**
   * Sets the end date in the doctor examination page filter section
   * @param {string} value - Date in format DD-MM-YYYY
   */
  async setEndDateFilter(value) {
    await this.components.framesComponent.switchToContentFrame();
    await this.endDateField.waitAndSetValue(value);
  }

  /**
   * Sets the doctor in the doctor examination page filter section
   * @param {string} value - Doctor's name
   */
  async setDoctorFilter(value) {
    await this.components.framesComponent.switchToContentFrame();
    await this.doctorField.waitAndSetValue(value);
  }

  /**
   * Sets the patient in the doctor examination page filter section
   * @param {string} value - patient name/surname OR patient ID
   */
  async setPatientFilter(value) {
    await this.components.framesComponent.switchToContentFrame();
    await this.patientField.waitAndSetValue(value);
  }

  /**
   * Clicks 'Filtrēt' button to perform the filtering
   */
  async filter() {
    this.components.filtersComponent.filter();
  }

  /**
   * Clicks 'Filtrēt' button to perform the filtering
   */
  async openListFirstItem() {
    await this.listFirstItemField.waitForExist();
    await this.listFirstItemField.click();
  }

  /**
   * Close the opened doctor examination form
   */
  async closeForm() {
    await this.components.popupComponent.closeActivePopup();
  }
}

module.exports = DoctorExaminationPage;
