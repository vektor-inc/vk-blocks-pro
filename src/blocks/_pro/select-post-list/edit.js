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
import { convertToGrid } from '@vkblocks/utils/convert-to-grid';

export default function SelectPostListEdit(props) {
	const { attributes, clientId } = props;
	// eslint-disable-next-line camelcase
	const {
		layout, //eslint-disable-line camelcase
		col_xs, //eslint-disable-line camelcase
		col_sm, //eslint-disable-line camelcase
		col_md, //eslint-disable-line camelcase
		col_lg, //eslint-disable-line camelcase
		col_xl, //eslint-disable-line camelcase
		col_xxl, //eslint-disable-line camelcase
		display_image, //eslint-disable-line camelcase
		display_image_overlay_term, //eslint-disable-line camelcase
		display_excerpt, //eslint-disable-line camelcase
		display_author, //eslint-disable-line camelcase
		display_date, //eslint-disable-line camelcase
		display_new, //eslint-disable-line camelcase
		display_taxonomies, //eslint-disable-line camelcase
		display_btn, //eslint-disable-line camelcase
		new_date, //eslint-disable-line camelcase
		new_text, //eslint-disable-line camelcase
		btn_text, //eslint-disable-line camelcase
		btn_align, //eslint-disable-line camelcase
	} = attributes;
	// eslint-disable-next-line camelcase
	const columnClass = `vk_selectPostList-edit-col-${convertToGrid(
		col_xs
	)} vk_selectPostList-edit-col-sm-${convertToGrid(
		col_sm
	)} vk_selectPostList-edit-col-md-${convertToGrid(
		col_md
	)} vk_selectPostList-edit-col-lg-${convertToGrid(
		col_lg
	)} vk_selectPostList-edit-col-xl-${convertToGrid(
		col_xl
	)} vk_selectPostList-edit-col-xxl-${convertToGrid(col_xxl)}`;

	const { getBlocksByClientId } = select('core/block-editor');
	const { updateBlockAttributes } = dispatch('core/block-editor');

	const thisBlock = getBlocksByClientId(clientId);

	useEffect(() => {
		if (thisBlock && thisBlock[0] && thisBlock[0].innerBlocks) {
			const thisInnerBlocks = thisBlock[0].innerBlocks;

			thisInnerBlocks.forEach(function (thisInnerBlock) {
				updateBlockAttributes(thisInnerBlock.clientId, {
					layout,
					col_xs,
					col_sm,
					col_md,
					col_lg,
					col_xl,
					col_xxl,
					display_image,
					display_image_overlay_term,
					display_excerpt,
					display_author,
					display_date,
					display_new,
					display_taxonomies,
					display_btn,
					new_date,
					new_text,
					btn_text,
					btn_align,
				});
			});
		}
	}, [thisBlock, attributes]);

	const ALLOWED_BLOCKS = ['vk-blocks/select-post-list-item'];
	const TEMPLATE = [['vk-blocks/select-post-list-item']];

	let addColumnClass;
	if (layout !== 'postListText') {
		addColumnClass = columnClass;
	} else {
		addColumnClass = '';
	}

	const blockProps = useBlockProps({
		className: `vk_posts vk_posts-postType-post vk_posts-layout-${layout} vk_postList vk_selectPostList-edit ${addColumnClass}`,
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
					orientation="horizontal"
				/>
			</div>
		</>
	);
}
