import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	__experimentalNumberControl as NumberControl, // eslint-disable-line @wordpress/no-unsafe-wp-apis
} from '@wordpress/components';
import {
	InspectorControls,
	InnerBlocks,
	useBlockProps,
} from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import { useSelect, dispatch } from '@wordpress/data';

export default function StepEdit({ attributes, setAttributes, clientId }) {
	const { firstDotNum } = attributes;
	const containerClass = ' vk_step';
	const ALLOWED_BLOCKS = ['vk-blocks/step-item'];
	const TEMPLATE = [['vk-blocks/step-item']];
	const { updateBlockAttributes } = dispatch('core/block-editor');
	const currentInnerBlocks = useSelect(
		(select) => {
			return select('core/block-editor').getBlocks(clientId);
		},
		[clientId]
	);

	useEffect(() => {
		currentInnerBlocks.forEach(function (block, index) {
			updateBlockAttributes(block.clientId, {
				dotNum: firstDotNum + index,
			});
		});
	}, [attributes.firstDotNum, currentInnerBlocks.length]);

	const blockProps = useBlockProps({
		className: `${containerClass}`,
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('First Dot Number', 'vk-blocks-pro')}>
					<NumberControl
						id={'dot-number'}
						onChange={(value) => {
							if (Number.isNaN(value) || value < 1) {
								setAttributes({ firstDotNum: 1 });
							} else {
								setAttributes({ firstDotNum: parseInt(value, 10) });
							}
						}}
						value={firstDotNum}
						min="1"
						step="1"
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<InnerBlocks
					allowedBlocks={ALLOWED_BLOCKS}
					template={TEMPLATE}
				/>
			</div>
		</>
	);
}
