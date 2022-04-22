import { ColumnLayout } from '@vkblocks/components/column-layout';
import AdvancedUnitControl from '@vkblocks/components/advanced-unit-control';
import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	InnerBlocks,
	useBlockProps,
} from '@wordpress/block-editor';
import { select, dispatch } from '@wordpress/data';
import { PanelBody, RangeControl } from '@wordpress/components';
import { useEffect } from '@wordpress/element';

export default function GridColumnEdit(props) {
	const { attributes, clientId } = props;

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
					marginBottom: attributes.marginBottom,
					unit: attributes.unit,
				});
			});
		}
	}, [thisBlock, attributes]);

	const ALLOWED_BLOCKS = ['vk-blocks/grid-column-item'];
	const TEMPLATE = [['vk-blocks/grid-column-item']];
	const blockProps = useBlockProps({
		className: `vk_gridColumn`,
	});
	const marginBottom = attributes.marginBottom;

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('Layout Columns', 'vk-blocks')}
					initialOpen={false}
				>
					<ColumnLayout {...props} />
				</PanelBody>
				<PanelBody
					title={__('Column Margin Bottom Setting', 'vk-blocks')}
					initialOpen={false}
				>
					<RangeControl
						label={__('Margin Bottom', 'vk-blocks')}
						value={marginBottom}
						onChange={(value) => {
							props.setAttributes({ marginBottom: value });
							if (undefined === value) {
								props.setAttributes({ unit: 'px' });
							}
						}}
						min={0}
						max={100}
						allowReset={true}
						resetFallbackValue={null}
					/>
					<AdvancedUnitControl {...props} />
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<InnerBlocks
					//編集画面の追加タグ用に2回目のClassを挿入
					template={TEMPLATE}
					allowedBlocks={ALLOWED_BLOCKS}
					orientation="horizontal"
				/>
			</div>
		</>
	);
}
