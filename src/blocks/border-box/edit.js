import { __ } from '@wordpress/i18n';
import { FontAwesome } from '@vkblocks/utils/font-awesome-new';
import { PanelBody, BaseControl, SelectControl } from '@wordpress/components';
import {
	InspectorControls,
	InnerBlocks,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import ReactHtmlParser from 'react-html-parser';
import { AdvancedColorPalette } from '@vkblocks/components/advanced-color-palette';
import { isHexColor } from '@vkblocks/utils/is-hex-color';

export default function BorderBoxEdit(props) {
	const { attributes, setAttributes } = props;
	const { heading, color, faIcon, bgColor } = attributes;

	const inner = (
		<InnerBlocks templateLock={false} template={[['core/paragraph']]} />
	);
	const title = (
		<RichText
			tagName="h4"
			className={'vk_borderBox_title'}
			onChange={(value) => setAttributes({ heading: value })}
			value={heading}
			placeholder={__('Please enter a title.', 'vk-blocks')}
		/>
	);

	// legacy class
	let legacyClass = `vk_borderBox`;
	const colors = ['red', 'orange', 'blue', 'green', 'black'];

	// title background
	let titleClass = `vk_borderBox_title_container`;
	let titleStyle = {};

	if (color !== undefined) {
		if (isHexColor(color)) {
			// custom color
			titleClass += ` has-background`;
			titleStyle = {
				color: `${color}`,
			};
		} else if (colors.includes(color)) {
			// legacy  style
			legacyClass += ` vk_borderBox-color-${color} vk_borderBox-background-${bgColor}`;
		} else {
			// has style
			titleClass += ` has-background has-${color}-background-color`;
		}
	}

	// body border
	let bodyClass = `vk_borderBox_body`;
	let bodyStyle = {};

	if (color !== undefined) {
		if (isHexColor(color)) {
			// custom color
			bodyClass += ` has-text-color`;
			bodyStyle = {
				color: `${color}`,
			};
		} else if (colors.includes(color)) {
			// legacy  style
			legacyClass += ` vk_borderBox-color-${color} vk_borderBox-background-${bgColor}`;
		} else {
			// has style
			bodyClass += ` has-text-color has-${color}-color`;
		}
	}

	const blockProps = useBlockProps({
		className: legacyClass,
	});

	//Defaultクラスを設定
	if (-1 === blockProps.className.indexOf('is-style-')) {
		blockProps.className +=
			' is-style-vk_borderBox-style-solid-kado-tit-tab';
	}

	//iタグでdeprecatedが効かなかったので追加。
	let icon;
	if (faIcon.indexOf('<i class="') === -1) {
		icon = `<i class="${faIcon}"></i>`;
	} else {
		icon = faIcon;
	}

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('Margin', 'vk-blocks')}
					initialOpen={false}
				>
					<BaseControl>
						<p>
							{__(
								'The margin-top of the first element and the margin-bottom of the last element in the border block will be automatically set to 0.If you want to add margins at the beginning and end, use a spacer block to specify height instead of margin.',
								'vk-blocks'
							)}
						</p>
					</BaseControl>
				</PanelBody>
				<PanelBody title={__('Color', 'vk-blocks')}>
					<BaseControl
						id="border-color"
						label={__('Border Color', 'vk-blocks')}
					>
						<AdvancedColorPalette schema={'color'} {...props} />
					</BaseControl>
					<BaseControl
						id="background-color"
						label={__('Background Color', 'vk-blocks')}
					>
						<SelectControl
							value={bgColor}
							onChange={(value) =>
								setAttributes({ bgColor: value })
							}
							options={[
								{
									value: 'transparent',
									label: __('Transparent', 'vk-blocks'),
								},
								{
									value: 'white',
									label: __('White', 'vk-blocks'),
								},
							]}
						/>
					</BaseControl>
				</PanelBody>
				<PanelBody title={__('Icon', 'vk-blocks')}>
					<BaseControl
						id="dot-fa"
						label={__('Icon ( Font Awesome )', 'vk-blocks')}
					>
						<FontAwesome
							attributeName={'faIcon'}
							{...{
								attributes,
								setAttributes,
							}}
						/>
					</BaseControl>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<div className={titleClass} style={titleStyle}>
					{ReactHtmlParser(icon)}
					{title}
				</div>
				<div className={bodyClass} style={bodyStyle}>
					{inner}
				</div>
			</div>
		</>
	);
}
