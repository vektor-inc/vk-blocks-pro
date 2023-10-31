/**
 * External dependencies
 */

/* eslint camelcase: 0 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

const prefix = 'vk_slider_item_container';

export default function save(props) {
	const { attributes } = props;
	const { containerWidth } = attributes;

	let containerClass = '';
	if (containerWidth === undefined || containerWidth === '0') {
		containerClass = `${prefix} container`;
	} else {
		containerClass = `${prefix}`;
	}

	const blockProps = useBlockProps.save({
		className: containerClass,
	});

	return (
		<div {...blockProps}>
			<InnerBlocks.Content />
		</div>
	);
}
