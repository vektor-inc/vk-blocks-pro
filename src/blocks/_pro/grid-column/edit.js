import { ColumnLayout } from '@vkblocks/components/column-layout';
import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	InnerBlocks,
	useBlockProps,
} from '@wordpress/block-editor';
import { select, dispatch } from '@wordpress/data';
import { PanelBody } from '@wordpress/components';

/* eslint camelcase: 0 */
export default function GridColumnEdit(props) {
	const { attributes, clientId } = props;

	const { getBlocksByClientId } = select('core/block-editor');
	const { updateBlockAttributes } = dispatch('core/block-editor');

	const thisBlock = getBlocksByClientId(clientId);

	let beforeLength;
	let afterLength;

	if (
		thisBlock !== undefined &&
		thisBlock[0] !== null &&
		thisBlock[0].innerBlocks !== undefined
	) {
		const innerBlocks = thisBlock[0].innerBlocks;
		beforeLength = innerBlocks.length;

		if (beforeLength !== undefined) {
			if (beforeLength !== afterLength) {
				for (let i = 0; i < innerBlocks.length; i++) {
					if (innerBlocks[i] !== undefined) {
						updateBlockAttributes(innerBlocks[i].clientId, {
							name: attributes.name,
							layout: attributes.layout,
							col_xs: attributes.col_xs,
							col_sm: attributes.col_sm,
							col_md: attributes.col_md,
							col_lg: attributes.col_lg,
							col_xl: attributes.col_xl,
							col_xxl: attributes.col_xxl,
						});
					}
				}
			}
			afterLength = beforeLength;
		}
	}
	const ALLOWED_BLOCKS = [['vk-blocks/grid-column-item']];
	const TEMPLATE = ALLOWED_BLOCKS;

	const blockProps = useBlockProps({
		className: `vk_grid-column`,
	});

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
