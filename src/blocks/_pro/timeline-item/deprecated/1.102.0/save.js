import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { isHexColor } from '@vkblocks/utils/is-hex-color';

export default function save({ attributes }) {
	const { label, color, style, styleLine, outerPaddingBottom } = attributes;
	const containerClass = ' vk_timeline_item';
	let styleClass = '';
	let inlineStyle = {};
	let styleLineClass = '';

	if (style === 'solid') {
		styleClass = ' vk_timeline_item_style-default';
		if (color !== undefined) {
			styleClass += ` has-background`;
			if (isHexColor(color)) {
				inlineStyle = { backgroundColor: `${color}` };
			} else {
				styleClass += ` has-${color}-background-color`;
			}
		}
	} else if (style === 'outlined') {
		styleClass = ' vk_timeline_item_style-outlined';
		if (color !== undefined) {
			styleClass += ` has-text-color`;
			if (isHexColor(color)) {
				inlineStyle = { color: `${color}` };
			} else {
				styleClass += ` has-${color}-color`;
			}
		}
	}

	if (styleLine === 'default') {
		styleLineClass = ' vk_timeline_item_lineStyle-default';
	} else if (styleLine === 'none') {
		styleLineClass = ' vk_timeline_item_lineStyle-none';
	}

	const blockProps = useBlockProps.save({
		className: containerClass + styleLineClass,
		style: { paddingBottom: outerPaddingBottom },
	});
	return (
		<div {...blockProps}>
			{label !== undefined && label !== '' && (
				<div className={'vk_timeline_item_caption'}>{label}</div>
			)}
			<div className={'vk_timeline_item_content'}>
				<InnerBlocks.Content />
			</div>
			<div
				className={'vk_timeline_item_style' + styleClass}
				style={inlineStyle}
			/>
		</div>
	);
}