import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
// import {
// 	useState
// } from '@wordpress/element';
export default function save(props) {
	const { attributes } = props;
	const containerClass = 'vk_gridcolcard';
	const { colWidthMin, gap, gapRow } = attributes;

	let style;
	if (colWidthMin) {
		style = {
			gridTemplateColumns: `repeat(auto-fit, minmax(${colWidthMin}, 1fr))`,
		};
		if (gapRow) {
			style.gap = `${gapRow} ${gap}`;
		} else {
			style.gap = `${gap}`;
		}
	}
	const blockProps = useBlockProps.save({
		className: `${containerClass}`,
		style,
	});

	return (
		<div {...blockProps}>
			<InnerBlocks.Content />
		</div>
	);
}
