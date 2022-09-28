// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

// Configuration for multiple JSON configFiles
// const cucumber = require('cypress-cucumber-preprocessor').default
// const fs = require('fs-extra')
// const path = require('path')

// function getConfigurationByFile (file) {
//   const pathToConfigFile = path.resolve('..', 'Cypress CST/cypress/config', `${file}.json`)

//   return fs.readJson(pathToConfigFile)
// }

// module.exports = (on, config) => {
//   on('file:preprocessor', cucumber())
//   const file = config.env.configFile || 'vw'
//   return getConfigurationByFile(file)
// }

const cucumber = require('cypress-cucumber-preprocessor').default;
const fs = require('fs');

module.exports = (on, config) => {
  on('file:preprocessor', cucumber());

  require('cypress-terminal-report/src/installLogsPrinter')(on);

  on('after:run', (results) => {
    if (results) {
      fs.mkdirSync("cypress/report", { recursive: true });
      fs.writeFile("cypress/report/results.json", JSON.stringify(results));
    }
  })

  on('task', {
    log(message) {
      if (typeof message === 'string') {
        console.log(message);
      } else {
        console.log(inspect(message));
      }

      return null;
    },
    table(message) {
      console.table(message);

      return null;
    },
    tableShowingColumns(message, columns) {
      console.table(message, columns);

      return null;
    },
  });
};
