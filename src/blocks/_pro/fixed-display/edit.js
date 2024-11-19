import { __ } from '@wordpress/i18n';
import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	__experimentalUnitControl as UnitControl,
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	ToggleControl,
	PanelRow,
	RadioControl,
	TextControl,
} from '@wordpress/components';
import { useRef, useState, useEffect } from '@wordpress/element';
import { isParentReusableBlock } from '@vkblocks/utils/is-parent-reusable-block';

const units = [
	{ value: 'px', label: 'px' },
	{ value: 'em', label: 'em' },
	{ value: 'rem', label: 'rem' },
	{ value: '%', label: '%' },
	{ value: 'vh', label: 'vh' },
	{ value: 'svh', label: 'svh' },
];

export default function FixedDisplayEdit(props) {
	const { attributes, setAttributes, clientId } = props;
	const {
		mode,
		position,
		blockId,
		scrollTiming,
		scrollTimingUnit,
		scrollPersistVisible,
		fixedPositionType,
		fixedPositionValue,
		fixedPositionUnit,
		displayAfterSeconds,
		hideAfterSeconds,
		dontShowAgain,
	} = attributes;

	const [tempScrollTiming, setTempScrollTiming] = useState(
		scrollTiming || '0'
	);
	const [tempScrollTimingUnit, setTempScrollTimingUnit] = useState(
		scrollTimingUnit || 'px'
	);

	const [tempDisplayAfterSeconds, setTempDisplayAfterSeconds] = useState(
		displayAfterSeconds || '0'
	);
	const [tempHideAfterSeconds, setTempHideAfterSeconds] = useState(
		hideAfterSeconds || '0'
	);

	// モードが切り替わる際に関連する属性をリセットし、一時変数もリセット
	const prevModeRef = useRef(mode);

	useEffect(() => {
		const prevMode = prevModeRef.current;

		if (prevMode !== mode) {
			resetModeAttributes();
		}

		prevModeRef.current = mode;
	}, [mode]);

	const resetModeAttributes = () => {
		setAttributes({
			scrollTiming: undefined,
			scrollTimingUnit: undefined,
			scrollPersistVisible: false,
			displayAfterSeconds: undefined,
			hideAfterSeconds: undefined,
		});
		setTempScrollTiming('0');
		setTempScrollTimingUnit('px');
		setTempDisplayAfterSeconds('0');
		setTempHideAfterSeconds('0');
	};

	useEffect(() => {
		setTempScrollTiming(scrollTiming || '0');
		setTempScrollTimingUnit(scrollTimingUnit || 'px');
		setTempDisplayAfterSeconds(displayAfterSeconds || '0');
		setTempHideAfterSeconds(hideAfterSeconds || '0');
	}, [scrollTiming, scrollTimingUnit, displayAfterSeconds, hideAfterSeconds]);

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

	const handlePositionChange = (newPosition) => {
		if (['top', 'bottom'].includes(newPosition)) {
			setAttributes({ fixedPositionType: '' });
		}
		setAttributes({ position: newPosition });
	};

	const blockProps = useBlockProps({
		className: `vk_fixed-display vk_fixed-display-mode-${mode} vk_fixed-display-position-${position} ${
			['right', 'left'].includes(position)
				? `vk_fixed-display-position-from-${fixedPositionType}`
				: ''
		} vk_fixed-display-${blockId}`,
	});

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('Fixed Display Settings', 'vk-blocks-pro')}
				>
					<PanelRow>
						<p>
							{__(
								'The fixed position of the block will not change on the edit screen. Please check on the front screen.',
								'vk-blocks-pro'
							)}
						</p>
					</PanelRow>
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
							{
								label: __(
									'Display and Hide After Time',
									'vk-blocks-pro'
								),
								value: 'display-hide-after-time',
							},
						]}
					/>
					<SelectControl
						label={__('Fixed position', 'vk-blocks-pro')}
						value={position}
						onChange={handlePositionChange}
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
					{['right', 'left'].includes(position) && (
						<>
							<RadioControl
								label={__(
									'Fixed position origin',
									'vk-blocks-pro'
								)}
								selected={fixedPositionType}
								options={[
									{
										label: __(
											'Top section',
											'vk-blocks-pro'
										),
										value: 'top',
									},
									{
										label: __(
											'Bottom section',
											'vk-blocks-pro'
										),
										value: 'bottom',
									},
								]}
								onChange={(value) =>
									setAttributes({ fixedPositionType: value })
								}
							/>
							<UnitControl
								label={
									fixedPositionType === 'top'
										? __(
												'Fixed position from the top',
												'vk-blocks-pro'
											)
										: __(
												'Fixed position from the bottom',
												'vk-blocks-pro'
											)
								}
								value={`${fixedPositionValue}${fixedPositionUnit}`}
								onChange={(nextValue) => {
									const unit =
										units.find((unit) =>
											nextValue.endsWith(unit.value)
										) || units[0];
									const value = parseFloat(nextValue) || 0;
									setAttributes({
										fixedPositionValue: value,
										fixedPositionUnit: unit.value,
									});
								}}
								units={units}
							/>
						</>
					)}
				</PanelBody>
				{mode === 'show-on-scroll' && (
					<PanelBody
						title={__('Scroll Display Settings', 'vk-blocks-pro')}
					>
						<UnitControl
							label={__('Timing to display', 'vk-blocks-pro')}
							value={`${tempScrollTiming}${tempScrollTimingUnit}`}
							onChange={(nextValue) => {
								const unit =
									units.find((unit) =>
										nextValue.endsWith(unit.value)
									) || units[0];
								const value = parseFloat(nextValue) || 0;
								setTempScrollTiming(value);
								setTempScrollTimingUnit(unit.value);
								setAttributes({
									scrollTiming: value,
									scrollTimingUnit: unit.value,
								});
							}}
							units={units}
						/>
						<ToggleControl
							label={__(
								'Persist visibility once visible',
								'vk-blocks-pro'
							)}
							checked={scrollPersistVisible}
							onChange={(value) =>
								setAttributes({ scrollPersistVisible: value })
							}
						/>
					</PanelBody>
				)}
				{['display-hide-after-time', 'show-on-scroll'].includes(
					mode
				) && (
					<PanelBody title={__('Timer Settings', 'vk-blocks-pro')}>
						<PanelRow>
							<p>
								{__(
									'Set the timing for display and hide. Enter 0 to disable timing for each option.',
									'vk-blocks-pro'
								)}
							</p>
						</PanelRow>
						{mode === 'display-hide-after-time' && (
							<>
								<TextControl
									label={__(
										'Display after seconds',
										'vk-blocks-pro'
									)}
									value={tempDisplayAfterSeconds}
									onChange={(value) => {
										setTempDisplayAfterSeconds(value);
									}}
									onBlur={() => {
										const parsedValue = parseFloat(
											tempDisplayAfterSeconds
										);
										const finalValue =
											isNaN(parsedValue) ||
											parsedValue < 0
												? 0
												: parsedValue;
										setAttributes({
											displayAfterSeconds: finalValue,
										});
										setTempDisplayAfterSeconds(
											finalValue.toString()
										);
									}}
									type="number"
									min="0"
									step="0.1"
								/>
							</>
						)}
						<TextControl
							label={__('Hide after seconds', 'vk-blocks-pro')}
							value={tempHideAfterSeconds}
							onChange={(value) => {
								setTempHideAfterSeconds(value);
							}}
							onBlur={() => {
								const parsedValue =
									parseFloat(tempHideAfterSeconds);
								const finalValue =
									isNaN(parsedValue) || parsedValue < 0
										? 0
										: parsedValue;
								setAttributes({
									hideAfterSeconds: finalValue,
								});
								setTempHideAfterSeconds(finalValue.toString());
							}}
							type="number"
							min="0"
							step="0.1"
							disabled={scrollPersistVisible}
						/>
					</PanelBody>
				)}
				{mode === 'display-hide-after-time' && (
					<PanelBody
						title={__(
							'Display Settings Until Browser is Closed',
							'vk-blocks-pro'
						)}
					>
						<ToggleControl
							label={__(
								'Do not display again until the browser is closed',
								'vk-blocks-pro'
							)}
							checked={dontShowAgain}
							onChange={(value) =>
								setAttributes({ dontShowAgain: value })
							}
						/>
						<PanelRow>
							<p>
								{__(
									'When enabled, the same content will not be shown again until the visitor closes their browser.',
									'vk-blocks-pro'
								)}
							</p>
						</PanelRow>
					</PanelBody>
				)}
			</InspectorControls>
			<div {...blockProps}>
				<InnerBlocks
					templateLock={false}
					template={[['core/paragraph']]}
				/>
			</div>
		</>
	);
}
