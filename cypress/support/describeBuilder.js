import { isIntENV, isMobile, isXSbreakPoint, isSbreakPoint, isMbreakPoint, isLbreakPoint, isXLbreakPoint, screenSizeViewport } from "./utils"
import { getBaseUrl, getEnv } from "../config/config";

class Builder {
  size = () => {
    let size = 0
    if (isSbreakPoint()) {
      return size = '[Small Breakpoint]'
    }
    if (isMbreakPoint()) {
      return size = '[Medium Breakpoint]'
    }
    if (isLbreakPoint()) {
      return size = '[Large Breakpoint]'
    }
    if (isXLbreakPoint()) {
      return size = '[X-Large Breakpoint]'
    }
  }

  env = () => {
    let env = 0
    if (getBaseUrl() === test) {
      return env = '[Testing]'
    }
    if (Cypress.config(getBaseUrl())) {
      return env = '[Acceptance]'
    }

    if (Cypress.config(getBaseUrl())) {
      return env = '[Development]'
    }
  }

}

export default Builder

