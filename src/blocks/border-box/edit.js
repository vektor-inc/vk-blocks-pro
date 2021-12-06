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

	const blockProps = useBlockProps({
		className: `vk_borderBox`,
	});

	//Defaultクラスを設定
	if (-1 === blockProps.className.indexOf('is-style-')) {
		blockProps.className +=
			' is-style-vk_borderBox-style-solid-kado-tit-tab';
	}

	//枠パターン
	let isBoxBorder = false;
	if (
		-1 <
			blockProps.className.indexOf(
				'vk_borderBox-style-solid-kado-tit-onborder'
			) ||
		-1 <
			blockProps.className.indexOf(
				'vk_borderBox-style-solid-kado-tit-inner'
			) ||
		-1 <
			blockProps.className.indexOf(
				'vk_borderBox-style-solid-kado-iconFeature'
			)
	) {
		// 全体に枠線
		isBoxBorder = true;
	}

	// box
	let boxClass = '';
	let boxStyle = {};

	// title
	let titleClass = `vk_borderBox_title_container`;
	let titleStyle = {};

	// content
	let bodyClass = `vk_borderBox_body`;
	let bodyStyle = {};

	const colors = ['red', 'orange', 'blue', 'green', 'black'];
	if (colors.includes(color)) {
		// 旧仕様
		blockProps.className += ` vk_borderBox-color-${color} vk_borderBox-background-${bgColor}`;
	} else if (color !== undefined) {
		// カスタムカラーパレットに対応
		if (isBoxBorder) {
			// 全体に枠線
			boxClass += ` has-text-color`;

			if (isHexColor(color)) {
				// custom color
				boxClass += ` has-text-color`;
				boxStyle = {
					color: `${color}`,
				};
			} else {
				// has style
				boxClass += ` has-${color}-color`;
			}
		} else {
			// 本文に枠線
			titleClass += ` has-background`;
			bodyClass += ` has-text-color`;

			if (isHexColor(color)) {
				// custom color
				titleStyle = {
					background: `${color}`,
				};

				bodyStyle = {
					color: `${color}`,
				};
			} else {
				// has style
				titleClass += ` has-${color}-background-color`;
				bodyClass += ` has-${color}-color`;
			}
		}
	}

	blockProps.className += boxClass;
	blockProps.style = boxStyle;

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
						<SelectControl
							value={color}
							onChange={(value) =>
								setAttributes({ color: value })
							}
							options={[
								{
									value: 'red',
									label: __('Red', 'vk-blocks'),
								},
								{
									value: 'orange',
									label: __('Orange', 'vk-blocks'),
								},
								{
									value: 'blue',
									label: __('Blue', 'vk-blocks'),
								},
								{
									value: 'green',
									label: __('Green', 'vk-blocks'),
								},
								{
									value: 'black',
									label: __('Black', 'vk-blocks'),
								},
							]}
						/>

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
