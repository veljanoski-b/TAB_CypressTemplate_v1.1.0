import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given('I open absolute url {string}', (absoluteUrl) => {
  cy.visit(absoluteUrl);
  cy.wait(1);
});

Then('I do Percy snapshot named {string}', (snapShotTitle) => {
  cy.percySnapshot(`${snapShotTitle}`);
});
