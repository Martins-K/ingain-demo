// Import Patient module related pages to make them as properties of the Patient class
const DoctorExaminationsPage = require("./doctorExaminations.page");

// Import common component class used in the patient module to make it as the property of the Patient class
const Components = require("../../components/common/common.index");

class PatientPage {
  // Initialize objects for various pages and components used in the patient module
  constructor() {
    this.doctorExaminationsPage = new DoctorExaminationsPage();
    this.components = new Components();
  }

  // Defining selectors and actions in the Patient base page
  get createPatientLink() {
    return $("//a[@id='_create_patient_link']");
  }

  //New patient popup selectors
  get patientPersonalCode() {
    return $("//input[@id='pk']");
  }

  get patientName() {
    return $("//input[@id='name']");
  }

  get patientSurname() {
    return $("//input[@id='surname']");
  }

  get patientGender() {
    return $("//select[@id='dzimums']");
  }

  get patientGender() {
    return $("//select[@id='dzimums']");
  }

  get patientDOB() {
    return $("//input[@id='birthday']");
  }

  get patientPhone() {
    return $("//input[@id='patient_phone6']");
  }

  get patientEmail() {
    return $("//input[@id='patient_email5']");
  }

  get patientLegalAddress() {
    return $("//textarea[@id='adrese']");
  }

  get patientPhysicalAddress() {
    return $("//textarea[@id='fact_adrese']");
  }

  get patientContactPerson() {
    return $("//input[@id='contact_person']");
  }

  get patientDocCountry() {
    return $("//select[@id='doc_country']");
  }

  get patientDocType() {
    return $("//select[@id='last_documentType']");
  }

  get patientDocSeries() {
    return $("//input[@id='last_documentNumber']");
  }

  get patientDocIssueDate() {
    return $("//input[@id='doc_issued']");
  }

  get patientDocExpiry() {
    return $("//input[@id='doc_expired']");
  }

  get patientWorkplace() {
    return $("//input[@id='darbavieta']");
  }

  get patientJobTitle() {
    return $("//input[@id='amats']");
  }

  get saveBtn() {
    return $("//input[@id='saveButon']");
  }

  get patientExistingError() {
    return $("//b[contains(text(),'Pacients ar šo personas kodu jau eksistē!')]");
  }

  get patientNotes() {
    return $("//textarea[@id='notes']");
  }

  get patientInsurer() {
    return $("//select[@id='last_IC_id']");
  }

  get patientPolicyNo() {
    return $("//input[@id='polises_nr']");
  }

  get patientPolicyExpiry() {
    return $("//input[@id='polise_expire']");
  }

  get patientInsuranceNotes() {
    return $("//textarea[@id='polise_notes']");
  }

  get healthFactsIcon() {
    return $("//img[contains(@src,'pat-facts-bttn.png')]");
  }

  /**
   * Goes to 'Pacients' landing page
   */
  async goTo() {
    await this.components.topNavigationComponent.goToPatientModule();
  }

  async openNeurologistExaminations() {
    await this.components.framesComponent.switchToMenuFrame();
    await $("//a[@id='window.list_med_neurolog.php']").waitAndClick();
  }

  async clickCreatePatientLink() {
    await this.components.framesComponent.switchToMenuFrame();
    await this.createPatientLink.waitAndClick();
  }

  /**
   * Sets the patient's personal code
   * @param {string} personalCode - Patient's personal code, e.g. "109402847367"
   */
  async setPatientPersonalCode(personalCode) {
    await this.components.popupComponent.switchToActivePopup();
    await this.patientPersonalCode.waitAndSetValue(personalCode);
  }

  /**
   * Sets the patient's name
   * @param {string} firstName - Patient's first name, e.g., "Agris"
   */
  async setPatientName(firstName) {
    await this.components.popupComponent.switchToActivePopup();
    await this.patientName.waitAndSetValue(firstName);
  }

  /**
   * Sets the patient's surname
   * @param {string} lastName - Patient's last name, e.g., "Liepa"
   */
  async setPatientLastName(lastName) {
    await this.components.popupComponent.switchToActivePopup();
    await this.patientSurname.waitAndSetValue(lastName);
  }

