import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { isHexColor } from '@vkblocks/utils/is-hex-color';

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

	const style = {
		backgroundColor: null,
		border: null,
	};
	if (borderRadius) {
		style.borderRadius = `${borderRadius}`;
	}

	const containerClasses = ['vk_gridcolcard_item'];
	if (headerDisplay === 'delete') {
		containerClasses.push('vk_gridcolcard_item-noHeader');
	}
	if (footerDisplay === 'delete') {
		containerClasses.push('vk_gridcolcard_item-noFooter');
	}

	// 文字色
	const innerClasses = ['vk_gridcolcard_item_container'];
	let textColorCustom = null;
	if (textColor) {
		innerClasses.push('has-text-color');
		if (isHexColor(textColor)) {
			// custom color
			textColorCustom = textColor;
		} else {
			// palette color
			innerClasses.push(`has-${textColor}-color`);
		}
	}

	// 背景色
	if (backgroundColor) {
		containerClasses.push('has-background');
		if (isHexColor(backgroundColor)) {
			// custom color
			style.backgroundColor = `${backgroundColor}`;
		} else {
			// palette color
			containerClasses.push(`has-${backgroundColor}-background-color`);
		}
	}

	// 線の色
	if (border) {
		containerClasses.push('has-border-color');
		style.borderWidth = `1px`;
		if (isHexColor(borderColor)) {
			// custom color
			style.borderColor = `${borderColor}`;
		} else {
			// palette color
			containerClasses.push(`has-${borderColor}-border-color`);
		}
	}
	const containerClass = containerClasses.join(' ');
	const innerClass = innerClasses.join(' ');

	const blockProps = useBlockProps.save({
		className: `${containerClass}`,
		style,
	});

	const TagName = url ? 'a' : 'div';

	return (
		<div {...blockProps}>
			<TagName
				className={innerClass}
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
