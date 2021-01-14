import { InnerBlocks } from '@wordpress/block-editor';
import React from 'react';

export default function save({ className }) {
	const containerClass = ' vk_step';
	return (
		<div className={className + containerClass}>
			<InnerBlocks.Content />
		</div>
	);
}
