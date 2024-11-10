const PatientPage = require("./patient/patient.index.js");
const patientPageInstance = new PatientPage();

const DoctorExaminations = require("./patient/doctorExaminations.page.js");
const doctorExaminationsInstance = new DoctorExaminations();

const LoginPage = require("./login/login.page.js");
const loginPageInstance = new LoginPage();

const TopNavigationComponent = require("../components/common/topnavigation.component.js");
const topNavigationComponentInstance = new TopNavigationComponent();

module.exports = {
  patientPage: patientPageInstance,
  topNavigation: topNavigationComponentInstance,
  doctorExaminationsPage: doctorExaminationsInstance,
  loginPage: loginPageInstance,
};
