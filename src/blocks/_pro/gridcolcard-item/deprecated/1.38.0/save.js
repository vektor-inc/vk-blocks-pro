import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

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
	if (textColor) {
		style.color = `${textColor}`;
	}
	if (backgroundColor) {
		style.backgroundColor = `${backgroundColor}`;
	}
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
