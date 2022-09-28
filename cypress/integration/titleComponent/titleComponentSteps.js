import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { getBaseUrl, getEnv } from "../../config/config";
import { isSbreakPoint, isMbreakPoint, isLbreakPoint, isXLbreakPoint } from "../../support/utils"
import describeBuilder from '../../support/describeBuilder'
import { titleComponentSelectors } from './titleComponentSelectors.js';


const describeConstructor = new describeBuilder()

describe(describeConstructor.size(Object.values) + " " + 'Title Component', function () {

  // Checking of the Alignment of the Title Component

  Given('User opens the Title Component Page', () => {

    cy.visit(getBaseUrl().concat('/en-aa-sample/editorial/general-components/title-component'));

  });
  // checks the Left Alignment
  And('I check the Left Alignment', () => {
    if (isXLbreakPoint() || isLbreakPoint()) {
      cy.get(titleComponentSelectors.title.leftAlignment).should('be.visible')
    }

    if (isMbreakPoint() || isSbreakPoint()) {
      cy.get(titleComponentSelectors.title.leftAlignment).should('be.visible')
    }
  })

  And('I check the Right Alignment', () => {

    if (isXLbreakPoint() || isLbreakPoint()) {
      cy.get(titleComponentSelectors.title.rightAlignment).should('be.visible')
    }

    if (isSbreakPoint() || isMbreakPoint()) {
      cy.get(titleComponentSelectors.title.rightAlignment).should('be.visible')
    }
  })

  Then('I check the Center Alignment', () => {

    if (isXLbreakPoint() || isLbreakPoint()) {
      cy.get(titleComponentSelectors.title.centerAlignment).should('be.visible')
    }

    if (isSbreakPoint() || isMbreakPoint()) {
      cy.get(titleComponentSelectors.title.centerAlignment).should('be.visible')
    }
  })




  // Checking of the Font Size of the Title Component-Heading

  And('I check the Heading 1', () => {

    if (isXLbreakPoint() || isLbreakPoint()) {
      cy.get(titleComponentSelectors.title.heading1).contains('Title Heading H1').should('be.visible')
    }

    if (isSbreakPoint() || isMbreakPoint()) {
      cy.get(titleComponentSelectors.title.heading1).contains('Title Heading H1').should('be.visible')
    }
  })

  And('I check the Heading 2', () => {

    if (isXLbreakPoint() || isLbreakPoint()) {
      cy.get(titleComponentSelectors.title.heading2).contains('Title Heading H2').should('be.visible')
    }

    if (isSbreakPoint() || isMbreakPoint()) {
      cy.get(titleComponentSelectors.title.heading2).contains('Title Heading H2').should('be.visible')
    }
  })

  And('I check the Heading 3', () => {

    if (isXLbreakPoint() || isLbreakPoint()) {
      cy.get(titleComponentSelectors.title.heading3).contains('Title Heading H3').should('be.visible')
    }

    if (isSbreakPoint() || isMbreakPoint()) {
      cy.get(titleComponentSelectors.title.heading3).contains('Title Heading H3').should('be.visible')
    }
  })

  And('I check the Heading 4', () => {

    if (isXLbreakPoint() || isLbreakPoint()) {
      cy.get(titleComponentSelectors.title.heading4).contains('Title Heading H4').should('be.visible')
    }

    if (isSbreakPoint() || isMbreakPoint()) {
      cy.get(titleComponentSelectors.title.heading4).contains('Title Heading H4').should('be.visible')
    }
  })

  And('I check the Heading 5', () => {

    if (isXLbreakPoint() || isLbreakPoint()) {
      cy.get(titleComponentSelectors.title.heading5).contains('Title Heading H5').should('be.visible')
    }

    if (isSbreakPoint() || isMbreakPoint()) {
      cy.get(titleComponentSelectors.title.heading5).contains('Title Heading H5').should('be.visible')
    }
  })

  Then('I check the Heading 6', () => {

    if (isXLbreakPoint() || isLbreakPoint()) {
      cy.get(titleComponentSelectors.title.heading6).contains('Title Heading H6').should('be.visible')
    }

    if (isSbreakPoint() || isMbreakPoint()) {
      cy.get(titleComponentSelectors.title.heading6).contains('Title Heading H6').should('be.visible')
    }
  })

  //  Negative Scenario Heading check 

  Then('I check the Heading Negative', () => {

    if (isXLbreakPoint() || isLbreakPoint()) {
      cy.get(titleComponentSelectors.title.heading1).contains('Title Heading H2').should('be.visible')
    }

    if (isSbreakPoint() || isMbreakPoint()) {
      cy.get(titleComponentSelectors.title.heading1).contains('Title Heading H2').should('be.visible')
    }
  })
})
