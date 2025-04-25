/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';
import parse from 'html-react-parser';
import { isHexColor } from '@vkblocks/utils/is-hex-color';
import { sanitizeSlug } from '@vkblocks/utils/sanitizeSlug';

export default function save(props) {
	const { attributes } = props;
	const {
		heading,
		headingTag,
		faIcon,
		color,
		bgColor,
		borderColor,
		bodyAlign,
	} = attributes;

	const inner = <InnerBlocks.Content />;
	const title = (
		<RichText.Content
			tagName={headingTag}
			className={'vk_borderBox_title'}
			value={heading}
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
	const blockProps = useBlockProps.save({
		className: wrapperClasses,
		style: wrapperStyle,
	});

	//Defaultクラスを設定
	if (-1 === blockProps.className.indexOf('is-style-')) {
		blockProps.className +=
			' is-style-vk_borderBox-style-solid-kado-tit-tab';
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
			[`has-${borderColor}-background-color`]:
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
		<div {...blockProps}>
			<div className={titleClasses} style={titleStyle}>
				{parse(icon)}
				{title}
			</div>
			<div className={bodyClasses}>{inner}</div>
		</div>
	);
}
