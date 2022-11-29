import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import classNames from 'classnames';

export default function save(props) {
	let { effect, speed, range, once, blockId } = props.attributes;
	//For recovering block.
	effect = effect ? effect : 'slide-up';
	speed = speed ? speed : 'fast';
	range = range ? range : 'short';
	once = once ? true : false;

	const sliderClasses = classNames(
		`vk_animation vk_animation-${effect} vk_animation-speed-${speed} vk_animation-range-${range}`,
		{ [`vk_animation-once`]: once },
		`vk_animation-${blockId}`
	);

	return (
		<div
			{...useBlockProps.save({
				className: sliderClasses,
			})}
		>
			<InnerBlocks.Content />
		</div>
	);
}
