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
	BlockControls,
	BlockAlignmentControl,
} from '@wordpress/block-editor';
import parse from 'html-react-parser';

/**
 * Internal dependencies
 */
import { AdvancedColorPalette } from '@vkblocks/components/advanced-color-palette';
import { isHexColor } from '@vkblocks/utils/is-hex-color';
import { sanitizeSlug } from '@vkblocks/utils/sanitizeSlug';

export default function BorderBoxEdit(props) {
	const { attributes, setAttributes } = props;
	const {
		heading,
		headingTag,
		faIcon,
		color,
		bgColor,
		borderColor,
		bodyAlign,
	} = attributes;
	// eslint-disable-next-line no-undef
	const iconFamily = vkFontAwesome.iconFamily;
	const inner = (
		<InnerBlocks templateLock={false} template={[['core/paragraph']]} />
	);
	const title = (
		<RichText
			tagName={headingTag}
			identifier="heading"
			className={'vk_borderBox_title'}
			onChange={(value) => setAttributes({ heading: value })}
			value={heading}
			placeholder={__('Please enter a title.', 'vk-blocks-pro')}
		/>
	);

	// カラーパレットに対応
	const wrapperClasses = classnames('vk_borderBox', {
		[`vk_borderBox-color-${sanitizeSlug(color)}`]: !!color,
		[`vk_borderBox-background-${sanitizeSlug(bgColor)}`]: !!bgColor,
		[`has-text-color`]: !!borderColor,
		[`has-${sanitizeSlug(borderColor)}-color`]:
			!!borderColor && !isHexColor(borderColor),
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
		[`has-${sanitizeSlug(borderColor)}-background-color`]:
			isFill_title && !!borderColor && !isHexColor(borderColor),
	});
	let titleStyle = {};
	if (isFill_title && borderColor !== undefined && isHexColor(borderColor)) {
		// custom color
		titleStyle = {
			backgroundColor: `${borderColor}`,
		};
	}

	// アイコン
	let icon;
	if (
		-1 <
			blockProps.className.indexOf(
				'vk_borderBox-style-solid-kado-iconFeature'
			) &&
		!color
	) {
		// 直線 ピン角 アイコン
		let iconStyle = ``;
		const iconClasses = classnames('vk_borderBox_icon_border', {
			[`has-background`]: !!borderColor,
			[`has-${sanitizeSlug(borderColor)}-background-color`]:
				!!borderColor && !isHexColor(borderColor),
		});

		if (borderColor !== undefined && isHexColor(borderColor)) {
			// custom color
			iconStyle = `background-color: ${borderColor};`;
		}

		// iタグ必須
		icon = `<div class="${classnames(
			iconClasses
		)}" style="${iconStyle}">${faIcon}</div>`;
	} else if (faIcon.indexOf('<i class="') === -1) {
		//iタグでdeprecatedが効かなかったので追加。
		// アイコンなし
		icon = `<i class="${faIcon}"></i>`;
	} else {
		// アイコンあり
		icon = faIcon;
	}

	const bodyClasses = classnames('vk_borderBox_body', {
		[`vk_borderBox_body-align-${bodyAlign}`]: !!bodyAlign,
	});

	return (
		<>
			<BlockControls group="block">
				<BlockAlignmentControl
					value={bodyAlign}
					onChange={(value) => setAttributes({ bodyAlign: value })}
					controls={['left', 'center', 'right']}
				/>
			</BlockControls>
			<InspectorControls>
				<PanelBody
					title={__('Margin', 'vk-blocks-pro')}
					initialOpen={false}
				>
					<BaseControl>
						<p>
							{__(
								'The margin-top of the first element and the margin-bottom of the last element in the border block will be automatically set to 0.If you want to add margins at the beginning and end, use a spacer block to specify height instead of margin.',
								'vk-blocks-pro'
							)}
						</p>
					</BaseControl>
				</PanelBody>
				<PanelBody
					title={__('HTML element of the title', 'vk-blocks-pro')}
					initialOpen={false}
				>
					<BaseControl>
						<SelectControl
							label={__(
								'HTML element of the title',
								'vk-blocks-pro'
							)}
							value={headingTag}
							options={[
								{ label: 'H3', value: 'h3' },
								{ label: 'H4', value: 'h4' },
								{ label: 'H5', value: 'h5' },
								{ label: 'H6', value: 'h6' },
								{ label: 'p', value: 'p' },
							]}
							onChange={(value) =>
								setAttributes({ headingTag: value })
							}
						/>
					</BaseControl>
				</PanelBody>
				<PanelBody title={__('Color', 'vk-blocks-pro')}>
					<BaseControl
						id="border-color"
						label={__('Border Color', 'vk-blocks-pro')}
					>
						<AdvancedColorPalette
							schema={'borderColor'}
							{...props}
						/>
					</BaseControl>
					<BaseControl
						id="background-color"
						label={__('Background Color', 'vk-blocks-pro')}
					>
						<SelectControl
							value={bgColor}
							onChange={(value) =>
								setAttributes({ bgColor: value })
							}
							options={[
								{
									value: 'transparent',
									label: __('Transparent', 'vk-blocks-pro'),
								},
								{
									value: 'white',
									label: __('White', 'vk-blocks-pro'),
								},
							]}
						/>
					</BaseControl>
				</PanelBody>
				<PanelBody title={__('Icon', 'vk-blocks-pro')}>
					<BaseControl
						id="dot-fa"
						label={
							__('Icon', 'vk-blocks-pro') +
							' ( ' +
							iconFamily +
							' )'
						}
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
					{parse(icon)}
					{title}
				</div>
				<div className={bodyClasses}>{inner}</div>
			</div>
		</>
	);
}
