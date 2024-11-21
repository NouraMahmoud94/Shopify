const cypress = require('cypress');
const path = require('path');

// List your spec files using absolute paths
const specs = [
    path.resolve(__dirname, 'cypress', 'e2e', 'Home.cy.js'),
    path.resolve(__dirname, 'cypress', 'e2e', 'search.cy.js'),
    path.resolve(__dirname, 'cypress', 'e2e', 'cart.cy.js'),
    path.resolve(__dirname, 'cypress', 'e2e', 'checkout.cy.js'),
];

// Function to run Cypress tests
function runTests(spec) {
    return cypress.run({
        spec: spec,
        config: {
            baseUrl: 'https://tranquilomatcha.com', // Adjust your base URL if needed
            video: false,
            screenshotOnRunFailure: true,
        },
        reporter: 'mochawesome',
        reporterOptions: {
            reportDir: 'cypress/results',
            overwrite: false,
            html: true,
            json: false,
        },
    }).then((results) => {
        console.log(`Results for ${spec}:`, results);
        if (results.totalFailed > 0) {
            console.log(`❌ Test suite failed: ${spec}`);
        } else {
            console.log(`✅ Test suite passed: ${spec}`);
        }
    }).catch((error) => {
        console.error(`Error running ${spec}:`, error);
        process.exit(1); // Exit with error code if there's a failure
    });
}

// Run tests for each spec
async function runAllTests() {
    for (const spec of specs) {
        await runTests(spec);
    }
}

runAllTests();
