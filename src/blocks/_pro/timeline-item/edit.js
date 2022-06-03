import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	BaseControl,
	SelectControl,
	TextControl,
	__experimentalUnitControl as UnitControl,
} from '@wordpress/components';
import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';
import { isHexColor } from '@vkblocks/utils/is-hex-color';
import { AdvancedColorPalette } from '@vkblocks/components/advanced-color-palette';

export default function TimelineItemEdit(props) {
	const { attributes, setAttributes } = props;
	const { label, color, style, styleLine, outerPaddingBottom } = attributes;

	const containerClass = ' vk_timeline_item';

	let styleClass = '';
	let inlineStyle = {};
	let styleLineClass = '';
	const TEMPLATE = [['core/heading', { level: 4 }]];

	if (style === 'solid') {
		styleClass = ' vk_timeline_item_style-default';
		if (color !== undefined) {
			styleClass += ` has-background`;
			if (isHexColor(color)) {
				inlineStyle = { backgroundColor: `${color}` };
			} else {
				styleClass += ` has-${color}-background-color`;
			}
		}
	} else if (style === 'outlined') {
		styleClass = ' vk_timeline_item_style-outlined';
		if (color !== undefined) {
			styleClass += ` has-text-color`;
			if (isHexColor(color)) {
				inlineStyle = { color: `${color}` };
			} else {
				styleClass += ` has-${color}-color`;
			}
		}
	}

	if (styleLine === 'default') {
		styleLineClass = ' vk_timeline_item_lineStyle-default';
	} else if (styleLine === 'none') {
		styleLineClass = ' vk_timeline_item_lineStyle-none';
	}

	const blockProps = useBlockProps({
		className: containerClass + styleLineClass,
		style: { paddingBottom: outerPaddingBottom },
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('label', 'vk-blocks')}>
					<TextControl
						value={label}
						onChange={(value) => setAttributes({ label: value })}
						placeholder={__('Ex,6:00AM', 'vk-blocks')}
					/>
				</PanelBody>
				<PanelBody title={__('Color', 'vk-blocks')}>
					<AdvancedColorPalette schema={'color'} {...props} />
				</PanelBody>
				<PanelBody title={__('Style', 'vk-blocks')}>
					<BaseControl id="style-dot" label="Dot Style">
						<SelectControl
							value={style}
							onChange={(value) =>
								setAttributes({ style: value })
							}
							options={[
								{
									value: 'outlined',
									label: __('Outlined', 'vk-blocks'),
								},
								{
									value: 'solid',
									label: __('Solid', 'vk-blocks'),
								},
							]}
						/>
					</BaseControl>
					<BaseControl id="style-line" label="Line Style">
						<SelectControl
							value={styleLine}
							onChange={(value) =>
								setAttributes({ styleLine: value })
							}
							options={[
								{
									value: 'default',
									label: __('Default', 'vk-blocks'),
								},
								{
									value: 'none',
									label: __('None', 'vk-blocks'),
								},
							]}
						/>
					</BaseControl>
					<BaseControl
						id="outer-padding-bottom"
						label="Outer Padding Bottom"
					>
						<UnitControl
							value={outerPaddingBottom}
							onChange={(value) =>
								setAttributes({
									outerPaddingBottom: value ? value : null,
								})
							}
						/>
					</BaseControl>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<div className={'vk_timeline_item_caption'}>{label}</div>
				<div className={'vk_timeline_item_contentnpm'}>
					<InnerBlocks template={TEMPLATE} />
				</div>
				<div
					className={'vk_timeline_item_style' + styleClass}
					style={inlineStyle}
				/>
			</div>
		</>
	);
}
