import { __ } from '@wordpress/i18n';
import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';
import { PanelBody, SelectControl, RangeControl } from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import { isParentReusableBlock } from '@vkblocks/utils/is-parent-reusable-block';

export default function FixedDisplayEdit(props) {
	const { attributes, setAttributes, clientId } = props;
	const { mode, position, blockId, scrollTiming, scrollTimingUnit } = attributes;

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
			if (scrollTiming === undefined) {
				setAttributes({ scrollTiming: 100 }); // デフォルトのスクロールタイミング
			}
			if (scrollTimingUnit === undefined) {
				setAttributes({ scrollTimingUnit: 'px' }); // デフォルトの単位
			}
		}, [clientId, mode, position, scrollTiming, scrollTimingUnit, blockId]);
		
		const blockProps = useBlockProps({
			className: `vk_fixed-display vk_fixed-display-mode-${mode} vk_fixed-display-position-${position} vk_fixed-display-${blockId}`,
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
								label: __('Left', 'vk-blocks-pro'),
								value: 'left',
							},
						]}
					/>
					<RangeControl
						label={__('Scroll Position', 'text-domain')}
						value={scrollTiming}
						onChange={(value) => setAttributes({ scrollTiming: value })}
						min={0}
						max={100}
						step={.1}
					/>
					<SelectControl
						label={__('Unit', 'text-domain')}
						value={scrollTimingUnit}
						onChange={(value) => setAttributes({ scrollTimingUnit: value })}
						options={[
							{ label: 'px', value: 'px' },
							{ label: 'em', value: 'em' },
							{ label: 'rem', value: 'rem' },
							{ label: 'vw', value: 'vw' },
							{ label: 'vh', value: 'vh' },
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
