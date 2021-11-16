import {
	InnerBlocks,
	useBlockProps,
	JustifyContentControl,
	BlockControls,
} from '@wordpress/block-editor';

export default function ButtonOuterEdit(props) {
	const { attributes, setAttributes } = props;
	const { buttonsJustify } = attributes;

	// blocksProps を予め定義
	const blockProps = useBlockProps({
		className: `vk_buttons`,
	});

	const ALLOWED_BLOCKS = ['vk-blocks/button'];

	const TEMPLATE = [['vk-blocks/button'], ['vk-blocks/button']];

	return (
		<>
			<BlockControls group="block">
				<JustifyContentControl
					allowedControls={[
						'left',
						'center',
						'right',
						'space-between',
					]}
					value={buttonsJustify}
					onChange={(value) =>
						setAttributes({ buttonsJustify: value })
					}
					popoverProps={{
						position: 'bottom right',
						isAlternate: true,
					}}
				/>
			</BlockControls>
			<div {...blockProps}>
				<div
					className={`vk_buttons_col vk_buttons_col-justify-${buttonsJustify}`}
				>
					<InnerBlocks
						allowedBlocks={ALLOWED_BLOCKS}
						template={TEMPLATE}
						templateLock={false}
					/>
				</div>
			</div>
		</>
	);
}
