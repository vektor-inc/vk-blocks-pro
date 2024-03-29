/**
 * NOTE: このファイルは、@wordpress/e2e-tests/fixtures/utils.jsのコピーです。
 * https://github.com/WordPress/gutenberg/blob/master/packages/e2e-tests/fixtures/utils.js
 */
/**
 * External dependencies
 */
import fs from 'fs';
import path from 'path';

const FIXTURES_DIR = path.join( __dirname, 'blocks' );

function readFixtureFile( fixturesDir, filename ) {
	try {
		return fs.readFileSync( path.join( fixturesDir, filename ), 'utf8' );
	} catch ( err ) {
		return null;
	}
}

function writeFixtureFile( fixturesDir, filename, content ) {
	fs.writeFileSync( path.join( fixturesDir, filename ), content );
}

export function blockNameToFixtureBasename( blockName ) {
	return blockName.replace( /\//g, '__' );
}

export function getAvailableBlockFixturesBasenames() {
	// We expect 4 different types of files for each fixture:
	//  - fixture.html            : original content
	//  - fixture.parsed.json     : parser output
	//  - fixture.json            : blocks structure
	//  - fixture.serialized.html : re-serialized content
	// Get the "base" name for each fixture first.
	return [
		...new Set(
			fs
				.readdirSync( FIXTURES_DIR )
				.filter( ( f ) => /(\.html|\.json)$/.test( f ) )
				.map( ( f ) => f.replace( /\..+$/, '' ) )
		),
	];
}

export function getBlockFixtureHTML( basename ) {
	const filename = `${ basename }.html`;
	return {
		filename,
		file: readFixtureFile( FIXTURES_DIR, filename ),
	};
}

export function getBlockFixtureJSON( basename ) {
	const filename = `${ basename }.json`;
	return {
		filename,
		file: readFixtureFile( FIXTURES_DIR, filename ),
	};
}

export function getBlockFixtureParsedJSON( basename ) {
	const filename = `${ basename }.parsed.json`;
	return {
		filename,
		file: readFixtureFile( FIXTURES_DIR, filename ),
	};
}

export function getBlockFixtureSerializedHTML( basename ) {
	const filename = `${ basename }.serialized.html`;
	return {
		filename,
		file: readFixtureFile( FIXTURES_DIR, filename ),
	};
}

export function writeBlockFixtureHTML( basename, fixture ) {
	writeFixtureFile( FIXTURES_DIR, `${ basename }.html`, fixture );
}

export function writeBlockFixtureJSON( basename, fixture ) {
	writeFixtureFile( FIXTURES_DIR, `${ basename }.json`, fixture );
}

export function writeBlockFixtureParsedJSON( basename, fixture ) {
	writeFixtureFile( FIXTURES_DIR, `${ basename }.parsed.json`, fixture );
}

export function writeBlockFixtureSerializedHTML( basename, fixture ) {
	writeFixtureFile( FIXTURES_DIR, `${ basename }.serialized.html`, fixture );
}
