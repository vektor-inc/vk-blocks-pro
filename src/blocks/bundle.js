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
import { compareVersions } from 'compare-versions';
import vkblocksPro from './bundle-pro';

/**
 * Blocks
 */
import * as alert from './alert';
import * as ancestorPageList from './ancestor-page-list';
import * as balloon from './balloon';
import * as borderBox from './border-box';
import * as button from './button';
import * as faq from './faq';
import * as faq2 from './faq2';
import * as faq2a from './faq2-a';
import * as faq2q from './faq2-q';
import * as flow from './flow';
import * as heading from './heading';
import * as icon from './icon';
import * as iconOuter from './icon-outer';
import * as pageContent from './page-content';
import * as prBlocks from './pr-blocks';
import * as prContent from './pr-content';
import * as slider from './slider';
import * as sliderItem from './slider-item';
import * as spacer from './spacer';
import * as staff from './staff';

/**
 * Store
 */
import '@vkblocks/utils/store';
import '@vkblocks/utils/store/termColor';

/**
 * Extensions
 */
import '@vkblocks/extensions/core/group/style';
import '@vkblocks/extensions/core/list/style';
import '@vkblocks/extensions/core/columns/style';
import '@vkblocks/extensions/common/hidden-extension';
import '@vkblocks/extensions/common/highlighter';
import '@vkblocks/extensions/common/inline-font-size';
import '@vkblocks/extensions/common/nowrap';
import '@vkblocks/extensions/common/responsive-br';
import '@vkblocks/extensions/common/margin-extension';

const vkBlocks = [
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
	icon,
	iconOuter,
	pageContent,
	prBlocks,
	prContent,
	slider,
	sliderItem,
	spacer,
	staff,
	ancestorPageList,
];

/**
 * Function to get all the VK Blocks in an array.
 */
export const __getVKBlocks = () => vkBlocks.concat(vkblocksPro);

/**
 * Function to register an individual block.
 *
 * @param {Object} block The block to be registered.
 */
const registerBlock = (block) => {
	if (!block) {
		return;
	}

	let { metadata, settings, name } = block;

	/*
	そもそも Require at Least が 5.7 なので 5.5 以下の後方互換は不要ではあるが、現状影響が少ないので残しておく
	window.wpVersion は外観 > カスタマイズ > ウィジェットでは undefined を返すので比較不可能
	ともかく最初から undefined が条件に当てはまらないように変更
	*/

	//WP5.5未満の場合
	if (
		window.wpVersion !== undefined &&
		window.wpVersion !== null &&
		compareVersions(window.wpVersion, '5.5') < 0
	) {
		//nameを削除
		delete metadata.name;
		//カテゴリ等を追加
		settings = {
			...settings,
			...metadata,
		};
	} else if (metadata) {
		// ServerSideBlockの設定読み込み
		unstable__bootstrapServerSideBlockDefinitions({ [name]: metadata }); // eslint-disable-line camelcase
	}

	// 5.8以前の場合はnameのみ渡す
	if (typeof getBlockSettingsFromMetadata !== 'function') {
		registerBlockType(name, settings);
	} else if (metadata) {
		registerBlockType(metadata, settings);
	}
};

/**
 * Function to register VK Blocks.
 *
 * @param {*} blocks
 */
export const registerVKBlocks = (blocks = __getVKBlocks()) => {
	blocks.forEach(registerBlock);
};
