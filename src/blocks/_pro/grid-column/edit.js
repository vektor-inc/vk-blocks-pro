import { ColumnLayout } from '@vkblocks/components/column-layout';
import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	InnerBlocks,
	useBlockProps,
} from '@wordpress/block-editor';
import { select, dispatch } from '@wordpress/data';
import { PanelBody, RangeControl, SelectControl } from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import { isParentReusableBlock } from '@vkblocks/utils/is-parent-reusable-block';

export default function GridColumnEdit(props) {
	const { attributes, clientId } = props;

	const { getBlocksByClientId } = select('core/block-editor');
	const { updateBlockAttributes } = dispatch('core/block-editor');

	useEffect(() => {
		if (
			clientId === undefined ||
			isParentReusableBlock(clientId) === false
		) {
			const thisBlock = getBlocksByClientId(clientId);
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
		}
	}, [props]);

	const ALLOWED_BLOCKS = ['vk-blocks/grid-column-item'];
	const TEMPLATE = [['vk-blocks/grid-column-item']];
	const blockProps = useBlockProps({
		className: `vk_gridColumn`,
	});
	const marginBottom = attributes.marginBottom;
	const unit = attributes.unit;

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('Layout Columns', 'vk-blocks-pro')}
					initialOpen={false}
				>
					<ColumnLayout {...props} />
				</PanelBody>
				<PanelBody
					title={__('Column Margin Bottom Setting', 'vk-blocks-pro')}
					initialOpen={false}
				>
					<RangeControl
						label={__('Margin Bottom', 'vk-blocks-pro')}
						value={marginBottom}
						onChange={(value) => {
							props.setAttributes({ marginBottom: value });
							if (undefined === value) {
								props.setAttributes({ unit: 'px' });
							}
						}}
						min={0}
						max={100}
						step={'px' === unit ? 1 : 0.1}
						allowReset={true}
						resetFallbackValue={null}
					/>
					<SelectControl
						label={__('Unit', 'vk-blocks-pro')}
						value={unit}
						onChange={(value) => {
							props.setAttributes({ unit: value });
							if ('px' === value) {
								props.setAttributes({
									marginBottom: parseInt(marginBottom),
								});
							}
						}}
						options={[
							{
								value: 'px',
								label: __('px', 'vk-blocks-pro'),
							},
							{
								value: 'em',
								label: __('em', 'vk-blocks-pro'),
							},
							{
								value: 'rem',
								label: __('rem', 'vk-blocks-pro'),
							},
							{
								value: 'vw',
								label: __('vw', 'vk-blocks-pro'),
							},
						]}
					/>
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
