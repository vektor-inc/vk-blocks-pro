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
		padding,
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
		paddingLeft:
			padding !== null && padding !== undefined
				? padding + paddingUnit
				: undefined,
		paddingRight:
			padding !== null && padding !== undefined
				? padding + paddingUnit
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
						label={__('Text Color Settings', 'vk-blocks')}
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
						label={__('Background Color Settings', 'vk-blocks')}
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
					title={__('Column Padding Setting', 'vk-blocks')}
					initialOpen={false}
				>
					<RangeControl
						label={__('Padding', 'vk-blocks')}
						value={padding}
						onChange={(value) => {
							props.setAttributes({ padding: value });
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
						onChange={(value) => setAttributes({ paddingUnit: value })}
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
				<div className="vk_gridColumn_item_inner" style={columStyle} >
					<InnerBlocks />
				</div>
			</div>
		</>
	);
}
