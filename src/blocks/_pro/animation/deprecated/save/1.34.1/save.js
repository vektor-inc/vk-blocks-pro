
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save(props) {
	let { effect, speed, range, clientId } = props.attributes;
	//For recovering block.
	effect = effect ? effect : 'slide-up';
	speed = speed ? speed : 'fast';
	range = range ? range : 'short';

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
