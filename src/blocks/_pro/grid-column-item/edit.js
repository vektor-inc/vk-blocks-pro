import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	BaseControl,
	RangeControl,
	SelectControl,
} from '@wordpress/components';
import {
	InnerBlocks,
	useBlockProps,
	InspectorControls,
	ColorPalette,
} from '@wordpress/block-editor';
import { convertToGrid } from '@vkblocks/utils/convert-to-grid';

export default function GridColumnItemEdit(props) {
	const { attributes, setAttributes } = props;
	// eslint-disable-next-line camelcase
	const {
		col_xs,
		col_sm,
		col_md,
		col_lg,
		col_xl,
		col_xxl,
		marginBottom,
		unit,
		textColor,
		backgroundColor,
		paddingTop,
		paddingX,
		paddingBottom,
		paddingUnit,
	} = attributes;
	// eslint-disable-next-line camelcase
	const columnClass = `col-${convertToGrid(col_xs)} col-sm-${convertToGrid(
		col_sm
	)} col-md-${convertToGrid(col_md)} col-lg-${convertToGrid(
		col_lg
	)} col-xl-${convertToGrid(col_xl)} col-xxl-${convertToGrid(col_xxl)}`;
	// margin bottom
	let style;
	if (marginBottom) {
		style = { marginBottom: marginBottom + unit };
	}
	const columStyle = {
		color:
			textColor !== null && textColor !== undefined
				? textColor
				: undefined,
		background:
			backgroundColor !== null && backgroundColor !== undefined
				? backgroundColor
				: undefined,
		paddingTop:
			paddingTop !== null && paddingTop !== undefined
				? paddingTop + paddingUnit
				: undefined,
		paddingRight:
			paddingX !== null && paddingX !== undefined
				? paddingX + paddingUnit
				: undefined,
		paddingBottom:
			paddingBottom !== null && paddingBottom !== undefined
				? paddingBottom + paddingUnit
				: undefined,
		paddingLeft:
			paddingX !== null && paddingX !== undefined
				? paddingX + paddingUnit
				: undefined,
	};

	const blockProps = useBlockProps({
		className: `vk_gridColumn_item ${columnClass}`,
		style,
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Color Settings', 'vk-blocks')}>
					<BaseControl
						label={__('Text Color', 'vk-blocks')}
						id={`vk_grid_column_text_color`}
					>
						<ColorPalette
							value={textColor}
							onChange={(value) =>
								setAttributes({ textColor: value })
							}
						/>
					</BaseControl>
					<BaseControl
						label={__('Background Color', 'vk-blocks')}
						id={`vk_grid_column_bg_color`}
					>
						<ColorPalette
							value={backgroundColor}
							onChange={(value) =>
								setAttributes({ backgroundColor: value })
							}
						/>
					</BaseControl>
				</PanelBody>
				<PanelBody
					title={__('Margin setting inside the item', 'vk-blocks')}
					initialOpen={false}
				>
					<RangeControl
						label={__('Padding (Top)', 'vk-blocks')}
						value={paddingTop}
						initialPosition={0}
						onChange={(value) => {
							props.setAttributes({ paddingTop: value });
							if (undefined === value) {
								props.setAttributes({ paddingUnit: 'px' });
							}
						}}
						min={0}
						max={300}
						allowReset={true}
						resetFallbackValue={null}
					/>
					<RangeControl
						label={__('Padding (Left and Right)', 'vk-blocks')}
						value={paddingX}
						initialPosition={0}
						onChange={(value) => {
							props.setAttributes({ paddingX: value });
							if (undefined === value) {
								props.setAttributes({ paddingUnit: 'px' });
							}
						}}
						min={0}
						max={300}
						allowReset={true}
						resetFallbackValue={null}
					/>
					<RangeControl
						label={__('Padding (Bottom)', 'vk-blocks')}
						value={paddingBottom}
						initialPosition={0}
						onChange={(value) => {
							props.setAttributes({ paddingBottom: value });
							if (undefined === value) {
								props.setAttributes({ paddingUnit: 'px' });
							}
						}}
						min={0}
						max={300}
						allowReset={true}
						resetFallbackValue={null}
					/>
					<SelectControl
						label={__('Unit', 'vk-blocks')}
						value={paddingUnit}
						onChange={(value) =>
							setAttributes({ paddingUnit: value })
						}
						options={[
							{
								value: 'px',
								label: __('px', 'vk-blocks'),
							},
							{
								value: 'em',
								label: __('em', 'vk-blocks'),
							},
							{
								value: 'rem',
								label: __('rem', 'vk-blocks'),
							},
							{
								value: 'vw',
								label: __('vw', 'vk-blocks'),
							},
						]}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				{
					(() => {
						if (
							columStyle.textColor !== undefined ||
							columStyle.backgroundColor !== undefined ||
							columStyle.paddingTop !== undefined ||
							columStyle.paddingX !== undefined ||
							columStyle.paddingBottom !== undefined
						) {
							return (
								<div className="vk_gridColumn_item_inner" style={columStyle}>
									<InnerBlocks />
								</div>
							)
						} else {
							return <InnerBlocks />
						}
					})()
				}
			</div>
		</>
	);
}
