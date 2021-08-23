import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function AccordionEdit() {
	// blocksProps を予め定義
	const blockProps = useBlockProps({
		className: `vk_icons`,
	});

	const ALLOWED_BLOCKS = ['vk-blocks/icon'];

	const TEMPLATE = [['vk-blocks/icon'], ['vk-blocks/icon']];

	return (
		<div {...blockProps}>
			<div className={'vk_icons_col'}>
				<InnerBlocks
					allowedBlocks={ALLOWED_BLOCKS}
					template={TEMPLATE}
					templateLock={false}
				/>
			</div>
		</div>
	);
}
