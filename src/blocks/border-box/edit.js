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
	const { heading, faIcon, color, bgColor, borderColor } = attributes;

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

	// カラーパレットに対応
	const wrapperClasses = classnames('vk_borderBox', {
		[`vk_borderBox-color-${color}`]: !!color,
		[`vk_borderBox-background-${bgColor}`]: !!bgColor,
		[`has-text-color`]: !!borderColor,
		[`has-${borderColor}-color`]: !!borderColor && !isHexColor(borderColor),
	});
	let wrapperStyle = {};
	if (borderColor !== undefined && isHexColor(borderColor)) {
		// custom color
		wrapperStyle = {
			color: `${borderColor}`,
		};
	}
	const blockProps = useBlockProps({
		className: classnames(wrapperClasses),
		style: wrapperStyle,
	});

	//Defaultクラスを設定
	if (-1 === blockProps.className.indexOf('is-style-')) {
		blockProps.className +=
			' is-style-vk_borderBox-style-solid-kado-tit-tab';
	}

	// 旧カラーを差し替え
	const pre_colors = {
		red: '#dc3545',
		orange: '#ffa536',
		blue: '#4267b2',
		green: '#28a745',
		black: '#222222',
	};

	if (color) {
		// 旧カラーで color が指定されている場合
		// hexカラーに置き換え
		setAttributes({ borderColor: pre_colors[color] });
		setAttributes({ color: '' });
	} else if (
		attributes.className &&
		attributes.className.match(/vk_borderBox-color-\w*/)
	) {
		// 旧カラーで color がない場合(旧Default対応)
		// className から vk_borderBox-color- を削除
		// 文字列を空白文字を区切りとして配列化
		const palletClasses = attributes.className.split(' ');

		// preColorClass の値の要素を取り除き、空白文字を区切りとして join（結合）
		const palletClass = palletClasses.filter((className) => {
			return !className.match(/vk_borderBox-color-\w*/);
		});

		setAttributes({
			className: classnames(palletClass),
		});

		// hexカラー(赤)に置き換え
		setAttributes({ borderColor: pre_colors.red });
	}

	//枠パターン
	let isFill_title = false;
	if (
		-1 <
			blockProps.className.indexOf(
				'is-style-vk_borderBox-style-solid-kado-tit-tab'
			) ||
		-1 <
			blockProps.className.indexOf(
				'is-style-vk_borderBox-style-solid-kado-tit-banner'
			) ||
		-1 <
			blockProps.className.indexOf(
				'is-style-vk_borderBox-style-solid-round-tit-tab'
			)
	) {
		// タイトル背景塗り 白文字パターン
		isFill_title = true;
	}

	// title背景
	const titleClasses = classnames('vk_borderBox_title_container', {
		[`has-background`]: isFill_title && !!borderColor,
		[`has-${borderColor}-background-color`]:
			isFill_title && !!borderColor && !isHexColor(borderColor),
	});
	let titleStyle = {};
	if (isFill_title && borderColor !== undefined && isHexColor(borderColor)) {
		// custom color
		titleStyle = {
			backgroundColor: `${borderColor}`,
		};
	}

	// 直線 ピン角 アイコン
	let iconClasses = ``;
	let iconStyle = ``;
	if (
		-1 <
			blockProps.className.indexOf(
				'vk_borderBox-style-solid-kado-iconFeature'
			) &&
		!color
	) {
		iconClasses = classnames('vk_borderBox_icon_border', {
			[`has-background`]: !!borderColor,
			[`has-${borderColor}-background-color`]:
				!!borderColor && !isHexColor(borderColor),
		});

		if (borderColor !== undefined && isHexColor(borderColor)) {
			// custom color
			iconStyle = `background-color: ${borderColor};`;
		}
	}

	//iタグでdeprecatedが効かなかったので追加。
	let icon;
	if (faIcon.indexOf('<i class="') === -1) {
		icon = `<i class="${faIcon}"></i>`;
	} else if (iconClasses) {
		// カラーパレットに対応
		icon =
			`<div class="${classnames(iconClasses)}" style="${iconStyle}">` +
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
				<div className={classnames(titleClasses)} style={titleStyle}>
					{ReactHtmlParser(icon)}
					{title}
				</div>
				<div className={`vk_borderBox_body`}>{inner}</div>
			</div>
		</>
	);
}
