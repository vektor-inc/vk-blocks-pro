import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import classNames from 'classnames';

export default function save(props) {
	let { mode, position, blockId } = props.attributes;
	//For recovering block.
	mode = mode ? mode : 'slide-up';
	position = position ? position : 'right';

	const sliderClasses = classNames(
		`vk_fixed-display vk_fixed-display-${mode} vk_fixed-display-position-${position} vk_fixed-display-${blockId}`
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
