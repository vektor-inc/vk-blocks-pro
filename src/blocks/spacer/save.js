/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import Spacers from './spacers';

export default function save({ attributes, anchor }) {
	const { spaceType, unit, pc, tablet, mobile, spaceSize } = attributes;

	let containerClass = `vk_spacer`;
	if ('custom' !== spaceSize) {
		containerClass += ` vk_spacer-type-${spaceType}`;
	}

	return (
		<div
			{...useBlockProps.save({
				className: containerClass,
				id: anchor,
			})}
		>
			<Spacers
				spaceSize={spaceSize}
				type={spaceType}
				pcSize={pc}
				tabletSize={tablet}
				mobileSize={mobile}
				unit={unit}
			/>
		</div>
	);
}
