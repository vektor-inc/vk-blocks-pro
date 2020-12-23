import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save(props) {
	const { effect, speed, range, clientId } = props.attributes;

	return (
		<div
			{...useBlockProps.save({
				className: `vk_animation vk_animation-${effect} vk_animation-speed-${speed} vk_animation-range-${range} vk_animation-${clientId}`,
			})}
		>
			<InnerBlocks.Content />
		</div>
	);
}
