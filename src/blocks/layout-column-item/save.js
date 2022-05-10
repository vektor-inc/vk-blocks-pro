import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function LayoutColumnItemSave(props) {
	const { attributes } = props;
	const { width } = attributes;

	const blockProps = useBlockProps.save({
		className: `vk_layoutColumnItem`,
	});

	const cStyle = {
		width,
	};

	const style = {};

	return (
		<>
			<div {...blockProps} style={cStyle}>
				<InnerBlocks.Content />
			</div>
			<style>{style}</style>
		</>
	);
}
