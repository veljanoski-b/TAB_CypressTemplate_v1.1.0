

export const isSbreakPoint = () => {
  return Cypress.config("viewportWidth") === Cypress.env("smallMobileViewportWidthBreakpoint")
};

export const isMbreakPoint = () => {
  return Cypress.config("viewportWidth") === Cypress.env("mediumTabletViewportWidthBreakpoint")
};

export const isLbreakPoint = () => {

  return Cypress.config("viewportWidth") === Cypress.env("largeDesktopViewportWidthBreakpoint")
};

export const isXLbreakPoint = () => {
  return Cypress.config("viewportWidth") === Cypress.env("xLargeDesktopViewportWidthBreakpoint")
};

