const { execSync } = require( 'child_process' );

// Run the tests, passing additional arguments through to the test script.
execSync(
	'wp-scripts test-e2e --config ./test/e2e-tests/jest-e2e.config.js --puppeteer-interactive' +
		( 3 >= process.argv.length ? ' ' + process.argv.slice( 2, 3 ) : '' ),
	{ stdio: 'inherit' }
);