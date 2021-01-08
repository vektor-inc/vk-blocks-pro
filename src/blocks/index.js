/**
 * WordPress dependencies
 */
import '@wordpress/core-data';
import '@wordpress/notices';
// import '@wordpress/block-editor';
import {
	registerBlockType,
	unstable__bootstrapServerSideBlockDefinitions, // eslint-disable-line camelcase
} from '@wordpress/blocks';
import compareVersions from 'compare-versions';

/**
 * Internal dependencies
 */
import * as animation from './_pro/animation';
import * as card from './_pro/card';
import * as childPage from './_pro/child-page';
import * as postList from './_pro/post-list';
import * as alert from './alert';
import * as balloon from './balloon';
import * as borderBox from './border-box';
import * as flow from './flow';
import * as faq from './faq';
import * as faq2 from './faq2';
import * as faq2a from './faq2-a';
import * as faq2q from './faq2-q';
import * as pageContent from './page-content';
import * as prContent from './pr-content';
import * as spacer from './spacer';

/**
 * Function to get all the VK Blocks in an array.
 */
export const __getVKBlocks = () => [
	animation,
	card,
	childPage,
	postList,
	card,
	alert,
	balloon,
	borderBox,
	faq,
	faq2,
	faq2a,
	faq2q,
	flow,
	pageContent,
	prContent,
	spacer
];

/**
 * Function to register an individual block.
 *
 * @param {Object} block The block to be registered.
 *
 */
const registerBlock = ( block ) => {
	if ( ! block ) {
		return;
	}

	let { metadata, settings, name } = block;

	//WP5.5未満の場合
	if ( compareVersions( window.wpVersion, "5.5" ) < 0 ){
		//nameを削除
		delete metadata.name;
		//カテゴリ等を追加
		settings = {
			...settings,
			...metadata
		}

	} else {
		if ( metadata ) {
			unstable__bootstrapServerSideBlockDefinitions( { [ name ]: metadata } );
		}
	}
	registerBlockType( name, settings );
};

/**
 * Function to register VK Blocks.
 */
export const registerVKBlocks = (
	blocks = __getVKBlocks()
) => {
	blocks.forEach( registerBlock );
};
