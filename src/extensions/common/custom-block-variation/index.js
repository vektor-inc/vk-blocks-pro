/**
 * WordPress dependencies
 */
import { registerBlockVariation } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { VariationIcon } from './icons';
/*globals vk_blocks_params */

// https://ja.wordpress.org/team/handbook/block-editor/reference-guides/block-api/block-variations/
if (window.vk_blocks_params) {
	vk_blocks_params.block_variation_lists.forEach((item) => {
		if (!item.title || !item.block_name || !item.name) {
			return;
		}
		const variation = {
			...item,
			attributes: JSON.parse(item.attributes),
			innerBlocks: JSON.parse(item.innerBlocks),
			icon: item.icon !== '' ? item.icon : VariationIcon,
		};
		delete variation.block_name;
		registerBlockVariation(item.block_name, variation);
	});
}
