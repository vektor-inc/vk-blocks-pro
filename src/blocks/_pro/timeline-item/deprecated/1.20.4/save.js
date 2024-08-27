import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { label, color, style, styleLine } = attributes;
	const containerClass = ' vk_timeline_item';
	let styleClass;
	let styleLineClass;
	let inlineStyle;

	if (style === 'solid') {
		styleClass = ' vk_timeline_item_style-default';
		inlineStyle = { backgroundColor: `${color}` };
	} else if (style === 'outlined') {
		styleClass = ' vk_timeline_item_style-outlined';
		inlineStyle = { border: `3px solid ${color}` };
	}

	if (styleLine === 'default') {
		styleLineClass = ' vk_timeline_item_lineStyle-default';
	} else if (styleLine === 'none') {
		styleLineClass = ' vk_timeline_item_lineStyle-none';
	}

	const blockProps = useBlockProps.save({
		className: containerClass + styleLineClass,
	});
	return (
		<div {...blockProps}>
			<div className={'vk_timeline_item_caption'}>{label}</div>
			<div className={'vk_timeline_item_contentnpm'}>
				<InnerBlocks.Content />
			</div>
			<div
				className={'vk_timeline_item_style' + styleClass}
				style={inlineStyle}
			/>
		</div>
	);
}
