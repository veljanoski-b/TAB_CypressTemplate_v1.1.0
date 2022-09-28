# {project} Cypress Automated Test Suite

Valtech

## Introduction

This test suite allows testers to create and run automated tests for
web user interfaces and HTTP APIs.

## Prerequisites

### Cypress training

You will need a good understanding of using Cypress. Here are some resources to
help you learn how to use it:

- [Cypress getting started guide](https://docs.cypress.io/guides/overview/why-cypress)
- [Udemy course - Cypress: Web Automation Testing from Zero to Hero](https://www.udemy.com/course/cypress-web-automation-testing-from-zero-to-hero/)
- [Cypress Cucumber readme](https://github.com/TheBrainFamily/cypress-cucumber-preprocessor#readme)
- [Valtech Cypress documentation and advice](https://confluence.valtech.com/display/VI/Cypress.io)

### Cucumber

This suite uses Cucumber to run tests written in the Gherkin syntax.

Cucumber is primarily a collaboration tool which enables Behavior-Driven
Development (BDD) within your team. If your team are not following BDD
you can still use Cucumber to write tests, but be careful to follow the
syntax and style.

- [What is Cucumber?](https://cucumber.io/docs/guides/overview/)
- [Cucumber is a Collaboration tool](https://cucumber.io/blog/collaboration/the-worlds-most-misunderstood-collaboration-tool/)
- [Gherkin Syntax](https://cucumber.io/docs/gherkin/)
- [Writing better Gherkin](https://cucumber.io/docs/bdd/better-gherkin/)

## Getting started

- 1\. Install Visual Studio Code or another tool for writing JavaScript

- 2\. Install Node.js

  - Recommended version 14.17.3

- 3\. Go to the repository ({repo-url})

- 4\. Clone the repository to the local machine

- 5\. Update dependencies and install Cypress by running:  
   `npm ci`  
   This can take a while, without displaying any output. Please be patient.

- 6\. Open the top-level folder (the one containing this Readme) in Visual Studio Code, using File > Open Folder...

- 7\. If Visual Studio Code shows recommended extensions, chose to install them.

- 8\. If your test system is under GlobalProtect, configure the [Cypress proxy](https://docs.cypress.io/guides/references/proxy-configuration#Set-a-proxy-on-Linux-or-macOS), refer to [Getting Started](https://confluence.valtech.com/display/VI/Getting+started+with+Cypress) for Valtech specific proxy information.

- 9\. Start Cypress test runner for the 'test' environment using the following command:  
   `npx cypress open`  
   To specify a different environment use:  
   `npx cypress open -e env=<env>`  
   e.g. test or dev or acc

- 10\. Click on any feature file to run it

## Running tests

### Specify any secrets needed by your tests

Edit `cypress.env.json` and specify any secrets or values specific to your local environment. It should not be committed to source control.

### Running tests in the Cypress runner window

To run tests in the excellent interactive Cypress test runner:

```text
npx cypress open
```

To specify a different environment use:

```text
npx cypress open -e env=<env>
```

where `<env>` is one of the keys from config.js baseUrls (e.g. test, acc, prod)

If `-e` is not specified then env is assumed to be the first environment in config.js (usually `test`).

### Running tests headless

To run all tests headlessly in Chrome and produce a report:

```text
npm test
```

To specify a different envrironment

```text
npm run clean
npx cypress run -e env=<env> --browser chrome
npm run report
```

where `<env>` is one of the keys from config.js baseUrls

If `-e` is not specified then env is assumed to be the first environment in config.js (usually `test`).

### Running the Smoke tests

TODO - to be added

### Running a set of tests

TODO - to be added

### Viewing the report

Reports are created in `cypress\report\cucumber\cucumber-html-report` under a folder with the current date and time in its name.

## Writing tests

### How to create your first automated test using the BDD approach

1. Create a `<featureNameName>.feature` file in the features folder
2. Create a `<featureName>.js` file in the step_definitions folder
3. Write Gherkin scenarios in the feature file
4. Create step definitions for new steps

Please note that the `.feature` and `.js` step definition files are created with the same name. This helps people find step definition but is not mandatory. Feature files can use step definitions from any file.

### Running a single test while you work on it

Add the tag `@focus` above the scenario and save the file.

### Skipping tests which are still being written

Add the tag `@pending` or `@ignore` above the scenario to stop it being run in the Cypress Runner.

### Style guide

### Feature files

Feature files should live under cypress/integration, and have short clear names.

```text
cypress/integration/search.feature
```

### Scenarios

Test scenarios should be short with one When and one or two Thens.

Keep tests short and high level, so they convey the narrative of the user's goals and expectations.

A general guideline is to keep test scenarios to 7 lines or less.

Testing multiple assertions in one test:

```gherkin
  Then I see account registration confirmed
  And I can accept the new account email
  And I am able to login with the new email address and with password "<password>"
```

If the setup is time consuming then it is acceptable to perform multiple assertions in one test.

Note that the scenario will stop at the first failing assertion, and so you migth want to break these into separate scenarios.

### Step definitions

Step definition files:

- Each feature file has its own steps folder
- Steps must either be placed in a `<featureName>` folder, or on the `common` folder.
- Add `Steps` to the end of the file name
- By default use the feature file name in the steps file name

For example:

```text
cypress/integration/search.feature
cypress/integration/search/searchSelectors.js
cypress/integration/search/searchSteps.js
```

### Page element selectors

All selectors should be stored in their own file and not hard coded inside step commands. This makes the test code more readable and allows selectors to be re-used.

- Place the selectors next to the steps that use them if possible
- Name the file `{featureName}/{featureName}Selectors.js`.
- Common selectors can be placed in `common`

Selectors are used in steps like this:

```js
cy.get(selectors.login.emailField).type(email);
```

The selectors are stored as a javascript literal object like this:

```js
export const homeSelectors = {
  home: {
    menuItems: 'li.navigation__item',
    menuCategoryItem: 'ul.category__item li',
  },
};
```

| 💡  | _Trailing commas_                                                                                                                                                 |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     | Include commas at the end of all selector lists. This will reduce the number of diff lines in a pull request when you add or remove items to the end of the list. |

Using selectors instead of page object model functions means we can see all interactions and assertions in the step definitions.

Cypress works best when `get` and `should` commands are chained together. Cypress will auto-retry the `get` if the `should` fails.

| ⏰  | _Page Objects_                                                                                                                                                                                                                                                                                     |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     | You could introduce page objects if your project would benefit from re-usable methods for page specific actions. This might be the case if you have complex UI components. Alternatively you could consider creating re-usable custom Cypress commands to abstract complexity away from the steps. |

## How to...

### How to... share data between steps

Use [Cypress aliases](https://docs.cypress.io/guides/core-concepts/variables-and-aliases).

See account.feature, scenario 'Create Account' which stores an email address at the start and uses it later to login.

### How to... run automated accessbility checks

Use `cy.injectAxe` and `checkA11y`.

See the example in cypress\integration\accessibilityCheck.feature

To change the checks performed call cy.configureAxe. Refer to [Cypress-Axe](https://github.com/component-driven/cypress-axe)
and [AxeCore Tags](https://www.deque.com/axe/core-documentation/api-documentation/#user-content-axe-core-tags).

### How to... use xpath selectors

Use `cy.xpath`.

See xpathExample.feature.

### How to... run Lighthouse measurements

Use `cy.lighthouse`.

See lighthouseAudit.feature, and [README-Lighthouse.md](README-Lighthouse.md).

### How to... perform Visual Testing with Percy

Use `cy.percySnapshot`.

See visualChecks.feature, and [READNE-Visual.md](README-Visual.md).

### How to... create a data driven test

Use a `Scenario Outline` and provide rows of data in the `Examples` table.

See account.feature, scenario 'Login error'.

### How to... loop through multiple elements

Use `.each`.

See productList.feature, scenario 'Filter results on product list page', step 'The product list only shows products that cost less than {int}'.

### How to... run a nested step from another step

Use `runNestedStep` function.

See account.feature, scenario 'Create Account', step 'I am able to login with the new email address and with password {string}'. Refer to the documentation comments on the runNestedStep function.

### How to... read emails

Use `cy.makeTenMinuteEmailAddress` and `cy.getMostRecentTenMinuteEmail`.

See account.feature, scenario 'Create Account'.

### How to... store and use secrets

Store any secrets (user credentials etc) in `cypress.env.json`. It should not be committed to source control, and should be added to .gitignore.

Each user can edit `cypress.env.json` and specify any secrets or values specific to their local environment.

In a CI pipeline, call cypress with each secret specified on the command line in the format `--env <key1>=<secret-value-1>,<key2>=<secret-value-2>`.

e.g.

```bash
npx cypress run --browser chrome
                --env winerack-user=$(winerack-user),winerack-password=$(winerack-password)
```

[Using --env will override and values from other places](https://docs.cypress.io/guides/guides/environment-variables#Option-4-env) including cypress.env.json.

To use these in your test, use `Cypress.env('<key>')`.

e.g.

```js
const email = Cypress.env('winerack-user');
```

See cypress\integration\common\login\loginSteps.js 'I login with valid credentials' for an example.

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

Copyright (c) 2022 Valtech

This test suite is based on the [Valtech template for Automated Tests using Cypress and Cucumber](https://confluence.valtech.com/x/4gHqBQ)
