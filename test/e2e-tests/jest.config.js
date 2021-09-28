/**
 * WordPress dependencies
 */
 const baseConfig = require( '@wordpress/scripts/config/jest-e2e.config' );

 module.exports = {
     ...baseConfig,
     testPathIgnorePatterns: [
         '/node_modules/',
         'e2e-tests/specs/performance/',
     ]
 };