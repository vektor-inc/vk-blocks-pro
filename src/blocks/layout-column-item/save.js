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

	const flexBasis = undefined === width || '' === width ? 'auto' : width;
	const flexShrink = undefined === width || '' === width ? 1 : 0;
	const flexGrow = undefined === width || '' === width ? 1 : 0;

	const cStyle = {
		flexBasis,
		flexGrow,
		flexShrink,
	};

	const style = `
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
			<div {...blockProps} style={cStyle}>
				<InnerBlocks.Content />
			</div>
			<style>{style}</style>
		</>
	);
}
