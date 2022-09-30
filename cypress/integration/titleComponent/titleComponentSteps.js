import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { getBaseUrl, getEnv } from "../../config/config";
import { isSbreakPoint, isMbreakPoint, isLbreakPoint, isXLbreakPoint } from "../../support/utils"
import describeBuilder from '../../support/describeBuilder'
import { ALIGNMENTS, title } from './titleComponentSelectors.js';


const describeConstructor = new describeBuilder()

describe(describeConstructor.size(Object.values) + " " + 'Title Component', function () {

  // Checking of the Alignment of the Title Component

  Given('I open the Title Component Page', () => {

    cy.visit(getBaseUrl().concat('/en-aa-sample/editorial/general-components/title-component'));

  });

  And('I check the Left Alignment', () => {
    if (isXLbreakPoint() || isLbreakPoint()) {
      cy.get(title.alignment(ALIGNMENTS.LEFT)).should('be.visible')
    }

    if (isMbreakPoint() || isSbreakPoint()) {
      cy.get(title.alignment(ALIGNMENTS.LEFT)).should('be.visible')
    }
  })

  And('I check the Right Alignment', () => {

    if (isXLbreakPoint() || isLbreakPoint()) {
      cy.get(title.alignment(ALIGNMENTS.RIGHT)).should('be.visible')
    }

    if (isSbreakPoint() || isMbreakPoint()) {
      cy.get(title.alignment(ALIGNMENTS.RIGHT)).should('be.visible')
    }
  })

  Then('I check the Center Alignment', () => {

    if (isXLbreakPoint() || isLbreakPoint()) {
      cy.get(title.alignment(ALIGNMENTS.CENTER)).should('be.visible')
    }

    if (isSbreakPoint() || isMbreakPoint()) {
      cy.get(title.alignment(ALIGNMENTS.CENTER)).should('be.visible')
    }
  })

  // Checking the Heading of the Title Component-Heading

  And('I check the Heading 1', () => {

    if (isXLbreakPoint() || isLbreakPoint()) {
      cy.get(title.heading(1)).contains('Title Heading H1').should('be.visible')
    }

    if (isSbreakPoint() || isMbreakPoint()) {
      cy.get(title.heading(1)).contains('Title Heading H1').should('be.visible')
    }
  })

  And('I check the Heading 2', () => {

    if (isXLbreakPoint() || isLbreakPoint()) {
      cy.get(title.heading(2)).contains('Title Heading H2').should('be.visible')
    }

    if (isSbreakPoint() || isMbreakPoint()) {
      cy.get(title.heading(2)).contains('Title Heading H2').should('be.visible')
    }
  })

  And('I check the Heading 3', () => {

    if (isXLbreakPoint() || isLbreakPoint()) {
      cy.get(title.heading(3)).contains('Title Heading H3').should('be.visible')
    }

    if (isSbreakPoint() || isMbreakPoint()) {
      cy.get(title.heading(3)).contains('Title Heading H3').should('be.visible')
    }
  })

  And('I check the Heading 4', () => {

    if (isXLbreakPoint() || isLbreakPoint()) {
      cy.get(title.heading(4)).contains('Title Heading H4').should('be.visible')
    }

    if (isSbreakPoint() || isMbreakPoint()) {
      cy.get(title.heading(4)).contains('Title Heading H4').should('be.visible')
    }
  })

  And('I check the Heading 5', () => {

    if (isXLbreakPoint() || isLbreakPoint()) {
      cy.get(title.heading(5)).contains('Title Heading H5').should('be.visible')
    }

    if (isSbreakPoint() || isMbreakPoint()) {
      cy.get(title.heading(5)).contains('Title Heading H5').should('be.visible')
    }
  })

  Then('I check the Heading 6', () => {

    if (isXLbreakPoint() || isLbreakPoint()) {
      cy.get(title.heading(6)).contains('Title Heading H6').should('be.visible')
    }

    if (isSbreakPoint() || isMbreakPoint()) {
      cy.get(title.heading(6)).contains('Title Heading H6').should('be.visible')
    }
  })

  //  Negative Scenario Heading check 

  Then('I check the Heading Negative', () => {

    if (isXLbreakPoint() || isLbreakPoint()) {
      cy.get(title.heading(1)).contains('Title Heading H2').should('be.visible')
    }

    if (isSbreakPoint() || isMbreakPoint()) {
      cy.get(title.heading(1)).contains('Title Heading H2').should('be.visible')
    }
  })
})
