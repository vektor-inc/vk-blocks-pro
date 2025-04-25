import { FontAwesome } from '@vkblocks/utils/font-awesome-new';
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
	InspectorControls,
	InnerBlocks,
	useBlockProps,
} from '@wordpress/block-editor';
import parse from 'html-react-parser';
import { isHexColor } from '@vkblocks/utils/is-hex-color';
import { useEffect } from '@wordpress/element';
import { AdvancedColorPalette } from '@vkblocks/components/advanced-color-palette';

export default function StepItemEdit(props) {
	const { attributes, setAttributes, clientId } = props;
	const { color, style, styleLine, dotCaption, dotNum, faIcon } = attributes;

	const containerClass = ' vk_step_item';
	let styleClass = '';
	let inlineStyle = {};
	let styleLineClass = '';

	// eslint-disable-next-line no-undef
	const iconFamily = vkFontAwesome.iconFamily;

	const TEMPLATE = [['core/heading', { level: 4 }], ['core/paragraph']];

	// コンソールエラー回避のため useEffect を使用（実行タイミングの問題）
	useEffect(() => {
		//過去バージョンをリカバリーした時にiconを正常に表示する
		if (faIcon && !faIcon.match(/<i/)) {
			setAttributes({ faIcon: `<i class="${faIcon}"></i>` });
		}
	}, [clientId]);

	if (style === 'solid') {
		styleClass = ' vk_step_item_style-default';
		if (color !== undefined) {
			styleClass += ` has-background`;
			if (isHexColor(color)) {
				inlineStyle = { backgroundColor: `${color}` };
			} else {
				styleClass += ` has-${color}-background-color`;
			}
		}
	} else if (style === 'outlined') {
		styleClass = ' vk_step_item_style-outlined';
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
		styleLineClass = ' vk_step_item_lineStyle-default';
	} else if (styleLine === 'none') {
		styleLineClass = ' vk_step_item_lineStyle-none';
	}

	const blockProps = useBlockProps({
		className: `${containerClass} ${styleLineClass}`,
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Step Mark', 'vk-blocks-pro')}>
					<BaseControl
						id="dot-fa"
						label={
							__('Icon', 'vk-blocks-pro') +
							' ( ' +
							iconFamily +
							' )'
						}
						help={__(
							'If Font Awesome tags entered, it will overrides the number.',
							'vk-blocks-pro'
						)}
					>
						<FontAwesome attributeName={'faIcon'} {...props} />
					</BaseControl>

					<BaseControl id="dot-caption" label="Caption">
						<TextControl
							value={dotCaption}
							onChange={(value) =>
								setAttributes({ dotCaption: value })
							}
							placeholder={__('Ex,6:00AM', 'vk-blocks-pro')}
						/>
					</BaseControl>
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
									value: 'solid',
									label: __('Solid', 'vk-blocks-pro'),
								},
								{
									value: 'outlined',
									label: __('Outlined', 'vk-blocks-pro'),
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
				<div className={'vk_step_item_content'}>
					<InnerBlocks template={TEMPLATE} />
				</div>
				<div
					className={'vk_step_item_dot' + styleClass}
					style={inlineStyle}
				>
					<div className={'vk_step_item_dot_caption'}>
						{dotCaption}
					</div>
					{(() => {
						if (faIcon) {
							return parse(faIcon);
						} else if (dotNum) {
							return (
								<div className={'vk_step_item_dot_num'}>
									{dotNum}
								</div>
							);
						}
					})()}
				</div>
			</div>
		</>
	);
}
