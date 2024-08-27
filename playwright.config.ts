import { defineConfig } from '@playwright/test';
const baseConfig = require( '@wordpress/scripts/config/playwright.config.js' );

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config = defineConfig( {
	...baseConfig,
	//globalSetup: require.resolve( './tests/e2e/global-setup.js' ),
	testDir: './test/e2e',
} );

export default config;
