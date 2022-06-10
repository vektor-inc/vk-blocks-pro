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
	if (border) {
		style.border = `1px solid ${borderColor}`;
	}
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
	if (textColor) {
		containerClasses.push('has-text-color');
		if (isHexColor(textColor)) {
			// custom color
			style.color = `${textColor}`;
		} else {
			// palette color
			containerClasses.push(`has-${textColor}-color`);
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
		containerClasses.push('has-text-color');
		if (isHexColor(borderColor)) {
			// custom color
			style.color = `${borderColor}`;
			style.border = `1px solid ${borderColor}`;
		} else {
			// palette color
			style.border = `1px solid currentColor`;
			containerClasses.push(`has-${borderColor}-color`);
		}
	}

	const containerClass = containerClasses.join(' ');

	const blockProps = useBlockProps.save({
		className: `${containerClass}`,
		style,
	});

	const TagName = url ? 'a' : 'div';

	return (
		<div {...blockProps}>
			<TagName
				className={`vk_gridcolcard_item_container`}
				style={{
					paddingTop: containerSpace.top,
					paddingBottom: containerSpace.bottom,
					paddingLeft: containerSpace.left,
					paddingRight: containerSpace.right,
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
