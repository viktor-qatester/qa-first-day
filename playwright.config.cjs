const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  testMatch: '**/*.e2e.cjs',
  reporter: 'line',
  use: {
    baseURL: 'http://127.0.0.1:8000',
    browserName: 'chromium',
    viewport: { width: 1280, height: 900 }
  },
  webServer: {
    command: 'python3 -m http.server 8000 --directory dist',
    url: 'http://127.0.0.1:8000',
    reuseExistingServer: true
  }
});
