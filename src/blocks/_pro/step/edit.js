import { __ } from '@wordpress/i18n'; // Import __() from wp.i18n
import { PanelBody } from '@wordpress/components';
import { InspectorControls, InnerBlocks } from '@wordpress/block-editor';
import React from 'react';

export default function StepEdit({ attributes, setAttributes, className }) {
	const { firstDotNum } = attributes;
	const containerClass = ' vk_step';
	const ALLOWED_BLOCKS = ['vk-blocks/step-item'];
	const TEMPLATE = [ALLOWED_BLOCKS];

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('First Dot Number', 'vk-blocks')}>
					<input
						type="number"
						id={'dot-number'}
						onChange={(event) => {
							const value = parseInt(event.target.value, 10);
							setAttributes({ firstDotNum: value });
						}}
						value={firstDotNum}
						min="1"
						step="1"
					/>
				</PanelBody>
			</InspectorControls>
			<div className={className + containerClass}>
				<InnerBlocks
					allowedBlocks={ALLOWED_BLOCKS}
					template={TEMPLATE}
				/>
			</div>
		</>
	);
}
