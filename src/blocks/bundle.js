/**
 * WordPress dependencies
 */
import '@wordpress/core-data';
import '@wordpress/notices';
// import '@wordpress/block-editor';
import {
	registerBlockType,
	unstable__bootstrapServerSideBlockDefinitions,
} from '@wordpress/blocks';
import compareVersions from 'compare-versions';

/**
 * Blocks
 */
import * as alert from './alert';
import * as balloon from './balloon';
import * as borderBox from './border-box';
import * as button from './button';
import * as faq from './faq';
import * as faq2 from './faq2';
import * as faq2a from './faq2-a';
import * as faq2q from './faq2-q';
import * as flow from './flow';
import * as heading from './heading';
import * as pageContent from './page-content';
import * as prBlocks from './pr-blocks';
import * as prContent from './pr-content';
import * as spacer from './spacer';
import * as staff from './staff';
import * as animation from './_pro/animation';
import * as card from './_pro/card';
import * as cardItem from './_pro/card-item';
import * as childPage from './_pro/child-page';
import * as postList from './_pro/post-list';
import * as timeline from './_pro/timeline';
import * as timelineItem from './_pro/timeline-item';
import * as outer from './_pro/outer';
import * as tableofContentsNew from './_pro/table-of-contents-new';
import * as iconCard from './_pro/icon-card';
import * as iconCardItem from './_pro/icon-card-item';
import * as gridColumn from './_pro/grid-column';
import * as gridColumnItem from './_pro/grid-column-item';
import * as step from './_pro/step';
import * as stepItem from './_pro/step-item';
import * as slider from './_pro/slider';
import * as sliderItem from './_pro/slider-item';

/**
 * Extensions
 */
import "@vkblocks/translation_dummy.js";
import "@vkblocks/extensions/core/heading/style";
import "@vkblocks/extensions/core/group/style";
import "@vkblocks/extensions/core/list/style";
import "@vkblocks/extensions/core/image/style";
import "@vkblocks/extensions/common/hidden-extension";
import "@vkblocks/extensions/common/highlighter";
import "@vkblocks/extensions/common/nowrap";
import "@vkblocks/extensions/common/responsive-br";


/**
 * Function to get all the VK Blocks in an array.
 */
export const __getVKBlocks = () => [
	alert,
	balloon,
	borderBox,
	button,
	faq,
	faq2,
	faq2a,
	faq2q,
	flow,
	heading,
	pageContent,
	prBlocks,
	prContent,
	spacer,
	staff,
	animation,
	card,
	cardItem,
	childPage,
	postList,
	step,
	stepItem,
	timeline,
	timelineItem,
	outer,
	tableofContentsNew,
	iconCard,
	iconCardItem,
	gridColumn,
	gridColumnItem,
	slider,
	sliderItem,
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
