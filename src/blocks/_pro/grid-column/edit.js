import { ColumnLayout } from '@vkblocks/components/column-layout';
import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	InnerBlocks,
	useBlockProps,
} from '@wordpress/block-editor';
import { select, dispatch } from '@wordpress/data';
import { PanelBody } from '@wordpress/components';
import { useEffect } from '@wordpress/element';

/* eslint camelcase: 0 */
export default function GridColumnEdit(props) {
	const { attributes, clientId } = props;

	const { getBlocksByClientId } = select('core/block-editor');
	const { updateBlockAttributes } = dispatch('core/block-editor');

	const thisBlock = getBlocksByClientId(clientId);

	useEffect(
		() => {
			if( thisBlock && thisBlock[0] && thisBlock[0].innerBlocks) {

				const thisInnerBlocks = thisBlock[0].innerBlocks;
				thisInnerBlocks.forEach(function( element, index ){
					updateBlockAttributes(thisInnerBlocks[index].clientId, {
						name: attributes.name,
						layout: attributes.layout,
						col_xs: attributes.col_xs,
						col_sm: attributes.col_sm,
						col_md: attributes.col_md,
						col_lg: attributes.col_lg,
						col_xl: attributes.col_xl,
						col_xxl: attributes.col_xxl,
					});
				})
			}
		}
		,[thisBlock,attributes]
	);

	const ALLOWED_BLOCKS = [['vk-blocks/grid-column-item']];
	const TEMPLATE = ALLOWED_BLOCKS;
	const blockProps = useBlockProps();

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('Layout Columns', 'vk-blocks')}
					initialOpen={false}
				>
					<ColumnLayout {...props} />
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<InnerBlocks
					//編集画面の追加タグ用に2回目のClassを挿入
					template={TEMPLATE}
					allowedBlocks={ALLOWED_BLOCKS}
				/>
			</div>
		</>
	);
}
