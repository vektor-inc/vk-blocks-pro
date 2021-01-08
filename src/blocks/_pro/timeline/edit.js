import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';

export default function TilelineEdit() {
	const blockProps = useBlockProps({
		className: `vk_timeline`,
	});
	const ALLOWED_BLOCKS = ['vk-blocks/timeline-item'];
	const TEMPLATE = [ALLOWED_BLOCKS];
	return (
		<Fragment>
			<div {...blockProps}>
				<InnerBlocks
					template={TEMPLATE}
					allowedBlocks={ALLOWED_BLOCKS}
				/>
			</div>
		</Fragment>
	);
}
