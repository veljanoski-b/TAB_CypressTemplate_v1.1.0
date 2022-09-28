const report = require('multiple-cucumber-html-reporter');
const fs = require('fs');

const mapOpSys = (opsys) => {
    if (opsys.startsWith('win')) {
        return 'windows';
    } else if (opsys.startsWith('osx')) {
        return 'osx';
    } else if (opsys.startsWith('linux')) {
        return 'linux';
    } else if (opsys.startsWith('ubuntu')) {
        return 'ubuntu';
    } else if (opsys.startsWith('android')) {
        return 'android';
    } else if (opsys.startsWith('ios')) {
        return 'ios';
    }
}

fs.readFile('cypress/report/results.json', function read(err, data) {
    if (err) {
        throw err;
    }
    var runInfo = JSON.parse(data);
    const now = new Date();
    const dateTime = now.toLocaleString('en-CA', { timeZoneName: 'short', hour12: false }).replace(/:/g, '-').replace(/, /g, '@').replace(/ /g, '-');
    report.generate({
        jsonDir: 'cypress/report/cucumber',
        reportPath: `cypress/report/cucumber/cucumber-html-report/Report_${dateTime}`,
        reportName: `Cypress tests execution report`,
        metadata: {
            browser: {
                name: runInfo.browserName,
                version: runInfo.browserVersion
            },
            device: 'Cypress',
            platform: {
                name: mapOpSys(runInfo.osName)
            }
        },
        customData: {
            title: 'Run info',
            data: [
                { label: 'Project', value: 'QA JS Cypress' },
                { label: 'Execution Start Time', value: new Date(runInfo.startedTestsAt).toLocaleString() },
                { label: 'Execution End Time', value: new Date(runInfo.endedTestsAt).toLocaleString() }
            ]
        }
    });
});
