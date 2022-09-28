# TAB - Test Automation Bootstrap

A default Cypress automated test template for new projects at Valtech.

> **Template**
>
> - This folder is a _template_ and must be modified before it can be used
> - Please read this document carefully

## Introduction

This _template_ automated test suite is provided to help new projects get started and become successful faster.

First, please read the TAB documentation here [Test Automation Bootstrap](https://confluence.valtech.com/x/deNBBw).

To watch this test suite running tests follow [Running the example tests](#Running-the-example-tests) below.

Read the [Style Guide](./README-project.md#Style-guide) to understand the coding style and choices made when creating this suite.

Create your own project from this template by following the instructions [Creating your test suite from this template](#Creating-your-test-suite-from-this-template).

## Setup

- Install Visual Studio Code

- Install Node.js v14.17.3

  - This exact version has been extensively tested. Other versions have shown issues.

- Install npm

## Getting started

1. Download the TAB cypress template zip file from [Test Automation Bootstrap](https://confluence.valtech.com/display/VENG/TAB).).

2. Unzip the cypress template.

3. Make a note of the location of the top-level folder it creates (e.g. `valtech_default_automation_cypress_template...`) - this will be your test project folder.

4. Install node modules including Cypress

   - open a command prompt
   - cd to the top-level test project folder
   - Run this on the command line:
     `npm ci`
   - This can take a while, without displaying any output. Please be patient.

5. Open the top-level test project folder in Visual Studio Code, using `File > Open Folder...`

   - If asked, trust the authors of this folder

6. If Visual Studio Code shows recommended extensions, chose to install them.

7. If the website you want to test (SUT) is only available through the Valtech GlobalProtect VPN, configure the [Cypress proxy](https://docs.cypress.io/guides/references/proxy-configuration#Set-a-proxy-on-Linux-or-macOS), refer to [Getting Started](https://confluence.valtech.com/display/VI/Getting+started+with+Cypress) for Valtech specific proxy information.

8. Start Cypress test runner for the 'test' environment using the following command.

   - In VS Code, pick Terminal > New Terminal
   - On the command line run this command:  
     `npx cypress open`

9. Click on any of the example feature files to run the scenarios inside it, for example  
   `account.feature`

10. To run all tests headlessly in Chrome and produce a report, from the command line, run:
    `npm test`

    Reports are created in `cypress\report\cucumber\cucumber-html-report` under a folder with the current date and time in its name.

11. To run only Visual tests with Percy follow this file [README-Visual.md](README-Visual.md).

## Configuring the test suite for your project

This template needs to be updated for you to use it as the basis for your test suite.

1. Make a copy of the whole top level folder, or unzip the cypress template again to a second folder.

2. Create a source control repository to store your tests so they can be shared with the project team

   - Create a new source control repository for your suite and push your customised copy of these files to that repository.

3. Configure the BaseUrls for your application under test

   - Edit cypress\config\config.js, and update the baseUrls to match your systems.

4. Edit package.json

   - Change `repository.url` to your new repository URL.
   - Change `name`, `version`, and `description` to match your project.

5. Change the README for your project

   - Edit `README-project.md` (this will become the README for your project)
     - Replace `{project}` with your project name
     - Replace `{repo-url}` with the URL to the new repository
     - Finally, when you have read the rest of this readme...
       - Delete _this_ `README.md` (which describes the template)
       - Rename `README-project.md` to `README.md`

6. Ensure you have a .gitignore file in the root project folder. Note the template comes with a .gitignore file, but it is a hidden file so you might need to change settings or use `ls -a` to see it. It should contain:

```text
node_modules/
cypress/report/
cypress.env.json
```

7. Write the tests!

   - Create or edit the features, scenarios, step definitions, and page selectors to match your application.

8. Remove the example feature files, steps definitions, and page selectors you do not need.

## Cypress training

- Read the [Cypress getting started guide](https://docs.cypress.io/guides/overview/why-cypress)
- Udemy course [Cypress: Web Automation Testing from Zero to Hero](https://www.udemy.com/course/cypress-web-automation-testing-from-zero-to-hero/)
- [Cypress Cucumber readme](https://github.com/TheBrainFamily/cypress-cucumber-preprocessor#readme)
- [Valtech Cypress documentation and advice](https://confluence.valtech.com/display/VI/Cypress.io)

## How to organize the tests

- Put your feature files in cypress/integration/
  - Example: cypress/integration/account.feature
- The .feature file will use steps definitions from a directory with the same name as your .feature file. The javascript files containing the step definitions can have other names if you want to break them into different concerns.
  - Example: Assuming the feature file is in cypress/integration/account.feature , as proposed above, the preprocessor will read all the files inside cypress/integration/account/, hence: cypress/integration/account/account.js (or any other .js file in the same path)
- before/beforeEach/after/afterEach hooks related to that particular feature can be put here.
- Reusable step definitions can be created in cypress/integration/common/
  - Example: cypress/integration/common/commonSteps.js
- Global before/beforeEach/after/afterEach hooks can be put here.
  - Example: cypress/integration/common/hooks.js

## Example tests

When you first open the default automation template, Everything under integration and fixtures are examples.

The fully automated example tests are:

- cypress\integration\account.feature
- cypress\integration\productList.feature
- cypress\integration\accessibilityCheck.feature
- cypress\integration\lighthouseAudit.feature
- cypress\integration\xpathExample.feature

## Running the example tests

Make sure to perform the [How to get started](#How-to-get-started-with-the-default-Cypress-template) steps above.

First, edit `cypress.env.json` and set the winerack-user and winerack-password to a valid username and password for the website under test. The template uses cypress.env.json to hold local secrets. It should not be committed to source control.

To run the example tests in the Cypress test runner window

`npx cypress open`

To specify a different environment use:

`npx cypress open -e env=<env>`

e.g. test or acc or prod (see the values in `config/config.js`)

To run headless and generate a report:

`npm test`

Then view the report which will be stored in `cypress\report\cucumber\cucumber-html-report` under a folder with the current date and time in its name.

## Further reading

- Gherkin
  - The format for feature files is well described in the [Gherkin Reference](https://cucumber.io/docs/gherkin/reference/)
- JavaScript
  - If you want to improve your knowledge in JavaScript, I can recommend a [good tutorial](https://javascript.info/)
- Cypress
  - The [Cypress documentation](https://docs.cypress.io/api) is respected in the industry and contains lots of useful information.
  - Note that this template uses Cucumber (Feature, Scenario, Given, When, Then) instead of Mocha (describe, context, it) so be aware that some examples in the Cypress documentation will need altering before trying in this template.
  - [Cypress Cucumber readme](https://github.com/TheBrainFamily/cypress-cucumber-preprocessor#readme)
- [Test Automation Best Practices](https://confluence.valtech.com/display/VENG/Test+Automation+Best+Practices)

## Troubleshooting

Please refer to:

https://confluence.valtech.com/display/VI/Troubleshooting+Cypress
