import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { breakPoint, blockId } = attributes;

	const blockProps = useBlockProps.save({
		className: `vk_layoutColumn vk_layoutColumn-${blockId}`,
	});

	const style = `@media (min-width: ${breakPoint}px) {
		.vk_layoutColumn-${blockId} {
			flex-wrap: nowrap;
		}
	}
	@media (max-width: ${breakPoint - 0.02}px) {
		.vk_layoutColumn-${blockId} {
			flex-wrap: wrap;
		}		
		.vk_layoutColumn-${blockId} .vk_layoutColumnItem {
			flex-basis:100% !important;
		}
	}
	`;

	return (
		<>
			<div {...blockProps} data-breakpoint={breakPoint}>
				<InnerBlocks.Content />
			</div>
			<style>{style}</style>
		</>
	);
}
