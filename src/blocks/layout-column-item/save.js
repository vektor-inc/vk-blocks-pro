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

	const dataMarginPc =
		margin_pc.top +
		' ' +
		margin_pc.right +
		' ' +
		margin_pc.bottom +
		' ' +
		margin_pc.left;
	const dataMarginTb =
		margin_tb.top +
		' ' +
		margin_tb.right +
		' ' +
		margin_tb.bottom +
		' ' +
		margin_tb.left;
	const dataMarginSp =
		margin_sp.top +
		' ' +
		margin_sp.right +
		' ' +
		margin_sp.bottom +
		' ' +
		margin_sp.left;

	return (
		<div
			{...blockProps}
			style={cStyle}
			data-vkbMarginPc={dataMarginPc}
			data-vkbMarginTb={dataMarginTb}
			data-vkbMarginSp={dataMarginSp}
		>
			<InnerBlocks.Content />
		</div>
	);
}
