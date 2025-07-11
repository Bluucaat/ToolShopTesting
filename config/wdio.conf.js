exports.config = {
    runner: 'local',
    specs: ['../tests/features/*.feature'],
    exclude: [],
    maxInstances: 4,
    capabilities: [
        {
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: [
                    'headless',
                    '--window-size=1920,1080',
                    '--disable-gpu'
                ]
            }
        },
        {
            browserName: 'firefox',
            'moz:firefoxOptions': {
                args: [
                    '--headless',
                    '--window-size=1920,1080'
                ]
            }
        }
    ],
    logLevel: 'error',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 10000,
    connectionRetryCount: 2,
    framework: 'cucumber',
    specFileRetries: 2,
    cucumberOpts: {
        require: ['./tests/step-definitions/*.steps.js'],
        backtrace: false,
        requireModule: [],
        dryRun: false,
        failFast: false,
        name: [],
        snippets: true,
        source: true,
        strict: false,
        tagExpression: '',
        timeout: 60000,
        ignoreUndefinedDefinitions: false
    },
    reporters: [['allure', { outputDir: '../allure-results' }]]
};