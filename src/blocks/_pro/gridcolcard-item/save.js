import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { isHexColor } from '@vkblocks/utils/is-hex-color';
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
		url,
		urlOpenType,
	} = attributes;

	// カラーパレットに対応
	const containerClasses = classnames('vk_gridcolcard_item', {
		[`vk_gridcolcard_item-noHeader`]: headerDisplay === 'delete',
		[`vk_gridcolcard_item-noFooterr`]: footerDisplay === 'delete',
		[`has-background`]: !!backgroundColor,
		[`has-border-color`]: !!border,
		[`has-${backgroundColor}-background-color`]:
			!!backgroundColor && !isHexColor(backgroundColor),
		[`has-${borderColor}-border-color`]:
			!!border && !!borderColor && !isHexColor(borderColor),
	});

	const innerClasses = classnames('innerClasses', {
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

	// 線の色
	if (border) {
		style.borderWidth = `1px`;
		if (isHexColor(borderColor)) {
			// custom color
			style.borderColor = `${borderColor}`;
		}
	}

	// 文字色
	const textColorCustom =
		textColor && isHexColor(textColor) ? textColor : null;

	const blockProps = useBlockProps.save({
		className: classnames(containerClasses),
		style,
	});

	const TagName = url ? 'a' : 'div';

	return (
		<div {...blockProps}>
			<TagName
				className={classnames(innerClasses)}
				style={{
					paddingTop: containerSpace.top,
					paddingBottom: containerSpace.bottom,
					paddingLeft: containerSpace.left,
					paddingRight: containerSpace.right,
					color: textColorCustom,
				}}
				href={url}
				target={urlOpenType ? '_blank' : undefined}
				rel={urlOpenType ? 'noopener noreferrer' : undefined}
			>
				<InnerBlocks.Content />
			</TagName>
		</div>
	);
}
