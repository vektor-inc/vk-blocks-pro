/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { useMemo, renderToString } from '@wordpress/element';
import { createBlock, store as blocksStore } from '@wordpress/blocks';

/**
 * External dependencies
 */
import { compareVersions } from 'compare-versions';

// WP6.3以上か NOTE: WP6.2以下をサポートしなくなったら削除すること
export const isLargerThanWp63 = () => {
	if (
		window.wpVersion !== undefined &&
		window.wpVersion !== null &&
		compareVersions(window.wpVersion, '6.3') < 0
	) {
		return false;
	}
	return true;
};

/**
 * Helper hook that determines if there is an active variation of the block
 * and if there are available specific scoped `block` variations connected with
 * this variation.
 *
 * If there are, these variations are going to be the only ones suggested
 * to the user in setup flow when clicking to `start blank`, without including
 * the default ones for Query Loop.
 *
 * If there are no such scoped `block` variations, the default ones for Query
 * Loop are going to be suggested.
 *
 * The way we determine such variations is with the convention that they have the `namespace`
 * attribute defined as an array. This array should contain the names(`name` property) of any
 * variations they want to be connected to.
 * For example, if we have a `Query Loop` scoped `inserter` variation with the name `products`,
 * we can connect a scoped `block` variation by setting its `namespace` attribute to `['products']`.
 * If the user selects this variation, the `namespace` attribute will be overridden by the
 * main `inserter` variation.
 *
 * @param {Object} attributes The block's attributes.
 */
export function useScopedBlockVariations(attributes) {
	const { activeVariationName, blockVariations } = useSelect(
		(select) => {
			const { getActiveBlockVariation, getBlockVariations } =
				select(blocksStore);
			return {
				activeVariationName: getActiveBlockVariation(
					'vk-blocks/blog-card',
					attributes
				)?.name,
				blockVariations: getBlockVariations(
					'vk-blocks/blog-card',
					'block'
				),
			};
		},
		[attributes]
	);
	const variations = useMemo(() => {
		// Filter out the variations that have defined a `namespace` attribute,
		// which means they are 'connected' to specific variations of the block.
		const isNotConnected = (variation) => !variation.attributes?.namespace;
		if (!activeVariationName) {
			return blockVariations.filter(isNotConnected);
		}
		const connectedVariations = blockVariations.filter((variation) =>
			variation.attributes?.namespace?.includes(activeVariationName)
		);
		if (!!connectedVariations.length) {
			return connectedVariations;
		}
		return blockVariations.filter(isNotConnected);
	}, [activeVariationName, blockVariations]);
	return variations;
}

/**
 * Fallback behaviour for unembeddable URLs.
 * Creates a paragraph block containing a link to the URL, and calls `onReplace`.
 *
 * @param {string}   url       The URL that could not be embedded.
 * @param {Function} onReplace Function to call with the created fallback block.
 */
export function fallback(url, onReplace) {
	const link = <a href={url}>{url}</a>;
	onReplace(createBlock('core/paragraph', { content: renderToString(link) }));
}
