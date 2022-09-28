
// BaseUrls for each system
// You can specify any environment name you wish as a key

const baseUrls = {
  // dev: 'https://dev.2.lighting.philips.com',
  test: 'https://tst.2.lighting.philips.com',
  acc: 'https://acc.2.lighting.philips.com',
  // prod: 'https://demo.vuestorefront.io/',
  smallMobileViewportWidthBreakpoint: 375,
  mediumTabletViewportWidthBreakpoint: 768,
  largeDesktopViewportWidthBreakpoint: 1440,
  xLargeDesktopViewportWidthBreakpoint: 1920,
};

export const testData = {
  userName: 'userName',
  password: 'password',
};

export function getBaseUrl() {
  return baseUrls[getEnv()];
}

function getEnv() {
  let env = Cypress.env('env');
  if (!env) {
    env = Object.keys(baseUrls)[0];
  }
  return env;
}

// TODO Consider having a config object which looks up the baseUrl and other settings for you:
// class Config
//   isMobile() {
//   	 return ..;
//   }
//   isDesktop() {
//   	 return ..;
//   }
//   getLocale() {
//   	 return ..;
//   }
//   getBaseUrl() {
//     // see definition below
//   }
// }
// cy.mobile(lambda) or cy.desktop(lambda)

// TODO function to combine url
// export function getUrl(relativeUrl) {
//   return Path.join(getBaseUrl(), relativeUrl); // use node Url via cy.task
// }

// TODO Consider loading test data from test fixtures like https://bitbucket.org/tcuk/vue-storefront-playground/src/master/tests/e2e/
// before(() => {
//   cy.fixture('test-data/e2e-place-order').then((fixture) => {
//     cy.fixtures = {
//       data: fixture
//     };
//   });
// });
// context('Order placement', () => {
//   it(['e2e', 'happypath'], 'Should successfully place an order', () => {
//     const data = cy.fixtures.data;
//     page.home.visit();
//     page.checkout.shipping.fillForm(data.customer);
