import { getBaseUrl } from '../config/config';

Cypress.Commands.add('visitHomePage', () => {
  cy.visit(getBaseUrl());
});

// Cypress.Commands.add('visitPage', (relativeUrl) => {
//   cy.visit(getUrl(relativeUrl));
// });

Cypress.Commands.add('checkAriaCheckbox', (elementSelector) => {
  cy.get(elementSelector)
    .invoke('attr', 'aria-checked')
    .then((isChecked) => {
      if (isChecked == 'false') {
        cy.get(elementSelector).click();
      }
    });
});

Cypress.Commands.add('clearAriaCheckbox', (elementSelector) => {
  cy.get(elementSelector)
    .invoke('attr', 'aria-checked')
    .then((isChecked) => {
      if (isChecked == 'true') {
        cy.get(elementSelector).click();
      }
    });
});

Cypress.Commands.add('trace', (message, label = null) => {
  if (!label || label === undefined || label === null) {
    label = '';
  } else {
    label = label + ' = ';
  }
  if (typeof message === 'string') {
    cy.task('log', `       🔍 [Trace: ${label}${message}]`, { log: false });
    Cypress.log({
      name: 'trace',
      displayName: 'trace',
      message: '🔍' + label + message,
      type: 'child',
      scaled: true,
      consoleProps: () => {
        // return an object which will
        // print to dev tools console on click
        return {
          Command: 'trace',
          Label: label,
          Message: message,
        };
      },
    });
  } else {
    cy.task('log', `       🔍 [Trace: ${label}`, { log: false });
    cy.task('log', message, { log: false });
    cy.task('log', `       ]`, { log: false });
    Cypress.log({
      name: 'trace',
      displayName: 'trace',
      message: '🔍' + label + inspect(message),
      type: 'child',
      scaled: true,
      consoleProps: () => {
        // return an object which will
        // print to dev tools console on click
        return {
          Command: 'trace',
          Label: label,
          'Object as string': inspect(message, {
            depth: 10,
            maxStringLength: 100000,
          }),
          Object: message,
        };
      },
    });
  }
});

// API commands
Cypress.Commands.add('getGenderProbabilityFromName', (parameter) => {
  let callURL = '/';
  if (parameter && parameter.length > 2) {
    callURL = `/?name=${parameter}`;
  }

  cy.request({
    method: 'GET',
    url: Cypress.env('apiURL') + callURL,
    /**
     * failOnStatusCode set to false to have a opportunity test negative scenario
     * and check that API handles errors correctly
     */
    failOnStatusCode: false,
  }).then((call) => call);
});

Cypress.Commands.add('returnRandomFirstName', () => {
  cy.request({
    method: 'GET',
    url: Cypress.env('nameFakeUrl'),
    json: true,
  }).then((call) => {
    return parseFirstName(call.body.name);
  });
});

/**
 * parseFirstName function is emulating some app microservice which need to do something with data
 * before proceed with next call
 */
function parseFirstName(fullName) {
  return fullName.replace('Miss ', '')
    .replace('Mrs. ', '')
    .replace('Ms. ', '')
    .replace('Mr. ', '')
    .replace('Dr. ', '')
    .replace('Prof. ', '')
    .split(' ')[0];
}



// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// import {baseURLs, testData} from '../config/config'

// Cypress.Commands.add("login", () => {
//     const env = Cypress.env('env');
//     const brand = Cypress.env('brand');
//     const url = baseURLs[brand][env];
//     cy.visit(url);
//     cy.getCookie('.ASPXAUTHCST-login')
//     .then((authenticationCookie) => {
//         if (authenticationCookie === null) {
//             cy.get('[id="okta-signin-username"]').type(`${testData.userName}`, {log: false});
//             cy.get('[id="okta-signin-password"]').type(`${testData.password}`, {log: false});
//             cy.get('[id="okta-signin-submit"]').click();
//           } else {
//             cy.log('User has already ligged in');
//           }
//   })
// })

// Cypress.Commands.add('logout', () => {
//   cy.get('[data-qa="open-header-navigation"]')
//     .click()
//     .get('[data-action="side-menu-logout"]')
//     .should('be.visible');
//   cy.get('[data-action="side-menu-logout"]')
//     .click()
//     .get('[id="okta-signin-username"]')
//     .should('be.visible');
// });
