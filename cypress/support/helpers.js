import { recurse } from 'cypress-recurse';

Cypress.Commands.add('makeTenMinuteEmailAddress', () => {
  // https://10minutemail.net/address.api.php
  // Example response: {"mail_get_user":"hse87114","mail_get_mail":"hse87114@zwoho.com","mail_get_host":"zwoho.com","mail_get_time":1623886513,"mail_get_duetime":1623887113,"mail_server_time":1623886513,"mail_get_key":"NSnysh","mail_left_time":600,"mail_recovering_key":null,"mail_recovering_mail":null,"session_id":"95b3e1bce21ab0fae41460ff6f21b565","permalink":{"host":"zwoho.com","mail":"hse87114@zwoho.com","url":"https:\/\/10minutemail.net\/permalink\/hse87114@zwoho.com\/G6kbp\/62eTLDjJAgCy7qdlTt39pl\/","key":"aRbTvIONGF","time":1623886513},"mail_list":[{"mail_id":"welcome","from":"no-reply@10minutemail.net","subject":"Hi, Welcome to 10 Minute Mail","datetime":"2021-06-16 23:35:13 UTC","datetime2":"just now","timeago":0,"isread":false}]}
  cy.request('https://10minutemail.net/new.html').then(() => {
    cy.request({
      method: 'GET',
      url: 'https://10minutemail.net/address.api.php',
      json: true,
    }).then((response) => {
      return cy.wrap(response.body.mail_get_mail);
    });
  });
});

Cypress.Commands.add('getTenMinuteEmailList', () => {
  // Get list of emails with subjects:
  // https://10minutemail.net/address.api.php returns list of messages in body.mail_list
  // Example response: {"mail_get_user":"eeo03644","mail_get_mail":"eeo03644@eoopy.com","mail_get_host":"eoopy.com","mail_get_time":1623914144,"mail_get_duetime":1623914744,"mail_server_time":1623914291,"mail_get_key":"rRaN23","mail_left_time":453,"mail_recovering_key":null,"mail_recovering_mail":null,"session_id":"8cb292a7b5ffd447fb58e2f0613d5573","permalink":{"host":"eoopy.com","mail":"eeo03644@eoopy.com","url":"https:\/\/10minutemail.net\/permalink\/eeo03644@eoopy.com\/G6rnU\/7b8WK9wVoOAHsPJr4wfg70\/","key":"x9ckLp7N3J","time":1623914144},"mail_list":[{"mail_id":"c9ZBUV","from":"Joe Boon ","to":"\"eeo03644@eoopy.com\" ","subject":"HELLO WORLD","datetime":"2021-06-17 07:16:18","datetime2":"1 minute ago","timeago":113,"isread":"1"},{"mail_id":"welcome","from":"no-reply@10minutemail.net","subject":"Hi, Welcome to 10 Minute Mail","datetime":"2021-06-17 07:15:44 UTC","datetime2":"2 minutes ago","timeago":147,"isread":false}]}
  // Mail_list = [{"mail_id":"c9ZBUV","from":"Joe Boon ","to":"\"eeo03644@eoopy.com\" ","subject":"HELLO WORLD","datetime":"2021-06-17 07:16:18","datetime2":"1 minute ago","timeago":113,"isread":"1"},{"mail_id":"welcome","from":"no-reply@10minutemail.net","subject":"Hi, Welcome to 10 Minute Mail","datetime":"2021-06-17 07:15:44 UTC","datetime2":"2 minutes ago","timeago":147,"isread":false}]
  cy.request({
    method: 'GET',
    url: 'https://10minutemail.net/address.api.php',
    json: true,
  }).then((response) => {
    return cy.wrap(response.body.mail_list);
  });
});

