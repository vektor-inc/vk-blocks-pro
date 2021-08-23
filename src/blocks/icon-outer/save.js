import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save() {
	//blocksProps を予め定義
	const blockProps = useBlockProps.save({
		className: `vk_icons`,
	});

	return (
		<div {...blockProps}>
			<div className={'vk_icons_col'}>
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
