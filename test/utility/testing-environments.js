import objectAssign from 'object-assign';

let calculatePlatformFromBS = function(capabilities) {
  const os = (capabilities.os || '').toLowerCase();
  const osVersion = (capabilities.os_version || '').toLowerCase();

  if(os === 'windows') {
    if(osVersion === '8' || osVersion === '8.1') {
      return 'WIN8';
    }
    else if(osVersion === 'xp') {
      return 'XP';
    }

    return 'WINDOWS';
  }
  else if(os === 'os x') {
    return 'MAC';
  }

  return 'ANY';
};



const USER = process.env.BS_USER;
const KEY  = process.env.BS_KEY;

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
  // OS you want to test. (BrowserStack-specific)
  // WINDOWS, OS X
  os: 'Windows',
  // OS version you want to test. (BrowserStack-specific)
  // Windows: XP, 7, 8 and 8.1
  // OS X: Snow Leopard, Lion, Mountain Lion, Mavericks, Yosemite
  os_version: '8.1',
  screenResolution: '1024x768',

  'browserstack.local': true,
  'browserstack.debug': true,
  'browserstack.user': USER,
  'browserstack.key': KEY
};

const testingEnvironments = [
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

export default testingEnvironments.map((envCaps) => {
  let capabilities = objectAssign({}, defaultEnvironmentCapabilities, envCaps);
  capabilities.platform = calculatePlatformFromBS(capabilities);

  return capabilities;
});
