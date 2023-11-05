import packageJson from './package.json';

/**
 * After changing, please reload the extension at `chrome://extensions`
 */
const manifest: chrome.runtime.ManifestV3 = {
  manifest_version: 3,
  name: packageJson.name,
  version: packageJson.version,
  description: packageJson.description,
  permissions: ['storage', 'webNavigation', 'notifications', 'identity'],
  options_page: 'src/pages/options/index.html',
  background: {
    service_worker: 'src/pages/background/index.js',
    type: 'module',
  },
  action: {
    default_popup: 'src/pages/popup/index.html',
    default_icon: 'icon-3.png',
  },
  oauth2: {
    client_id: '579209352883-48vrnp76m210i8ffu4kbu5fvfabgm9gv.apps.googleusercontent.com',
    scopes: ['openid', 'email', 'profile'],
  },
  icons: {
    '128': 'icon-3.png',
  },
  content_scripts: [
    {
      matches: ['http://*/*', 'https://*/*', '<all_urls>'],
      js: ['src/pages/content/index.js'],
      // KEY for cache invalidation
      css: ['assets/css/contentStyle<KEY>.chunk.css'],
    },
  ],
  devtools_page: 'src/pages/devtools/index.html',
  web_accessible_resources: [
    {
      resources: ['assets/js/*.js', 'assets/css/*.css', 'icon-128.png', 'icon-34.png', 'icon-3.png', 'fonts/*.ttf'],
      matches: ['*://*/*'],
    },
  ],
  externally_connectable: {
    matches: ['<all_urls>'],
  },
  key: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAolKVdM1eAXtr6oaXIBR3KE18QTSeAMyIhNSxQXwxlHjmxs6euxzmE0UL9AZtJhRpe9Uz1IB7Qbb2n2Om5DXw7zOO0FEvPn/XQX2CHOkygjaY9/83Dpbu/VdiE2gGYlizHwq7DC50Y3fRDXu6hWoLCk/tSZcX0mTAatINM1wGeKkk+zJ5yhHeK1NFeuLiYWuMtsN5BksEvQg4AcCzZPI9DBmYjSMieTINeSUWVhEAlksqg7Wx3Uw+d7uIjmPCkqvdDKF9Z92kIeZDTUnq2JoB9LkCmW4SomqlfTznAki2YvUZbSyO3z3KFSygJDEBedjhp41sqm6JBslq8kKzOSy2xQIDAQAB',
};

export default manifest;
