/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
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

/**
 * Internal dependencies
 */
import { AdvancedColorPalette } from '@vkblocks/components/advanced-color-palette';
import { isHexColor } from '@vkblocks/utils/is-hex-color';

export default function BorderBoxEdit(props) {
	const { attributes, setAttributes } = props;
	const { heading, faIcon, bgColor, borderColor } = attributes;

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

	console.log("borderColor--->" + borderColor);

	const wrapperClasses = classnames('vk_borderBox', {
		[`vk_borderBox-background-${bgColor}`]: !!bgColor,
		[`has-text-color`]: !!borderColor,
		[`has-${borderColor}-color`]: !!borderColor && !isHexColor(borderColor),
	});

	const blockProps = useBlockProps({
		className: classnames(wrapperClasses),
	});

	//Defaultクラスを設定
	if (-1 === blockProps.className.indexOf('is-style-')) {
		blockProps.className +=
			' is-style-vk_borderBox-style-solid-kado-tit-tab';
	}

	//枠パターン
	let isWrapperBorder = false;
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
		isWrapperBorder = true;
	}

	// title
	let titleClass = `vk_borderBox_title_container`;
	let titleStyle = {};

	// content
	let bodyClass = `vk_borderBox_body`;
	let bodyStyle = {};

	// 直線 ピン角 アイコン
	let iconClass = ``;
	let iconStyle = ``;

	// カラーパレットに対応
	if (borderColor !== undefined) {
		if (isHexColor(borderColor)) {
			// custom color
			blockProps.style = {
				color: `${borderColor}`,
			};
		}
	}

	if (!isWrapperBorder && borderColor !== undefined) {
		// 本文に枠線があるパターン
		titleClass += ` has-background`;

		if (isHexColor(borderColor)) {
			// custom color
			titleStyle = {
				backgroundColor: `${borderColor}`,
			};
		} else {
			// has style
			titleClass += ` has-${borderColor}-background-color`;
		}
	}

	// 直線 ピン角 アイコン
	if (
		-1 <
		blockProps.className.indexOf(
			'vk_borderBox-style-solid-kado-iconFeature'
		)
	) {
		iconClass = `vk_borderBox_icon_border`;

		if (borderColor !== undefined) {
			iconClass += ` has-background`;
			if (isHexColor(borderColor)) {
				// custom color
				iconStyle = `background-color: ${borderColor};`;
			} else {
				// has style
				iconClass += ` has-${borderColor}-background-color`;
			}
		}
	}

	//iタグでdeprecatedが効かなかったので追加。
	let icon;
	if (faIcon.indexOf('<i class="') === -1) {
		icon = `<i class="${faIcon}"></i>`;
	} else if (iconClass) {
		// カラーパレット
		icon =
			`<div class="${iconClass}" style="${iconStyle}">` +
			faIcon +
			`</div>`;
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
						<AdvancedColorPalette
							schema={'borderColor'}
							{...props}
						/>
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
				<div className={`vk_borderBox_body`}>
					{inner}
				</div>
			</div>
		</>
	);
}
