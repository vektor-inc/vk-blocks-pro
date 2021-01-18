/**
 * External dependencies
 */
import classnames from 'classnames';
/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

import { StaffCard } from './staffCard';

export default function save({ attributes, setAttributes, className }) {
	const {
		vk_staff_layout, // eslint-disable-line camelcase
	} = attributes;

	const classes = classnames('vk_staff', {
		[className]: !!className,
		[`vk_staff-layout-${vk_staff_layout}`]: !!vk_staff_layout, // eslint-disable-line camelcase
	});

	return (
		<div {...useBlockProps.save({ className: classes })}>
			<StaffCard
				attributes={attributes}
				setAttributes={setAttributes}
				className={className}
			/>
		</div>
	);
}
