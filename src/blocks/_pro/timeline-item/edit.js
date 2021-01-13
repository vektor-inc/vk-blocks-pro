import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	BaseControl,
	SelectControl,
	TextControl,
} from '@wordpress/components';
import {
	InnerBlocks,
	InspectorControls,
	ColorPalette,
	useBlockProps,
} from '@wordpress/block-editor';

export default function TimelineItemEdit({ attributes, setAttributes }) {
	const { label, color, style, styleLine } = attributes;

	const containerClass = ' vk_timeline_item';

	let styleClass;
	let styleLineClass;
	let inlineStyle;
	const TEMPLATE = [['core/heading', { level: 4 }]];

	if (style === 'solid') {
		styleClass = ' vk_timeline_item_style-default';
		inlineStyle = { backgroundColor: `${color}` };
	} else if (style === 'outlined') {
		styleClass = ' vk_timeline_item_style-outlined';
		inlineStyle = { border: `3px solid ${color}` };
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
				<PanelBody title={__('label', 'vk-blocks')}>
					<TextControl
						value={label}
						onChange={(value) => setAttributes({ label: value })}
						placeholder={__('Ex,6:00AM', 'vk-blocks')}
					/>
				</PanelBody>
				<PanelBody title={__('Color', 'vk-blocks')}>
					<ColorPalette
						value={color}
						onChange={(value) => {
							setAttributes({
								color: value ? value : '#337ab7',
							});
						}}
					/>
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
