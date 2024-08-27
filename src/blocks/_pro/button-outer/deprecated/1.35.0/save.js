import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save(props) {
	const { attributes } = props;
	const { buttonsJustify } = attributes;
	//blocksProps を予め定義
	const blockProps = useBlockProps.save({
		className: `vk_buttons`,
	});

	return (
		<div {...blockProps}>
			<div
				className={`vk_buttons_col vk_buttons_col-justify-${buttonsJustify}`}
			>
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
