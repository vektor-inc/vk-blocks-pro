import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function LayoutColumnItemSave(props) {
	const { attributes } = props;
	const { width, margin_pc, margin_tb, margin_sp, blockId } = attributes;

	const blockProps = useBlockProps.save({
		className: `vk_layoutColumnItem vk_layoutColumnItem-${blockId}`,
	});

	const mobileViewport = '(max-width: 575.98px)';
	const tabletViewport = '(min-width: 576px) and (max-width: 991.98px)';
	const pcViewport = '(min-width: 992px)';

	const style = `
	.vk_layoutColumn .vk_layoutColumnItem-${blockId} {
		width: ${width}
	}
	@media ${pcViewport} {
		.vk_layoutColumn .vk_layoutColumnItem-${blockId} {
			padding: ${margin_pc.top} ${margin_pc.right} ${margin_pc.bottom} ${margin_pc.left}
		}
	}
	@media ${tabletViewport} {
		.vk_layoutColumn .vk_layoutColumnItem-${blockId} {
			padding: ${margin_tb.top} ${margin_tb.right} ${margin_tb.bottom} ${margin_tb.left}
		}
	}
	@media ${mobileViewport} {
		.vk_layoutColumn .vk_layoutColumnItem-${blockId} {
			padding: ${margin_sp.top} ${margin_sp.right} ${margin_sp.bottom} ${margin_sp.left}
		}
	}`;
	return (
		<>
			<div {...blockProps}>
				<InnerBlocks.Content />
			</div>
			<style>{style}</style>
		</>
	);
}
