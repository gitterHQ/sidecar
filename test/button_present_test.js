// See: https://www.browserstack.com/automate/node
// API: http://selenium.googlecode.com/git/docs/api/javascript/index.html
// Capabilities
//  - https://www.browserstack.com/automate/capabilities
//  - Capability platform/os configurator: https://docs.saucelabs.com/reference/platforms-configurator/#/
//
// How can I use selenium-webdriver package with SauceLabs?: http://stackoverflow.com/q/21170734/796832

// # Setup
//
// ### Set environment variables with your browserstack credentials
// See: http://stackoverflow.com/a/13333312/796832
//
// Windows:
// ```
// set BS_USER=xxx
// set BS_KEY=xxx
// ```


import Promise from 'bluebird';
import objectAssign from 'object-assign';
//var webdriver = require('browserstack-webdriver');
import webdriver from 'selenium-webdriver';
import test from 'tape';
//var test = require('browserstack-webdriver/testing');

import testingEnvironments from './utility/testing-environments.js';



let createWebDriver = function({
  server = 'http://hub.browserstack.com/wd/hub',
  capabilities = {}
}) {
  let driver = new webdriver.Builder()
    .usingServer(server)
    .withCapabilities(capabilities)
    .build();

  return driver;
};


const buttonTextExpected = 'open chat';

testingEnvironments.forEach(function(testingEnvironment) {
  const testName = `Open Chat Button should be present. in ${testingEnvironment.browserName} on ${testingEnvironment.platform}`;
  test(testName, function (t) {
    t.plan(1);

    let driver = createWebDriver({
      capabilities: testingEnvironment
    });

    let getPage = driver.get(`http://${testingEnvironment['browserstack.user']}.browserstack.com/example.html`);

    let buttonLocator = webdriver.By.css('.gitter-open-chat-button');

    let openChatButtonExists = getPage.then(function() {
      return driver.wait(function() {
        return driver.isElementPresent(buttonLocator);
      }, 10000);
    });

    openChatButtonExists
      .then(function() {
        return driver.findElement(buttonLocator);
      })
      .then(function(item) {
        return Promise.resolve(item.getText());
      })
      .then(function(text) {
        let actual = text.toLowerCase();
        if(actual !== buttonTextExpected) {
          throw new Error(`Failed, expected text to look like ${buttonTextExpected} but actually was ${actual}`);
        }
      })
      .then(function() {
        //console.log('driver.quit called');
        driver.quit();

        t.pass('Successfully ran through selenium tasks');
      });
  });
});
