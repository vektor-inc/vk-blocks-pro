import { __ } from '@wordpress/i18n';
import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';
import { PanelBody, SelectControl, ToggleControl } from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import { isParentReusableBlock } from '@vkblocks/utils/is-parent-reusable-block';

export default function AnimationEdit(props) {
	const { attributes, setAttributes, clientId } = props;
	const { effect, speed, range, once, blockId } = attributes;

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
		if (effect === undefined || effect === null || effect === '') {
			setAttributes({ effect: 'slide-up' });
		}

		if (speed === undefined || speed === null || speed === '') {
			setAttributes({ speed: 'fast' });
		}

		if (range === undefined || range === null || range === '') {
			setAttributes({ range: 'short' });
		}
	}, [clientId]);

	const blockProps = useBlockProps({
		className: `vk_animation vk_animation-${effect} vk_animation-speed-${speed} vk_animation-range-${range} vk_animation-${blockId}`,
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Animation Settings', 'vk-blocks-pro')}>
					{__('Animation effect', 'vk-blocks-pro')}
					<SelectControl
						value={effect}
						onChange={(value) => setAttributes({ effect: value })}
						options={[
							{
								label: __('Fade In', 'vk-blocks-pro'),
								value: 'fade-in',
							},
							{
								label: __('Slide Up', 'vk-blocks-pro'),
								value: 'slide-up',
							},
							{
								label: __('Slide Left', 'vk-blocks-pro'),
								value: 'slide-left',
							},
							{
								label: __('Slide Right', 'vk-blocks-pro'),
								value: 'slide-right',
							},
							{
								label: __('Left Right', 'vk-blocks-pro'),
								value: 'left-right',
							},
							{
								label: __('Up Down', 'vk-blocks-pro'),
								value: 'up-down',
							},
							{
								label: __('Trembling Y', 'vk-blocks-pro'),
								value: 'trembling-y',
							},
							{
								label: __('Trembling X', 'vk-blocks-pro'),
								value: 'trembling-x',
							},
							{
								label: __('Pounding', 'vk-blocks-pro'),
								value: 'pounding',
							},
							{
								label: __('Shaking', 'vk-blocks-pro'),
								value: 'shaking',
							},
						]}
					/>
					{__('Animation speed', 'vk-blocks-pro')}
					<SelectControl
						value={speed}
						onChange={(value) => setAttributes({ speed: value })}
						options={[
							{
								label: __('Very Slow', 'vk-blocks-pro'),
								value: 'very-slow',
							},
							{
								label: __('Slow', 'vk-blocks-pro'),
								value: 'slow',
							},
							{
								label: __('Normal', 'vk-blocks-pro'),
								value: 'normal',
							},
							{
								label: __('Fast', 'vk-blocks-pro'),
								value: 'fast',
							},
							{
								label: __('Very Fast', 'vk-blocks-pro'),
								value: 'very-fast',
							},
						]}
					/>
					{__('Animation range', 'vk-blocks-pro')}
					<SelectControl
						value={range}
						onChange={(value) => setAttributes({ range: value })}
						options={[
							{
								label: __('Short', 'vk-blocks-pro'),
								value: 'short',
							},
							{
								label: __('Normal', 'vk-blocks-pro'),
								value: 'normal',
							},
							{
								label: __('Long', 'vk-blocks-pro'),
								value: 'long',
							},
						]}
					/>
					{('fade-in' === effect ||
						'slide-up' === effect ||
						'slide-left' === effect ||
						'slide-right' === effect) && (
						<>
							<ToggleControl
								label={__(
									'Animation only the first view',
									'vk-blocks-pro'
								)}
								checked={once}
								onChange={(checked) =>
									setAttributes({ once: checked })
								}
							/>
						</>
					)}
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<InnerBlocks />
			</div>
		</>
	);
}
