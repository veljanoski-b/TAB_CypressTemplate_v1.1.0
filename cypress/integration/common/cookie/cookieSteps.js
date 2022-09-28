import { Given, Then } from 'cypress-cucumber-preprocessor/steps';
import { cookieSelectors } from './cookieSelectors.js';

Given('I create the cookiepro accepted cookie', () => {
  // TODO Consider replacing "I accept cookies" with setting a cookie to say we have accepted cookies
  // TODO feature files Background - remove 'Given I open the home page' when we set a cookie to accept cookies
  // OptanonConsent=isGpcEnabled=0&datestamp=Fri+Jun+25+2021+14%3A34%3A52+GMT%2B0100+(British+Summer+Time)&version=6.17.0&isIABGlobal=true&hosts=&landingPath=NotLandingPage&groups=C0001%3A1%2CC0002%3A1%2CC0003%3A1%2CC0004%3A1%2CSTACK42%3A1&AwaitingReconsent=false
  // Documentation for the OptanonConsent cookie: https://community.cookiepro.com/s/article/UUID-1e75fb0d-bb79-2af8-cb85-f905d16f1220
  const now = new Date();
  const cookieTimestamp = encodeURI(now.toString()); // 'Fri+Jun+25+2021+14%3A34%3A52+GMT%2B0100+(British+Summer+Time)';
  const cookieValue = `isGpcEnabled=0&datestamp=${cookieTimestamp}&version=6.17.0&isIABGlobal=true&hosts=&landingPath=NotLandingPage&groups=C0001%3A1%2CC0002%3A1%2CC0003%3A1%2CC0004%3A1%2CSTACK42%3A1&AwaitingReconsent=false`;
  cy.trace(cookieValue, 'Cookiepro Cookie');
  cy.setCookie('OptanonConsent', cookieValue, { sameSite: 'lax' });
});

Given('I accept cookies', () => {
  // Assumes the cookie banner is present
  cy.get(cookieSelectors.cookieBanner.acceptCookiesButton).click();
  cy.get(cookieSelectors.cookieBanner.floatingCookiePreferenceButton).should('be.visible');
});

Then('The cookie banner does not appear', () => {
  cy.get(cookieSelectors.cookieBanner.acceptCookiesButton).should('not.exist');
});


