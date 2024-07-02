import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	BaseControl,
	RangeControl,
	SelectControl,
	ToolbarGroup,
} from '@wordpress/components';
import {
	InnerBlocks,
	useBlockProps,
	InspectorControls,
	BlockControls,
} from '@wordpress/block-editor';
import { convertToGrid } from '@vkblocks/utils/convert-to-grid';
import { isHexColor } from '@vkblocks/utils/is-hex-color';
import { AdvancedColorPalette } from '@vkblocks/components/advanced-color-palette';
import LinkToolbar from '@vkblocks/components/link-toolbar';

export default function GridColumnItemEdit(props) {
	const { attributes, setAttributes } = props;
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
		linkUrl,
		linkTarget,
	} = attributes;
	const columnClass = `col-${convertToGrid(col_xs)} col-sm-${convertToGrid(
		col_sm
	)} col-md-${convertToGrid(col_md)} col-lg-${convertToGrid(
		col_lg
	)} col-xl-${convertToGrid(col_xl)} col-xxl-${convertToGrid(col_xxl)}`;
	let style;
	if (marginBottom) {
		style = { marginBottom: marginBottom + unit };
	}
	const columStyle = {
		color: isHexColor(textColor) ? textColor : undefined,
		background: isHexColor(backgroundColor) ? backgroundColor : undefined,
		paddingTop:
			paddingTop !== undefined ? paddingTop + paddingUnit : undefined,
		paddingRight:
			paddingX !== undefined ? paddingX + paddingUnit : undefined,
		paddingBottom:
			paddingBottom !== undefined
				? paddingBottom + paddingUnit
				: undefined,
		paddingLeft:
			paddingX !== undefined ? paddingX + paddingUnit : undefined,
	};

	let vkGridColumnTextColorClassName = '';
	if (textColor !== undefined) {
		vkGridColumnTextColorClassName += ` has-text-color`;
		if (!isHexColor(textColor)) {
			vkGridColumnTextColorClassName += ` has-${textColor}-color`;
		}
	}

	let vkGridColumnbackgroundColorColorClassName = '';
	if (backgroundColor !== undefined) {
		vkGridColumnbackgroundColorColorClassName += ` has-background-color`;
		if (!isHexColor(backgroundColor)) {
			vkGridColumnbackgroundColorColorClassName += ` has-${backgroundColor}-background-color`;
		}
	}

	const blockProps = useBlockProps({
		className: `vk_gridColumn_item ${columnClass}`,
		style,
	});

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<LinkToolbar
						linkUrl={linkUrl}
						setLinkUrl={(url) => setAttributes({ linkUrl: url })}
						linkTarget={linkTarget}
						setLinkTarget={(target) =>
							setAttributes({ linkTarget: target })
						}
					/>
				</ToolbarGroup>
			</BlockControls>
			<InspectorControls>
				<PanelBody title={__('Color Settings', 'vk-blocks-pro')}>
					<BaseControl
						label={__('Text Color', 'vk-blocks-pro')}
						id={`vk_grid_column_text_color`}
					>
						<AdvancedColorPalette schema={'textColor'} {...props} />
					</BaseControl>
					<BaseControl
						label={__('Background Color', 'vk-blocks-pro')}
						id={`vk_grid_column_bg_color`}
					>
						<AdvancedColorPalette
							schema={'backgroundColor'}
							{...props}
						/>
					</BaseControl>
				</PanelBody>
				<PanelBody
					title={__(
						'Margin setting inside the item',
						'vk-blocks-pro'
					)}
					initialOpen={false}
				>
					<RangeControl
						label={__('Padding (Top)', 'vk-blocks-pro')}
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
						step={'px' === paddingUnit ? 1 : 0.1}
						allowReset={true}
						resetFallbackValue={null}
					/>
					<RangeControl
						label={__('Padding (Left and Right)', 'vk-blocks-pro')}
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
						step={'px' === paddingUnit ? 1 : 0.1}
						allowReset={true}
						resetFallbackValue={null}
					/>
					<RangeControl
						label={__('Padding (Bottom)', 'vk-blocks-pro')}
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
						step={'px' === paddingUnit ? 1 : 0.1}
						allowReset={true}
						resetFallbackValue={null}
					/>
					<SelectControl
						label={__('Unit', 'vk-blocks-pro')}
						value={paddingUnit}
						onChange={(value) => {
							setAttributes({ paddingUnit: value });
							if ('px' === value) {
								setAttributes({
									paddingTop: parseInt(paddingTop),
									paddingX: parseInt(paddingX),
									paddingBottom: parseInt(paddingBottom),
								});
							}
						}}
						options={[
							{ value: 'px', label: __('px', 'vk-blocks-pro') },
							{ value: 'em', label: __('em', 'vk-blocks-pro') },
							{ value: 'rem', label: __('rem', 'vk-blocks-pro') },
							{ value: 'vw', label: __('vw', 'vk-blocks-pro') },
						]}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				{(() => {
					if (
						textColor !== undefined ||
						backgroundColor !== undefined ||
						columStyle.paddingTop !== undefined ||
						columStyle.paddingRight !== undefined ||
						columStyle.paddingBottom !== undefined ||
						columStyle.paddingLeft !== undefined
					) {
						return (
							<div
								className={`vk_gridColumn_item_inner ${vkGridColumnTextColorClassName} ${vkGridColumnbackgroundColorColorClassName}`}
								style={columStyle}
							>
								<InnerBlocks />
							</div>
						);
					}
					return <InnerBlocks />;
				})()}
			</div>
		</>
	);
}
