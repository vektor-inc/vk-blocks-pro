import toNumber from '@vkblocks/utils/to-number';
import { AdvancedMediaUpload } from '@vkblocks/components/advanced-media-upload';
import { __ } from '@wordpress/i18n';
import {
	RangeControl,
	RadioControl,
	PanelBody,
	BaseControl,
	SelectControl,
	ButtonGroup,
	Button,
} from '@wordpress/components';
import {
	InspectorControls,
	ColorPalette,
	InnerBlocks,
	useBlockProps,
} from '@wordpress/block-editor';
import { componentDivider } from './component-divider';
import GenerateBgImage from '@vkblocks/utils/GenerateBgImage';

/* eslint eslint-disable-next-line camelcase: 0 */
export default function OuterEdit(props) {
	const { attributes, setAttributes, clientId } = props;
	const {
		bgColor,
		bgPosition,
		outerWidth,
		padding_left_and_right,
		padding_top_and_bottom,
		opacity,
		upper_level,
		lower_level,
		upperDividerBgColor,
		lowerDividerBgColor,
		dividerType,
		borderWidth,
		borderStyle,
		borderColor,
		borderRadius,
	} = attributes;

	let classPaddingLR;
	let classPaddingVertical;
	let classBgPosition;
	let containerClass;
	let whichSideUpper;
	let whichSideLower;
	let borderProperty;
	let borderRadiusProperty;

	setAttributes({ clientId });

	//幅のクラス切り替え
	// eslint-disable-next-line prefer-const
	const classWidth = ` vk_outer-width-${outerWidth}`;

	//classBgPositionのクラス切り替え
	if (bgPosition === 'parallax') {
		classBgPosition = ' vk_outer-bgPosition-parallax vk-prlx';
	} else if (bgPosition === 'fixed') {
		classBgPosition = ' vk_outer-bgPosition-fixed';
	} else if (bgPosition === 'repeat') {
		classBgPosition = ' vk_outer-bgPosition-repeat';
	} else {
		classBgPosition = ' vk_outer-bgPosition-normal';
	}

	//classPaddingLRのクラス切り替え
	classPaddingLR = '';
	if (padding_left_and_right === '0') {
		classPaddingLR = ' vk_outer-paddingLR-none';
	} else if (padding_left_and_right === '1') {
		classPaddingLR = ' vk_outer-paddingLR-use';
	} else if (padding_left_and_right === '2') {
		// Fit to content area width
		classPaddingLR = ' vk_outer-paddingLR-zero';
	}

	//classPaddingVerticalのクラス切り替
	if (padding_top_and_bottom === '1') {
		classPaddingVertical = ' vk_outer-paddingVertical-use';
	} else {
		classPaddingVertical = ' vk_outer-paddingVertical-none';
	}

	//上側セクションの傾き切り替
	if (upper_level) {
		whichSideUpper = 'upper';
	}

	//下側セクションの傾き切り替
	if (lower_level) {
		whichSideLower = 'lower';
	}

	//borderColorクリア時に白をセットする
	if (borderColor === null || borderColor === undefined) {
		setAttributes({ borderColor: '#fff' });
	}

	//bgColorクリア時に白をセットする
	if (bgColor === null || bgColor === undefined) {
		setAttributes({ bgColor: '#f3f4f5' });
	}

	//Dividerエフェクトがない時のみ枠線を追
	if (upper_level === 0 && lower_level === 0) {
		borderProperty = `${borderWidth}px ${borderStyle} ${borderColor}`;
		borderRadiusProperty = `${borderRadius}px`;
	} else {
		borderProperty = 'none';
		borderRadiusProperty = `0px`;
	}

	const blockProps = useBlockProps({
		className: `vkb-outer-${clientId} vk_outer ${classWidth} ${classPaddingLR} ${classPaddingVertical} ${classBgPosition}`,
	});

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('Background Setting', 'vk-blocks')}
					initialOpen={false}
				>
					<BaseControl
						id={`vk_outer-colorSetting`}
						label={__('Color Setting', 'vk-blocks')}
						help={__(
							'Color will overcome background image. If you want to display image, clear background color or set opacity 0.',
							'vk-blocks'
						)}
					>
						<ColorPalette
							value={bgColor}
							onChange={(value) =>
								setAttributes({ bgColor: value })
							}
						/>
					</BaseControl>
					<BaseControl
						label={__('Opacity Setting', 'vk-blocks')}
						id={`vk_outer-opacitySetting`}
					>
						<RangeControl
							value={opacity}
							onChange={(value) => {
								setAttributes({ opacity: value });
							}}
							min={0}
							max={1}
							step={0.1}
						/>
					</BaseControl>
					<BaseControl
						label={__('Background Image PC', 'vk-blocks')}
						className={'vk_outer_sidebar_bgImage'}
						id={`vk_outer-bgImagePC`}
					>
						<div
							className={
								'vk_outer_sidebar_bgImage_button_container'
							}
						>
							<AdvancedMediaUpload
								schema={'bgImage'}
								{...props}
							/>
						</div>
					</BaseControl>
					<BaseControl
						label={__('Background Image Tablet', 'vk-blocks')}
						className={'vk_outer_sidebar_bgImage'}
						id={`vk_outer-bgImageTablet`}
					>
						<AdvancedMediaUpload
							schema={'bgImageTablet'}
							{...props}
						/>
					</BaseControl>
					<BaseControl
						label={__('Background Image Mobile', 'vk-blocks')}
						className={'vk_outer_sidebar_bgImage'}
						id={`vk_outer-bgImageMobile`}
					>
						<AdvancedMediaUpload
							schema={'bgImageMobile'}
							{...props}
						/>
					</BaseControl>
					<BaseControl
						label={__('Background image Position', 'vk-blocks')}
						help=""
						id={`vk_outer-bgPosition`}
					>
						<RadioControl
							selected={bgPosition}
							options={[
								{
									label: __('Repeat', 'vk-blocks'),
									value: 'repeat',
								},
								{
									label: __('Cover', 'vk-blocks'),
									value: 'normal',
								},
								{
									label: __(
										'Cover fixed (Not fixed on iPhone)',
										'vk-blocks'
									),
									value: 'fixed',
								},
								{
									label: __(
										'Parallax (Non-guaranteed)',
										'vk-blocks'
									),
									value: 'parallax',
								},
							]}
							onChange={(value) =>
								setAttributes({ bgPosition: value })
							}
						/>
					</BaseControl>
				</PanelBody>

				<PanelBody
					title={__('Layout Setting', 'vk-blocks')}
					initialOpen={false}
				>
					<p>{__('Width', 'vk-blocks')} </p>
					<BaseControl>
						<ButtonGroup className="mb-3">
							<Button
								isSmall
								isPrimary={outerWidth === 'normal'}
								isSecondary={outerWidth !== 'normal'}
								onClick={() =>
									setAttributes({ outerWidth: 'normal' })
								}
							>
								{__('Normal', 'vk-blocks')}
							</Button>
							<Button
								isSmall
								isPrimary={outerWidth === 'full'}
								isSecondary={outerWidth !== 'full'}
								onClick={() =>
									setAttributes({ outerWidth: 'full' })
								}
							>
								{__('Full Wide', 'vk-blocks')}
							</Button>
						</ButtonGroup>

						<RadioControl
							label={__('Padding (Left and Right)', 'vk-blocks')}
							selected={padding_left_and_right}
							options={[
								{
									label: __(
										'Fit to the Content area',
										'vk-blocks'
									),
									value: '0',
								},
								{
									label: __(
										'Add padding to the Outer area',
										'vk-blocks'
									),
									value: '1',
								},
								{
									label: __(
										'Remove padding from the Outer area',
										'vk-blocks'
									),
									value: '2',
								},
							]}
							onChange={(value) =>
								setAttributes({
									padding_left_and_right: value,
								})
							}
						/>
						<RadioControl
							label={__('Padding (Top and Bottom)', 'vk-blocks')}
							className={'mb-1'}
							selected={padding_top_and_bottom}
							options={[
								{
									label: __(
										'Use default padding',
										'vk-blocks'
									),
									value: '1',
								},
								{
									label: __(
										'Do not use default padding',
										'vk-blocks'
									),
									value: '0',
								},
							]}
							onChange={(value) =>
								setAttributes({
									padding_top_and_bottom: value,
								})
							}
						/>
						<p>
							{__(
								'* If you select "Do not use" that, please set yourself it such as a spacer block.',
								'vk-blocks'
							)}
						</p>
					</BaseControl>
				</PanelBody>
				<PanelBody
					title={__('Divider Setting', 'vk-blocks')}
					initialOpen={false}
				>
					<BaseControl>
						<SelectControl
							label={__('Type', 'vk-blocks')}
							value={dividerType}
							onChange={(value) =>
								setAttributes({ dividerType: value })
							}
							options={[
								{
									value: 'tilt',
									label: __('Tilt', 'vk-blocks'),
								},
								{
									value: 'curve',
									label: __('Curve', 'vk-blocks'),
								},
								{
									value: 'wave',
									label: __('Wave', 'vk-blocks'),
								},
								{
									value: 'triangle',
									label: __('Triangle', 'vk-blocks'),
								},
							]}
						/>
					</BaseControl>
					<BaseControl
						label={__('Upper Divider Level', 'vk-blocks')}
						id={`vk_outer-upperDividerLevel`}
					>
						<RangeControl
							value={upper_level}
							onChange={(value) =>
								setAttributes({
									upper_level: toNumber(value, -100, 100),
								})
							}
							min="-100"
							max="100"
						/>
					</BaseControl>
					<BaseControl>
						<ColorPalette
							value={upperDividerBgColor}
							onChange={(value) =>
								setAttributes({
									upperDividerBgColor: value,
								})
							}
						/>
					</BaseControl>
					<BaseControl
						label={__('Lower Divider Level', 'vk-blocks')}
						id={`vk_outer-lowerDividerLevel`}
					>
						<RangeControl
							value={lower_level}
							onChange={(value) =>
								setAttributes({
									lower_level: toNumber(value, -100, 100),
								})
							}
							min="-100"
							max="100"
						/>
					</BaseControl>
					<BaseControl>
						<ColorPalette
							value={lowerDividerBgColor}
							onChange={(value) =>
								setAttributes({
									lowerDividerBgColor: value,
								})
							}
						/>
					</BaseControl>
				</PanelBody>
				<PanelBody
					title={__('Border Setting', 'vk-blocks')}
					initialOpen={false}
				>
					<BaseControl>
						<p>
							{__(
								'Border will disappear when divider effect is applied.',
								'vk-blocks'
							)}
						</p>
						<SelectControl
							label={__('Border type', 'vk-blocks')}
							value={borderStyle}
							onChange={(value) =>
								setAttributes({ borderStyle: value })
							}
							options={[
								{
									value: 'none',
									label: __('None', 'vk-blocks'),
								},
								{
									value: 'solid',
									label: __('Solid', 'vk-blocks'),
								},
								{
									value: 'dotted',
									label: __('Dotted', 'vk-blocks'),
								},
								{
									value: 'dashed',
									label: __('Dashed', 'vk-blocks'),
								},
								{
									value: 'double',
									label: __('Double', 'vk-blocks'),
								},
								{
									value: 'groove',
									label: __('Groove', 'vk-blocks'),
								},
								{
									value: 'ridge',
									label: __('Ridge', 'vk-blocks'),
								},
								{
									value: 'inset',
									label: __('Inset', 'vk-blocks'),
								},
								{
									value: 'outset',
									label: __('Outset', 'vk-blocks'),
								},
							]}
						/>
					</BaseControl>
					<BaseControl>
						<ColorPalette
							value={borderColor}
							onChange={(value) =>
								setAttributes({ borderColor: value })
							}
						/>
					</BaseControl>
					<BaseControl
						label={__('Border width', 'vk-blocks')}
						id={`vk_outer-borderWidth`}
					>
						<RangeControl
							value={borderWidth}
							onChange={(value) =>
								setAttributes({ borderWidth: value })
							}
							min="0"
						/>
					</BaseControl>
					<BaseControl
						label={__('Border radius', 'vk-blocks')}
						id={`vk_outer-borderRadius`}
					>
						<RangeControl
							value={borderRadius}
							onChange={(value) =>
								setAttributes({
									borderRadius: toNumber(value, -100, 100),
								})
							}
							min="-100"
							max="100"
						/>
					</BaseControl>
				</PanelBody>
			</InspectorControls>
			<div
				{...blockProps}
				style={{
					border: borderProperty,
					borderRadius: borderRadiusProperty,
				}}
			>
				<GenerateBgImage
					prefix={'vkb-outer'}
					clientId={clientId}
					{...props}
				/>
				<div>
					{componentDivider(
						upper_level,
						upperDividerBgColor,
						whichSideUpper,
						dividerType
					)}
					<div className={containerClass}>
						<InnerBlocks />
					</div>
					{componentDivider(
						lower_level,
						lowerDividerBgColor,
						whichSideLower,
						dividerType
					)}
				</div>
			</div>
		</>
	);
}
