import { __ } from '@wordpress/i18n';
import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import { isParentReusableBlock } from '@vkblocks/utils/is-parent-reusable-block';

export default function AnimationEdit(props) {
	const { attributes, setAttributes, clientId } = props;
	const { mode, position, blockId } = attributes;

	useEffect(() => {
		if (attributes.clientId !== undefined) {
			setAttributes({ clientId: undefined });
		}
		if (
			blockId === undefined ||
			isParentReusableBlock(clientId) === false
		) {
			setAttributes({ blockId: clientId });
		}
		if (mode === undefined || mode === null || mode === '') {
			setAttributes({ mode: 'always-visible' });
		}

		if (position === undefined || position === null || position === '') {
			setAttributes({ position: 'right' });
		}
	}, [clientId]);

	const blockProps = useBlockProps({
		className: `vk_fixed-display vk_fixed-display-${mode} vk_fixed-display-${position} vk_fixed-display-${blockId}`,
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Fixed Display Mode', 'vk-blocks-pro')}>
					{__('Fixed display mode', 'vk-blocks-pro')}
					<SelectControl
						value={mode}
						onChange={(value) => setAttributes({ mode: value })}
						options={[
							{
								label: __('Always Visible', 'vk-blocks-pro'),
								value: 'always-visible',
							},
							{
								label: __('Show on Scroll', 'vk-blocks-pro'),
								value: 'show-on-scroll',
							},
						]}
					/>
					{__('Fixed display position', 'vk-blocks-pro')}
					<SelectControl
						value={position}
						onChange={(value) => setAttributes({ position: value })}
						options={[
							{
								label: __('Top', 'vk-blocks-pro'),
								value: 'top',
							},
							{
								label: __('Right', 'vk-blocks-pro'),
								value: 'right',
							},
							{
								label: __('Bottom', 'vk-blocks-pro'),
								value: 'bottom',
							},
							{
								label: __('left', 'vk-blocks-pro'),
								value: 'left',
							},
						]}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<InnerBlocks />
			</div>
		</>
	);
}
