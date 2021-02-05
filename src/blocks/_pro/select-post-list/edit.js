// import WordPress Scripts
import {
	InspectorControls,
	InnerBlocks,
	useBlockProps,
} from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import { select, dispatch } from '@wordpress/data';

// Load VK Blocks Compornents
import { DisplayItemsControl } from '@vkblocks/components/display-items-control';
import { ColumnLayoutControl } from '@vkblocks/components/column-layout-control';

export default function SelectPostListEdit(props) {
	const { attributes, clientId } = props;
	const { layout } = attributes;

	const { getBlocksByClientId } = select('core/block-editor');
	const { updateBlockAttributes } = dispatch('core/block-editor');

	const thisBlock = getBlocksByClientId(clientId);

	useEffect(() => {
		if (thisBlock && thisBlock[0] && thisBlock[0].innerBlocks) {
			const thisInnerBlocks = thisBlock[0].innerBlocks;

			thisInnerBlocks.forEach(function (thisInnerBlock) {
				updateBlockAttributes(thisInnerBlock.clientId, {
					name: attributes.name,
					layout: attributes.layout,
					col_xs: attributes.col_xs,
					col_sm: attributes.col_sm,
					col_md: attributes.col_md,
					col_lg: attributes.col_lg,
					col_xl: attributes.col_xl,
					col_xxl: attributes.col_xxl,
					display_image:attributes.display_image,
					display_image_overlay_term:attributes.display_image_overlay_term,
					display_excerpt:attributes.display_excerpt,
					display_author:attributes.display_author,
					display_date:attributes.display_date,
					display_new:attributes.display_new,
					display_taxonomies:attributes.display_taxonomies,
					display_btn:attributes.display_btn,
					new_date:attributes.new_date,
					new_text:attributes.new_text,
					btn_text:attributes.btn_text,
					btn_align:attributes.btn_align
				});
			});
		}
	}, [thisBlock, attributes]);

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
