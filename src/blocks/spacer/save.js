/**
 * External dependencies
 */
import classnames from 'classnames';

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

	let containerClass = classnames('vk_spacer');
	if ('height' === spaceType && 'custom' !== spaceSize) {
		containerClass = classnames('vk_spacer vk_spacer-type-height');
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