  /**
   * Sets the patient's gender
   * @param {string} gender - Patient's gender, "Vīrietis"
   */
  async setPatientGender(gender) {
    await this.components.popupComponent.switchToActivePopup();
    await this.patientGender.waitForDisplayed();
    await this.patientGender.selectByAttribute("title", gender);
  }

  /**
   * Sets the patient's date of birth
   * @param {string} dateOfBirth - Patient's date of birth in format "DD.MM.YYYY", e.g., "01.01.2001"
   */
  async setPatientDOB(dateOfBirth) {
    await this.components.popupComponent.switchToActivePopup();
    await this.patientDOB.waitAndSetValue(dateOfBirth);
  }

  /**
   * Sets the patient's legal address
   * @param {string} legalAddress - Patient's legal address
   */
  async setPatientLegalAddress(legalAddress) {
    await this.components.popupComponent.switchToActivePopup();
    await this.patientLegalAddress.waitAndSetValue(legalAddress);
  }

  /**
   * Sets the patient's physical address
   * @param {string} physicalAddress - Patient's physical address
   */
  async setPatientPhysicalAddress(physicalAddress) {
    await this.components.popupComponent.switchToActivePopup();
    await this.patientPhysicalAddress.waitAndSetValue(physicalAddress);
  }

  /**
   * Sets the patient's telephone no.
   * @param {string} phoneNo - Patient's telephone no.
   */
  async setPatientPhoneNo(phoneNo) {
    await this.components.popupComponent.switchToActivePopup();
    await this.patientPhone.waitAndSetValue(phoneNo);
  }

  /**
   * Sets the patient's email
   * @param {string} email - Patient's email
   */
  async setPatientEmail(email) {
    await this.components.popupComponent.switchToActivePopup();
    await this.patientEmail.waitAndSetValue(email);
  }

  /**
   * Sets the patient's contact person
   * @param {string} contactPerson - Patient's contact person
   */
  async setPatientContactPerson(contactPerson) {
    await this.components.popupComponent.switchToActivePopup();
    await this.patientContactPerson.waitAndSetValue(contactPerson);
  }

  /**
   * Sets issuing country of the patient's ID document
   * @param {string} issuingCountry - Issuing country
   */
  async setPatientIssuingCountry(issuingCountry) {
    await this.components.popupComponent.switchToActivePopup();
    await this.patientDocCountry.waitAndSelectByVisibleText(issuingCountry);
  }

  /**
   * Sets doc type for the patient's ID document
   * @param {string} docType - Doc type
   */
  async setPatientDocType(docType) {
    await this.components.popupComponent.switchToActivePopup();
    await this.patientDocType.waitAndSelectByVisibleText(docType);
  }

  /**
   * Sets doc series for the patient's ID document
   * @param {string} docSeries - Doc series
   */
  async setPatientDocSeries(docSeries) {
    await this.components.popupComponent.switchToActivePopup();
    await this.patientDocSeries.waitAndSetValue(docSeries);
  }

  /**
   * Sets issuing date of the patient's ID document
   * @param {string} issuingDate - Issuing date in format "DD.MM.YYYY"
   */
  async setPatientDocIssueDate(issuingDate) {
    await this.components.popupComponent.switchToActivePopup();
    await this.patientDocIssueDate.waitAndSetValue(issuingDate);
  }

  /**
   * Sets expiry date of the patient's ID document
   * @param {string} expiryDate - Expiry date in format "DD.MM.YYYY"
   */
  async setPatientDocExpiryDate(expiryDate) {
    await this.components.popupComponent.switchToActivePopup();
    await this.patientDocExpiry.waitAndSetValue(expiryDate);
  }

  /**
   * Sets workplace in the patient card
   * @param {string} workplace - Patient's workplace
   */
  async setPatientWorkplace(expiryDate) {
    await this.components.popupComponent.switchToActivePopup();
    await this.patientWorkplace.waitAndSetValue(expiryDate);
  }

  /**
   * Sets job title in the patient card
   * @param {string} jobTitle - Patient's job title
   */
  async setPatientJobTitle(jobTitle) {
    await this.components.popupComponent.switchToActivePopup();
    await this.patientJobTitle.waitAndSetValue(jobTitle);
  }

