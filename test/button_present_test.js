// See: https://www.browserstack.com/automate/node
// API: http://selenium.googlecode.com/git/docs/api/javascript/index.html
// Capabilities
//  - https://www.browserstack.com/automate/capabilities
//  - Capability platform/os configurator: https://docs.saucelabs.com/reference/platforms-configurator/#/
//
// How can I use selenium-webdriver package with SauceLabs?: http://stackoverflow.com/q/21170734/796832


//var webdriver = require('browserstack-webdriver');
import webdriver from 'selenium-webdriver';
import test from 'tape';
//var test = require('browserstack-webdriver/testing');
import Promise from 'bluebird';
import objectAssign from 'object-assign';

let USER = process.env.BS_USER;
let KEY  = process.env.BS_KEY;

// See: https://www.browserstack.com/automate/capabilities
const defaultEnvironmentCapabilities = {
  // Browser you want to test.
  // firefox, chrome, internet explorer, safari, opera, iPad, iPhone, android 
  browserName: 'chrome',
  // Browser version you want to test.
  version: 45.0,
  // OS you want to test.
  // ANY, WINDOWS, WIN8, MAC, and XP.
  platform: 'ANY',
  // OS you want to test.
  // WINDOWS, OS X
  os: 'Windows',
  // OS version you want to test.
  // Windows: XP, 7, 8 and 8.1
  // OS X: Snow Leopard, Lion, Mountain Lion, Mavericks, Yosemite
  os_version: '8.1',
  screenResolution: '1024x768',

  'browserstack.local': true,
  'browserstack.debug': true,
  'browserstack.user': USER,
  'browserstack.key': KEY
};

var testingEnvironments = [
  {
    browserName: 'chrome',
    version: 45.0,
    os: 'Windows',
    os_version: '8.1'
  },
  {
    browserName: 'chrome',
    version: 45.0,
    os: 'OS X',
    os_version: 'Yosemite'
  }
];



const buttonTextExpected = 'open chat';

testingEnvironments.forEach(function(testingEnvironment) {
  const testName = `Open Chat Button should be present. in ${testingEnvironment.browserName} on ${testingEnvironment.platform}`;
  test(testName, function (t) {
    t.plan(1);

    let driver = new webdriver.Builder()
      .usingServer('http://hub.browserstack.com/wd/hub')
      .withCapabilities(objectAssign({}, defaultEnvironmentCapabilities, testingEnvironment))
      .build();

    let getPage = driver.get(`http://${USER}.browserstack.com/example.html`);
      
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
