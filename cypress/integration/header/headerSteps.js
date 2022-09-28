import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { headerSelectors } from './headerSelectors.js';
import { getBaseUrl, getEnv } from "../../config/config";
import { isSbreakPoint, isMbreakPoint, isLbreakPoint, isXLbreakPoint } from "../../support/utils"

import describeBuilder from '../../support/describeBuilder'

const describeConstructor = new describeBuilder()

describe(describeConstructor.size(Object.values) + " " + 'Header', function () {

  if (isXLbreakPoint() || isLbreakPoint())
    Given('I open the home page', () => {
      cy.visit(getBaseUrl());
    });

  And('I assert the logo', () => {
    if (isXLbreakPoint() || isLbreakPoint()) {
      cy.get(headerSelectors.header.philipsLogo).should('be.visible')
    }
  })


  Then('I Click on Products', () => {
    cy.get(headerSelectors.header.mainMenu).find('.user-nav__list').then(($items) => {
      cy.wrap($items).eq(0).click()
    })
  });

  And('I Click on Outdoor Luminaires', () => {
    cy.get(headerSelectors.header.mainMenuItems).find('li').then(($li) => {
      cy.wrap($li).find('span').eq(1).click()
    })
  })

  And('I Click on Application Areas', () => {
    cy.get(headerSelectors.header.mainMenu).find('.user-nav__list').then(($items) => {
      cy.wrap($items).eq(1).click()
    })
  });

  When('I Click on Office', () => {
    cy.get(headerSelectors.header.officeIndustriesItems).find('.wrapper').then(($items) => {
      cy.wrap($items).eq(0).should('to.be.visible')
    });
  });

})