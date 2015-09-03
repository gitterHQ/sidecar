var assert = require('assert');
var webdriver = require('browserstack-webdriver');
var test = require('browserstack-webdriver/testing');

var USER = process.env.BS_USER;
var KEY  = process.env.BS_KEY;

var browsers = [
  {
    'os' : 'Windows',
    'os_version' : '7',
    'browser' : 'IE',
    'browser_version' : '10.0'
  },
  {
    'os' : 'OS X',
    'os_version' : 'Yosemite',
    'browser' : 'Chrome',
    'browser_version' : '44.0'
  }
];


test.describe('Sidecar', function() {

  browsers.forEach(function(capabilities) {

    var driver, server;

    test.before(function() {
      console.log('Testing:', capabilities);

      capabilities['browserstack.local']  =  'true'; // Gives access to the BrowserStack tunnel from the VM
      capabilities['browserstack.user']   =  USER;
      capabilities['browserstack.key']    =  KEY;
      capabilities['resolution']          = '1280x1024';
      capabilities['browserstack.debug']  = true; // Provides visual logs

      driver = new webdriver.Builder().
      usingServer('http://hub.browserstack.com/wd/hub').
      withCapabilities(capabilities).
      build();
    });
    
    test.it('should be an open chat button', function(done) {
      driver.get('http://'+ USER +'.browserstack.com/example.html');
      driver.wait(function() {
        return driver.findElement(webdriver.By.className('gitter-open-chat-button'))
        .then(function(item) {
          return item.getText().then(function(text) {
            return 'Open Chat' === text;
          });
        });
      }, 1000);
    });

    test.after(function() { driver.quit(); });

  });

});
