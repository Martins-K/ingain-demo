const { browser } = require("@wdio/globals");
const Pages = require("../../../po/pages/pages.index.js");
const { addSeverity, addDescription, addOwner, addParentSuite, step, addAttachment } = require("@wdio/allure-reporter");
const { doctorExaminationTestData } = require("../../../../testData/e2e/patient.doctorExamination.data.js");

describe("Patient module", async () => {
  before(async () => {
    await browser.url("");
    await Pages.loginPage.login();
  });

  after(async () => {
    await Pages.topNavigation.logout();
  });
  const doctorExaminationsPage = Pages.patientPage.doctorExaminationsPage;

  it("Create doctor examination", async () => {
    addDescription(`Checks whether the user can create a doctor examination`);
    addOwner("Martins Kruklis");
    addSeverity("normal");
    addParentSuite("UI tests");

    await step("Click 'Create doctor examination'", async () => {
      await Pages.patientPage.components.framesComponent.switchToMenuFrame();
      await doctorExaminationsPage.createNewLink.waitAndClick();
    });

    await step("Create a new doctor examination'", async (step) => {
      await step.step("Select patient", async () => {
        await doctorExaminationsPage.components.popupComponent.setPatient(doctorExaminationTestData.patient);
      });

      await step.step("Set complaints", async () => {
        await doctorExaminationsPage.complaintsField.waitAndSetValue(doctorExaminationTestData.complaints);
      });

      await step.step("Set conditions", async () => {
        await doctorExaminationsPage.conditionsField.waitAndSetValue(doctorExaminationTestData.conditions);
      });

      await step.step("Set anamnesis", async () => {
        await doctorExaminationsPage.anamnesisTemplateField.waitAndSelectByVisibleText(
          doctorExaminationTestData.anamnesisTemplateName,
        );
        const textarea = await doctorExaminationsPage.anamnesisField;
        await browser.waitUntil(async () => {
          return (await textarea.getValue()) !== "";
        });
      });

      await step.step("Set examinations", async () => {
        await doctorExaminationsPage.examinationsField.waitAndSetValue(doctorExaminationTestData.examinations);
      });

      await step.step("Set prescriptions", async () => {
        await doctorExaminationsPage.prescriptionsField.waitAndSetValue(doctorExaminationTestData.prescriptions);
      });

      await step.step("Set Status Localis", async () => {
        await doctorExaminationsPage.statusLocalisField.waitAndSetValue(doctorExaminationTestData.statusLocalis);
      });

      await step.step("Set diagnosis", async () => {
        await doctorExaminationsPage.diagnosisIcon[1].waitAndClick();
        await doctorExaminationsPage.setDiagnosis(doctorExaminationTestData.diagnosis);
      });

      await step.step("Set diagnosis comment", async () => {
        await doctorExaminationsPage.components.popupComponent.switchToActivePopup();
        await doctorExaminationsPage.diagnosisCommentField.waitAndSetValue(doctorExaminationTestData.diagnosisComment);
      });

      await step.step("Save form", async () => {
        await doctorExaminationsPage.saveBtn.waitAndClick();
        formId = await doctorExaminationsPage.getFormId();
      });

      await step.step("Close form", async () => {
        await doctorExaminationsPage.closeForm();
      });
    });
  });
});
