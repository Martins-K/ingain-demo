## ⚠️NB! This project is for demonstration purposes only, sensitive details are not shared due to security reasons (1. Login credentials, 2. Required hosts file configuration, 3. VPN connection details)⚠️

## 1. Clone this repository

`git clone git@git.smartmedical.eu:qa/automation-testing.git`

## 2. Install dependencies

`npm i --legacy-peer-deps` (--legacy-peer-deps is used to ensure compatibility of `eslint-config-airbnb-base` and `eslint` NPM packages)

## 3. Create a `.env` file in project root (use `.env.example`)

### SM Login Credentials

SM_USERNAME="your Smart Medical username" (`string` datatype)  
SM_PASSWORD="your Smart Medical password" (`string` datatype)

## 4. Run WDIO tests locally

Launching test scripts is done by executing an NPM script such as `npm run wdio:doctorExamination`

## 5. Run WDIO tests on the server

Navigate to http://at.smartmedical.eu and click "Run WDIO script!". The test results will be output in the console

## Project folder structure

- `./config`: Configuration files
- `./po`: Components and page objects classes
- `./tests`: UI tests

## Project structure description

This UI test automation project is built using the WebdriverIO test framework. It follows a Page Object Model (POM) structure to implement reusable components (`src\po\components` directory) and distinct page objects (`src\po\pages` directory) representing the logical structure of the application.

Test files are organized in the `src\tests` directory and grouped into suites. Suite definitions can be found in the `package.json` file, typically prefixed with `wdio:` followed by the module name. This modular hierarchy allows for better organization and management of tests, making it easier to maintain and scale the test suite.
