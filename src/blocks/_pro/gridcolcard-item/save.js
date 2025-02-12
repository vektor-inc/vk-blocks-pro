import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { isHexColor } from '@vkblocks/utils/is-hex-color';
import { isGradientStyle } from '@vkblocks/utils/is-gradient-style';
import classnames from 'classnames';

export default function save(props) {
	const { attributes } = props;
	const {
		backgroundColor,
		textColor,
		headerDisplay,
		footerDisplay,
		containerSpace,
		borderRadius,
		border,
		borderColor,
		borderWidth,
		backgroundGradient,
		url,
		urlOpenType,
		relAttribute,
	} = attributes;

	// カラーパレットに対応
	const containerClasses = classnames('vk_gridcolcard_item', {
		[`vk_gridcolcard_item-noHeader`]: headerDisplay === 'delete',
		[`vk_gridcolcard_item-noFooter`]: footerDisplay === 'delete',
		[`has-background`]: !!backgroundColor,
		[`has-border-color`]: !!border,
		[`has-${backgroundColor}-background-color`]:
			!!backgroundColor && !isHexColor(backgroundColor),
		[`has-${backgroundGradient}-gradient-background`]:
			!!backgroundGradient && !isGradientStyle(backgroundGradient),
		[`has-${borderColor}-border-color`]:
			!!border && !!borderColor && !isHexColor(borderColor),
	});

	const innerClasses = classnames('vk_gridcolcard_item_container', {
		[`has-text-color`]: !!textColor,
		[`has-${textColor}-color`]: !!textColor && !isHexColor(textColor),
	});

	const style = {
		backgroundColor: null,
		border: null,
	};
	if (borderRadius) {
		style.borderRadius = `${borderRadius}`;
	}

	// 背景色
	if (backgroundColor && isHexColor(backgroundColor)) {
		// custom color
		style.backgroundColor = `${backgroundColor}`;
	}

	// 背景グラデーション
	if (backgroundGradient && isGradientStyle(backgroundGradient)) {
		// custom color
		style.background = `${backgroundGradient}`;
	}

	// 線の色と太さ
	if (border) {
		style.borderWidth = borderWidth;
		if (isHexColor(borderColor)) {
			// custom color
			style.borderColor = `${borderColor}`;
		}
	}

	// 文字色
	const textColorCustom =
		textColor && isHexColor(textColor) ? textColor : null;

	const blockProps = useBlockProps.save({
		className: classnames(containerClasses, {
			'vk_gridcolcard_item-noHeader': headerDisplay === 'delete',
			'vk_gridcolcard_item-noFooter': footerDisplay === 'delete',
			[`vk_gridcolcard_item-header-${headerDisplay}`]:
				headerDisplay !== 'delete',
			[`vk_gridcolcard_item-footer-${footerDisplay}`]:
				footerDisplay !== 'delete',
		}),
		style,
	});

	const TagName = url ? 'a' : 'div';

	return (
		<div {...blockProps}>
			<TagName
				className={innerClasses}
				style={{
					paddingTop: containerSpace.top,
					paddingBottom: containerSpace.bottom,
					paddingLeft: containerSpace.left,
					paddingRight: containerSpace.right,
					color: textColorCustom,
				}}
				{...(TagName === 'a'
					? {
						href: url,
						target: urlOpenType ? '_blank' : undefined,
						rel: relAttribute || undefined,
					}
					: {})}
			>
				<InnerBlocks.Content />
			</TagName>
		</div>
	);
}
