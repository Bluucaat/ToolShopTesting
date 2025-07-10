exports.config = {
    runner: 'local',
    specs: ['./features/**/*.feature'],
    exclude: [],
    maxInstances: 4,
    capabilities: [
        {
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: [
                    'headless',
                    '--window-size=1280,672',
                    '--disable-gpu'
                ]
            }
        },
        {
            browserName: 'firefox',
            'moz:firefoxOptions': {
                args: [
                    '--headless',
                    '--window-size=1280,672'
                ]
            }
        },
        {
            browserName: 'safari'
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
        require: ['./features/step_definitions/**/*.js'],
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
    reporters: [['allure', { outputDir: 'allure-results' }]]
};