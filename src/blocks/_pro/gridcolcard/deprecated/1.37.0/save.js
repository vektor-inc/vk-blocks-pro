import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
// import {
// 	useState
// } from '@wordpress/element';
export default function save(props) {
	const { attributes } = props;
	const containerClass = 'vk_gridcolcard';
	const {
		colWidthMin,
		colWidthMinTablet,
		colWidthMinPC,
		gap,
		gapRow,
		blockId,
	} = attributes;

	const blockProps = useBlockProps.save({
		className: `${containerClass} vk_gridcolcard-${blockId}`,
	});

	let blockGap = '';
	if (gapRow) {
		blockGap = gapRow + ' ' + gap;
	} else {
		blockGap = gap;
	}

	return (
		<div {...blockProps}>
			<InnerBlocks.Content />
			<style>
				{`
				.vk_gridcolcard-${blockId} {
					grid-template-columns:repeat(auto-fit, minmax(${colWidthMin}, 1fr));
					gap:${blockGap};
				}
				@media (min-width: 576px) {
					.vk_gridcolcard-${blockId} {
						grid-template-columns:repeat(auto-fit, minmax(${colWidthMinTablet}, 1fr));
					}
				}
				@media (min-width: 992px) {
					.vk_gridcolcard-${blockId} {
						grid-template-columns:repeat(auto-fit, minmax(${colWidthMinPC}, 1fr));
					}
				}
				`}
			</style>
		</div>
	);
}
