import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save(props) {
	const { attributes } = props;
	const { verticalAlignment } = attributes;
	let containerClass;
	if (verticalAlignment === 'center') {
		containerClass =
			'vk_gridcolcard_item_body vk_gridcolcard_item_body-valign-center';
	} else if (verticalAlignment === 'bottom') {
		containerClass =
			'vk_gridcolcard_item_body vk_gridcolcard_item_body-valign-bottom';
	} else {
		containerClass = 'vk_gridcolcard_item_body';
	}

	const blockProps = useBlockProps.save({
		className: `${containerClass}`,
	});
	return (
		<div {...blockProps}>
			<div className={`vk_gridcolcard_item_body_inner`}>
				<InnerBlocks.Content />
			</div>
		</div>
	);
}