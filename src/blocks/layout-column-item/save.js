import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function LayoutColumnItemSave(props) {
	const { attributes } = props;
	const { width, margin_pc, margin_tb, margin_sp } = attributes;

	const blockProps = useBlockProps.save({
		className: `vk_layoutColumnItem`,
	});

	const cStyle = {
		width,
	};

	return (
		<div
			{...blockProps}
			style={cStyle}
		>
			<InnerBlocks.Content />
		</div>
	);
}
