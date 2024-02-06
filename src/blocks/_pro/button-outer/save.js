import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save(props) {
	const { attributes } = props;
	const { buttonsJustify, gap } = attributes;
	//blocksProps を予め定義
	const blockProps = useBlockProps.save({
		className: `vk_buttons`,
	});

	const style = gap
		? {
				gap: `${gap};`,
		  }
		: null;

	return (
		<div {...blockProps}>
			<div
				className={`vk_buttons_col vk_buttons_col-justify-${buttonsJustify}`}
				style={style}
			>
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
