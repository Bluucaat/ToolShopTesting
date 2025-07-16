const { ReportAggregator, HtmlReporter } = require('wdio-html-nice-reporter'); // Ensure correct imports for JS
let reportAggregator;

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
    reporters: [
        'spec',
        [
            'html-nice',
            {
                outputDir: './reports/html-reports/',
                filename: 'report.html',
                reportTitle: 'HTML report',
                linkScreenshots: true,
                showInBrowser: true,
                collapseTests: false,
                useOnAfterCommandForScreenshot: false
            }
        ],
        [
            'allure',
            {
                outputDir: './reports/allure-results',
                disableWebdriverStepsReporting: false,
                disableWebdriverScreenshotsReporting: false
            }
        ]
    ],
    onPrepare: function () {
        // Initialize the ReportAggregator before starting the tests
        reportAggregator = new ReportAggregator({
            outputDir: './reports/html-reports/', // Path to save aggregated report
            filename: 'master-report.html', // Aggregated report file
            reportTitle: 'Master Report', // Title for the aggregated report
            collapseTests: true, // Collapse tests by default
        });

        // Clean previous report files before executing new tests
        reportAggregator.clean();
        console.log('Aggregator initialized and old reports cleaned.');
    },

    onComplete: async function () {
        // Use the ReportAggregator to create the master report
        console.log('Generating master report...');
        await reportAggregator.createReport();
        console.log('Master report generated successfully!');
    },
};