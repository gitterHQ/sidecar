var assert = require('assert'),
  fs = require('fs');

var webdriver = require('browserstack-webdriver')
  test = require('browserstack-webdriver/testing');

test.describe('Sidecar', function() {
  var driver, server;

  test.before(function() {
  var capabilities = {
    'browserName' : 'firefox',
    'browserstack.local' : 'true',
    'browserstack.user' : 'mauro85',
    'browserstack.key' : 'EGakKeAp8aHwKoyaBpEV'
   }
  driver = new webdriver.Builder().
    usingServer('http://hub.browserstack.com/wd/hub').
    withCapabilities(capabilities).
    build();
  });
  
  test.it('should append query to title', function() {
    driver.get('http://mauro85.browserstack.com/index.html');
    //driver.findElement(webdriver.By.name('q')).sendKeys('BrowserStack');
    //driver.findElement(webdriver.By.name('btnG')).click();
    //driver.wait(function() {
    //  return driver.getTitle().then(function(title) {
    //    return 'BrowserStack - Google Search' === title;
    //  });
    //}, 1000);
    driver.getTitle().then(function(title) {
      console.log(title);
    });
  });

  test.after(function() { driver.quit(); });
});
