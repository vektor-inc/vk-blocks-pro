import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	BaseControl,
	SelectControl,
	TextControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';
import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';
import { isHexColor } from '@vkblocks/utils/is-hex-color';
import { AdvancedColorPalette } from '@vkblocks/components/advanced-color-palette';
import { sanitizeSlug } from '@vkblocks/utils/sanitizeSlug';

export default function TimelineItemEdit(props) {
	const { attributes, setAttributes } = props;
	const { label, color, style, styleLine } = attributes;

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
				styleClass += ` has-${sanitizeSlug(color)}-background-color`;
			}
		}
	} else if (style === 'outlined') {
		styleClass = ' vk_timeline_item_style-outlined';
		if (color !== undefined) {
			styleClass += ` has-text-color`;
			if (isHexColor(color)) {
				inlineStyle = { color: `${color}` };
			} else {
				styleClass += ` has-${sanitizeSlug(color)}-color`;
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
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('label', 'vk-blocks-pro')}>
					<TextControl
						value={label}
						onChange={(value) => setAttributes({ label: value })}
						placeholder={__('Ex,6:00AM', 'vk-blocks-pro')}
					/>
				</PanelBody>
				<PanelBody title={__('Color', 'vk-blocks-pro')}>
					<AdvancedColorPalette schema={'color'} {...props} />
				</PanelBody>
				<PanelBody title={__('Style', 'vk-blocks-pro')}>
					<BaseControl id="style-dot" label="Dot Style">
						<SelectControl
							value={style}
							onChange={(value) =>
								setAttributes({ style: value })
							}
							options={[
								{
									value: 'outlined',
									label: __('Outlined', 'vk-blocks-pro'),
								},
								{
									value: 'solid',
									label: __('Solid', 'vk-blocks-pro'),
								},
							]}
						/>
					</BaseControl>
					<BaseControl id="style-line">
						<ToggleGroupControl
							label={__('Line style', 'vk-blocks-pro')}
							value={styleLine}
							onChange={(value) =>
								setAttributes({ styleLine: value })
							}
							isBlock
						>
							<ToggleGroupControlOption
								value="default"
								label={__('Default', 'vk-blocks-pro')}
							/>
							<ToggleGroupControlOption
								value="none"
								label={__('None', 'vk-blocks-pro')}
							/>
						</ToggleGroupControl>
					</BaseControl>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				{label !== undefined && label !== '' && (
					<div className={'vk_timeline_item_caption'}>{label}</div>
				)}
				<div className={'vk_timeline_item_content'}>
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
