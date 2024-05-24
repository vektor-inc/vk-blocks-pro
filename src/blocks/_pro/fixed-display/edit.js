import { __ } from '@wordpress/i18n';
import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	__experimentalUnitControl as UnitControl,
} from '@wordpress/block-editor';
import { PanelBody, SelectControl, ToggleControl } from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import { isParentReusableBlock } from '@vkblocks/utils/is-parent-reusable-block';

export default function FixedDisplayEdit(props) {
	const { attributes, setAttributes, clientId } = props;
	const {
		mode,
		position,
		blockId,
		scrollTiming = 100,
		scrollTimingUnit = 'px',
		scrollPersistVisible = false,
	} = attributes;

	useEffect(() => {
		if (
			blockId === undefined ||
			isParentReusableBlock(clientId) === false
		) {
			setAttributes({ blockId: clientId });
		}
		setAttributes({
			mode: mode || 'always-visible',
			position: position || 'right',
			scrollPersistVisible:
				scrollPersistVisible !== undefined
					? scrollPersistVisible
					: false,
		});
	}, [clientId, mode, position, blockId, scrollPersistVisible]);

	const blockProps = useBlockProps({
		className: `vk_fixed-display vk_fixed-display-mode-${mode} vk_fixed-display-position-${position} vk_fixed-display-${blockId}`,
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Fixed Display Setting', 'vk-blocks-pro')}>
					<SelectControl
						label={__('Display type', 'vk-blocks-pro')}
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
					<SelectControl
						label={__('Fixed position', 'vk-blocks-pro')}
						value={position}
						onChange={(value) => setAttributes({ position: value })}
						options={[
							{ label: __('Top', 'vk-blocks-pro'), value: 'top' },
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
					{mode === 'show-on-scroll' && (
						<>
							<UnitControl
								label={__(
									'Display position from the top of the page',
									'vk-blocks-pro'
								)}
								value={`${scrollTiming}${scrollTimingUnit}`}
								onChange={(nextValue) => {
									const units = [
										'px',
										'em',
										'rem',
										'svh',
									];
									const unit =
										units.find((unit) =>
											nextValue.endsWith(unit)
										) || 'px';
									const value = parseFloat(nextValue) || 0;
									setAttributes({
										scrollTiming: value,
										scrollTimingUnit: unit,
									});
								}}
								units={[
									{ value: 'px', label: 'px' },
									{ value: 'em', label: 'em' },
									{ value: 'rem', label: 'rem' },
									{ value: 'svh', label: 'svh' },
								]}
							/>
							<ToggleControl
								label={__(
									'Persist visibility once visible',
									'vk-blocks-pro'
								)}
								checked={scrollPersistVisible}
								onChange={(value) =>
									setAttributes({
										scrollPersistVisible: value,
									})
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
