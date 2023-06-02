import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	BaseControl,
	SelectControl,
	TextControl,
	ButtonGroup,
	Button,
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
					<BaseControl id="style-line" label="Line Style">
						<ButtonGroup className={`mb-3`}>
							<Button
								isSmall
								isPrimary={styleLine === 'default'}
								isSecondary={styleLine !== 'default'}
								onClick={() =>
									setAttributes({ styleLine: 'default' })
								}
							>
								{__('Default', 'vk-blocks-pro')}
							</Button>
							<Button
								isSmall
								isPrimary={styleLine === 'none'}
								isSecondary={styleLine !== 'none'}
								onClick={() =>
									setAttributes({ styleLine: 'none' })
								}
							>
								{__('None', 'vk-blocks-pro')}
							</Button>
						</ButtonGroup>
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
