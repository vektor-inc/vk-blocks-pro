import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		breakPoint,
		blockId
	} = attributes;

	const blockProps = useBlockProps.save({
		className: `vk_layoutColumn vk-layoutColumn-${blockId}`,
	});

	const style = `@media (min-width: ${breakPoint}px) {
		.vk-layoutColumn-${blockId} {
			display: flex;
			flex-wrap: wrap;
		}
	}`;

	return (
		<>
			<div {...blockProps} data-breakpoint={breakPoint}>
				<InnerBlocks.Content />
			</div>
			<style>
				{style}
			</style>
		</>
	);
}
