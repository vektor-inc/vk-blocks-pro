// import WordPress Scripts
import {
	InspectorControls,
	InnerBlocks,
	useBlockProps,
} from '@wordpress/block-editor';

// Load VK Blocks Compornents
import { DisplayItemsControl } from '@vkblocks/components/display-items-control';
import { ColumnLayoutControl } from '@vkblocks/components/column-layout-control';

export default function PostListEdit(props) {
	const { attributes } = props;
	const { layout } = attributes;
	const ALLOWED_BLOCKS = ['vk-blocks/select-post-list-item'];
	const TEMPLATE = [ALLOWED_BLOCKS];

	const blockProps = useBlockProps({
		className: `vk_posts vk_posts-postType-post vk_posts-layout-${layout} vk_postList`,
	});

	return (
		<>
			<InspectorControls>
				<ColumnLayoutControl {...props} />
				<DisplayItemsControl {...props} />
			</InspectorControls>
			<div {...blockProps}>
				<InnerBlocks
					template={TEMPLATE}
					allowedBlocks={ALLOWED_BLOCKS}
				/>
			</div>
		</>
	);
}
