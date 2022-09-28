import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { getBaseUrl, getEnv } from "../../config/config";
import { isSbreakPoint, isMbreakPoint, isLbreakPoint, isXLbreakPoint } from "../../support/utils"
import describeBuilder from '../../support/describeBuilder'
import { textComponentSelectors } from './textComponentSelectors.js';


const describeConstructor = new describeBuilder()

describe(describeConstructor.size(Object.values) + " " + 'Text Component', function () {

  // Checking of the Alignment of the Text Component

  Given('User opens the Text Component Page', () => {

    cy.visit(getBaseUrl().concat('/en-aa-sample/editorial/general-components/text-component'));

  });

  // checks the Right Alignment
  And('Checks the Right Alignment', () => {
    if (isXLbreakPoint() || isLbreakPoint()) {
      cy.get(textComponentSelectors.text.classAlignment).should('be.visible')
    }

    if (isMbreakPoint() || isSbreakPoint()) {
      cy.get(textComponentSelectors.text.classAlignment).should('be.visible')
    }
  })

})