Cypress.Commands.add('getTenMinuteEmailById', (mailId) => {
  // Get one email, which may contain multiple bodies in different formats:
  // use mail_list[i].mail_id
  // https://10minutemail.net/mail.api.php?mailid=c9ZBUV
  // Example response:
  // {
  //   "from":"Joe Boon <Joe.Boon@valtech.com>",
  //   "gravatar":"https:\/\/www.gravatar.com\/avatar\/194837e85a3e3ad46b2a13d8b1875408?s=80&d=mm&r=g",
  //   "to":""eeo03644@eoopy.com" <eeo03644@eoopy.com>",
  //   "subject":"HELLO WORLD",
  //   "datetime":"2021-06-17 07:16:18",
  //   "timestamp":1623914178,
  //   "datetime2":"23 minutes ago",
  //   "urls":["http:\/\/valtech.com\/","http:\/\/schemas.microsoft.com\/office\/2004\/12\/omml","http:\/\/www.w3.org\/TR\/REC-html40"],
  //   "body": [
  //             {"content":"text\/plain","charset":"","bodylength":601,"body":"Hello from Joe\n\n\nThis message and any attachments are Valtech property and may contain confidential information intended solely for the addressees. If you are not the intended recipient of this message or if you have received it incomplete or altered, please notify the author by replying to this e-mail immediately. Any unauthorized use, diffusion or dissemination not expressly authorized by Valtech in writing is strictly prohibited.\n\n"},
  //             {"content":"text\/html","charset":"","bodylength":4294,"body":"<html xmlns:v=\"urn:schemas-microso.... <br \/>&nbsp;"
  //           ]
  // }
  cy.request({
    method: 'GET',
    url: `https://10minutemail.net/mail.api.php?mailid=${mailId}`,
    json: true,
  }).then((response) => {
    return cy.wrap(response.body);
  });
});

Cypress.Commands.add('getMostRecentTenMinuteEmail', () => {
  cy.getTenMinuteEmailList().then((list) => {
    const mostRecentMailId = list[0].mail_id;
    return cy.getTenMinuteEmailById(mostRecentMailId);
  });
});

Cypress.Commands.add('waitForNewEmail', (subjectKeyword) => {
  recurse(
    cy.getMostRecentTenMinuteEmail,
    (email) => emailIsNewAndSubjectContainsKeyword(email, subjectKeyword),
    {
      timeout: 120000,
      limit: 1000,
      delay: 500,
      log: true
    }
  );
});

function emailIsNewAndSubjectContainsKeyword(email, subjectKeyword) {
  return emailIsNew(email) && emailSubjectContainsKeyword(email, subjectKeyword);
}

function emailIsNew(email) {
  cy.log("email.datetime2", email.datetime2);
  return email.datetime2 === 'just now' || email.datetime2 === '1 minute ago' || email.datetime2.includes('seconds ago');
}

function emailSubjectContainsKeyword(email, subjectKeyword) {
  cy.log("email.subject", email.subject);
  return email.subject.includes(subjectKeyword);
}

Cypress.Commands.add('logNestedStep', stepName => {
  Cypress.log({
    name: 'step',
    displayName: 'step',
    message: `&nbsp;◇ **${stepName}**`,
    consoleProps: () => {
      // Return an object which will print
      // to dev tools console when clicked
      return {
        Command: 'Nested step started',
        Step: stepName,
      };
    }
  }).snapshot('Before command: ' + stepName);
});

import cucumberStep from 'cypress-cucumber-preprocessor/lib/resolveStepDefinition';

/**
 * Run a cucumber step as a nested step. 
 * 
 * You can call this from a cucumber step, and this step will be run and return,
 * and the nested step name will be shown in the cypress log.
 * 
 * You can only run steps which the current running feature has access to.
 * Therefore the nested step must exists in the step definition folder for 
 * the current running feature file, or in one of /common.
 * 
 * You cannot use this function to run steps in another feature file's
 * step definition folder.
 * 
 * @param {string} stepName Step text exactly as it would appear in a feature file, with parameter values inline
 */
export function runNestedStep(stepName) {
  // Log the step using a custom command so the log message
  // appears in the right place alongside other async commands.
  cy.logNestedStep(stepName);

  const step = { keyword: "*", text: stepName };

  cucumberStep.resolveAndRunStepDefinition(step);
}

