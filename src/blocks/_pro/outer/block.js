/**
 * outer block type
 */
import { OuterBlock } from './component';
import { schema } from './schema';
import { deprecated } from './deprecated';
import toNumber from '@vkblocks/utils/to-number';
import { AdvancedMediaUpload } from '@vkblocks/components/advanced-media-upload';
import { hiddenNewBlock } from '@vkblocks/utils/hiddenNewBlock';
import { ReactComponent as Icon } from './icon.svg';
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import {
	RangeControl,
	RadioControl,
	PanelBody,
	BaseControl,
	SelectControl,
	ButtonGroup,
	Button,
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { InspectorControls, ColorPalette } from '@wordpress/block-eEditor';


registerBlockType('vk-blocks/outer', {
	title: __('Outer', 'vk-blocks'),
	icon: <Icon />,
	category: 'vk-blocks-cat-layout',
	attributes: {
		bgColor: {
			type: 'string',
			default: '#f3f4f5',
		},
		defaultBgColor: {
			type: 'string',
			default: '#f3f4f5',
		},
		bgImage: {
			type: 'string',
			default: null,
		},
		bgImageTablet: {
			type: 'string',
			default: null,
		},
		bgImageMobile: {
			type: 'string',
			default: null,
		},
		outerWidth: {
			type: 'string',
			default: 'normal',
		},
		bgPosition: {
			type: 'string',
			default: 'normal',
		},
		padding_left_and_right: {
			type: 'string',
			default: '0',
		},
		padding_top_and_bottom: {
			type: 'string',
			default: '1',
		},
		opacity: {
			type: 'number',
			default: 0.5,
		},
		upper_level: {
			type: 'number',
			default: 0,
		},
		lower_level: {
			type: 'number',
			default: 0,
		},
		dividerType: {
			type: 'string',
			default: 'tilt',
		},
		upperDividerBgColor: {
			type: 'string',
			default: '#fff',
		},
		lowerDividerBgColor: {
			type: 'string',
			default: '#fff',
		},
		borderWidth: {
			type: 'number',
			default: 0,
		},
		borderStyle: {
			type: 'string',
			default: 'none',
		},
		borderColor: {
			type: 'string',
			default: '#000',
		},
		borderRadius: {
			type: 'number',
			default: 0,
		},
		clientId: {
			type: 'string',
			default: null,
		},
	},
	supports: {
		anchor: true,
	},
	edit(props) {
		const { attributes, setAttributes, className, clientId } = props;
		const {
			bgColor,
			defaultBgColor,
			bgPosition,
			outerWidth,
			// eslint-disable-next-line camelcase
			padding_left_and_right,
			// eslint-disable-next-line camelcase
			padding_top_and_bottom,
			opacity,
			// eslint-disable-next-line camelcase
			upper_level,
			// eslint-disable-next-line camelcase
			lower_level,
			upperDividerBgColor,
			lowerDividerBgColor,
			dividerType,
			borderWidth,
			borderStyle,
			borderColor,
			borderRadius,
		} = attributes;

		//save clientId for using in Class.
		setAttributes({ clientId });
		// eslint-disable-next-line no-shadow
		const setColorIfUndefined = (bgColor) => {
			if (bgColor === undefined) {
				bgColor = defaultBgColor;
			}
			return bgColor;
		};

		// eslint-disable-next-line no-shadow
		const setBgColor = (bgColor) => {
			bgColor = setColorIfUndefined(bgColor);
			setAttributes({ bgColor });
		};

		return (
			<Fragment>
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
								onChange={(value) => setBgColor(value)}
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
						<BaseControl
							label={__('Width', 'vk-blocks')}
							className={'vk_outer_sidebar_bgImage'}
							id={`vk_outer-width`}
						>
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
								label={__(
									'Padding (Left and Right)',
									'vk-blocks'
								)}
								// eslint-disable-next-line camelcase
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
								label={__(
									'Padding (Top and Bottom)',
									'vk-blocks'
								)}
								className={'mb-1'}
								// eslint-disable-next-line camelcase
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
								// eslint-disable-next-line camelcase
								value={upper_level}
								onChange={(value) =>
									setAttributes({
										// eslint-disable-next-line camelcase
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
								// eslint-disable-next-line camelcase
								value={lower_level}
								onChange={(value) =>
									setAttributes({
										// eslint-disable-next-line camelcase
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
										borderRadius: toNumber(
											value,
											-100,
											100
										),
									})
								}
								min="-100"
								max="100"
							/>
						</BaseControl>
					</PanelBody>
				</InspectorControls>
				<OuterBlock
					clientId={clientId}
					attributes={attributes}
					className={className}
					for_={'edit'}
				/>
			</Fragment>
		);
	},

	save(props) {
		const { attributes } = props;
		return (
			<OuterBlock
				clientId={attributes.clientId}
				attributes={attributes}
				for_={'save'}
			/>
		);
	},

	deprecated,
});
