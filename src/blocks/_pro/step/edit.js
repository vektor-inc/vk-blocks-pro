import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
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
			<div {...blockProps}>
				<InnerBlocks
					allowedBlocks={ALLOWED_BLOCKS}
					template={TEMPLATE}
				/>
			</div>
		</>
	);
}
