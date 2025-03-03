import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save(props) {
	const { attributes } = props;
	const { iconsJustify } = attributes;
	//blocksProps を予め定義
	const blockProps = useBlockProps.save({
		className: `vk_icons`,
	});

	return (
		<div {...blockProps}>
			<div
				className={`vk_icons_col vk_icons_col-justify-${iconsJustify}`}
			>
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