  /**
   * Sets notes in the patient card
   * @param {string} notes - Patient's notes
   */
  async setPatientNotes(notes) {
    await this.components.popupComponent.switchToActivePopup();
    await this.patientNotes.waitAndSetValue(notes);
  }

  /**
   * Sets the insurance company in the patient card
   * @param {string} insurer - Insurance company
   */
  async setPatientInsurer(insurer) {
    await this.components.popupComponent.switchToActivePopup();
    await this.patientInsurer.waitAndSelectByVisibleText(insurer);
  }

  /**
   * Sets the insurance policy number in the patient card
   * @param {string} policyNo - Insurance policy number
   */
  async setPatientInsurancePolicyNo(insurance) {
    await this.components.popupComponent.switchToActivePopup();
    await this.patientPolicyNo.waitAndSetValue(insurance);
  }

  /**
   * Sets the insurance policy expiry date in the patient card
   * @param {string} policyExpiry - Insurance policy number
   */
  async setPatientInsurancePolicyExpiry(policyExpiry) {
    await this.components.popupComponent.switchToActivePopup();
    await this.patientPolicyExpiry.waitAndSetValue(policyExpiry);
  }

  /**
   * Sets the insurance notes in the patient card
   * @param {string} insuranceNotes - Insurance notes
   */
  async setPatientInsuranceNotes(insuranceNotes) {
    await this.components.popupComponent.switchToActivePopup();
    await this.patientInsuranceNotes.waitAndSetValue(insuranceNotes);
  }

  /**
   * Clicks save button
   */
  async clickSaveBtn() {
    await this.components.popupComponent.switchToActivePopup();
    await this.saveBtn.waitForDisplayed();
    await this.saveBtn.scrollIntoView();
    await this.saveBtn.click();
  }

  /**
   * Retrieves the form ID of the newly created patient
   * @returns {Promise<string>} - Form ID
   */
  async getPatientId() {
    await this.components.popupComponent.switchToActivePopup();
    const selector = await $("//input[@id='id']");
    await selector.waitForExist();
    await browser.waitUntil(async () => {
      const id = await selector.getAttribute("value");
      return id !== "0";
    });
    const id = await selector.getAttribute("value");
    return id;
  }

  /**
   * Closes the patient card
   */
  async closePatientCard() {
    await this.components.popupComponent.closeActivePopup();
  }

  async openPatientCard(personalCode) {
    await this.components.framesComponent.switchToContentFrame();
    await $("//input[@id='header-search']").waitAndSetValue(personalCode);
    await browser.keys("Enter");
  }

  async addHealthFact(date, type, title) {
    await this.components.framesComponent.switchToClientBillFrame();
    await this.healthFactsIcon.waitAndClick();
    await $$("//div[@class='dropbtn-wrapper']")[1].waitAndClick();
    await $("//div[contains(text(),'Pievienot jaunu')]").waitAndClick();
    await this.components.popupComponent.switchToActivePopup();
    await $("//input[@id='fact_date']").waitAndSetValue(date);
    await $("//div[@id='icon_select']").waitAndClick();
    await $(`//a[label[text()="${type}"]]`).waitForClickable();
    await $(`//a[label[text()="${type}"]]`).click();
    await $("//textarea[@id='notes']").waitAndSetValue(title);
    await $("//input[@name='saveData']").waitAndClick();
  }

  patientMedFormSelectors = {
    prescriptions: "//a[@id='window.med_prescription_ev.list.php?type=0']",
    referrals: "//a[@id='window.med_referral_ev_listing_by_patient.php']",
    vaccinationFacts: "//a[@href='/dgv/screens/med_ev_potes/window.med_ev_potes.php?filter[status]=1']",
    eDocuments: "//a[@id='window.med_ev_document.php']",
    labReferrals: "//a[@id='_lab_tests_referral.php']",
    patientDocuments: "//a[@id='window.list_patient_document.php']",
  };

  async goToPatientForm(formName) {
    await this.components.framesComponent.switchToMenuFrame();
    await $(this.patientMedFormSelectors[formName]).waitAndClick();
  }
}

module.exports = PatientPage;
