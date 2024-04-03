import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import classNames from 'classnames';

export default function save(props) {
	let { mode, position, blockId } = props.attributes;
	//For recovering block.
	mode = mode ? mode : 'always-visible';
	position = position ? position : 'right';

	const sliderClasses = classNames(
		`vk_animation vk_animation-${mode} vk_animation-position-${position} vk_animation-${blockId}`
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
