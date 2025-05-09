/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	TextControl,
	PanelBody,
	RadioControl,
	BaseControl,
	SelectControl,
	Button,
} from '@wordpress/components';
import {
	InspectorControls,
	useBlockProps,
	RichText,
	MediaUpload,
} from '@wordpress/block-editor';
import { isHexColor } from '@vkblocks/utils/is-hex-color';
import { sanitizeSlug } from '@vkblocks/utils/sanitizeSlug';
import { AdvancedColorPalette } from '@vkblocks/components/advanced-color-palette';

export default function StaffEdit(props) {
	const { attributes, setAttributes, className, clientId } = props;
	// id生成
	const vkStaffNameColorId = `vk_staff_name-color-${clientId}`;
	const vkStaffCaptionColorId = `vk_staff_caption-color-${clientId}`;
	const vkStaffPositionColorId = `vk_staff_position-color-${clientId}`;
	const vkStaffProfileTitleColorId = `vk_staff_profileTitle-color-${clientId}`;
	const vkStaffProfileTextColorId = `vk_staff_profileText-color-${clientId}`;
	const {
		vk_staff_layout, // eslint-disable-line camelcase
		vk_staff_nameColor, // eslint-disable-line camelcase
		vk_staff_captionColor, // eslint-disable-line camelcase
		vk_staff_positionColor, // eslint-disable-line camelcase
		vk_staff_profileTitleColor, // eslint-disable-line camelcase
		vk_staff_profileTextColor, // eslint-disable-line camelcase
		vk_staff_photo_image_alt, // eslint-disable-line camelcase
		vk_staff_photoBorder, // eslint-disable-line camelcase
		vk_staff_text_name, // eslint-disable-line camelcase
		vk_staff_text_caption, // eslint-disable-line camelcase
		vk_staff_text_role, // eslint-disable-line camelcase
		vk_staff_text_profileTitle, // eslint-disable-line camelcase
		vk_staff_text_profileText, // eslint-disable-line camelcase
		vk_staff_photo_image, // eslint-disable-line camelcase
		vk_staff_fontFamily,
	} = attributes;

	const classes = classnames('vk_staff', {
		[className]: !!className,
		[`vk_staff-layout-${vk_staff_layout}`]: !!vk_staff_layout, // eslint-disable-line camelcase
	});

	const blockProps = useBlockProps({
		className: classes,
	});

	// 画像の線のクラスとimgタグの親タグのクラス名を生成.
	const imgBorderClassName = classnames('vk_staff_photo', {
		[`vk_staff_photo-border-${vk_staff_photoBorder}`]:
			!!vk_staff_photoBorder, // eslint-disable-line camelcase
	});

	let staffTextClassName = classnames;
	if (vk_staff_fontFamily === '1') {
		staffTextClassName = classnames(
			'vk_staff_text',
			staffTextClassName,
			'vk_staff-headingFont-serif'
		);
	} else {
		staffTextClassName = classnames('vk_staff_text', staffTextClassName);
	}

	let staffNameColorInlineStyle = {};
	let staffTextNameClassName = '';
	if (vk_staff_nameColor !== undefined) {
		staffTextNameClassName += ` has-text-color`;
		if (isHexColor(vk_staff_nameColor)) {
			staffNameColorInlineStyle = { color: `${vk_staff_nameColor}` };
		} else {
			staffTextNameClassName += ` has-${sanitizeSlug(vk_staff_nameColor)}-color`;
		}
	}

	let staffCaptionColorInlineStyle = {};
	let staffCaptionClassName = '';
	if (vk_staff_captionColor !== undefined) {
		staffCaptionClassName += ` has-text-color`;
		if (isHexColor(vk_staff_captionColor)) {
			staffCaptionColorInlineStyle = {
				color: `${vk_staff_captionColor}`,
			};
		} else {
			staffCaptionClassName += ` has-${sanitizeSlug(vk_staff_captionColor)}-color`;
		}
	}

	let staffPositionColorInlineStyle = {};
	let staffPositionClassName = '';
	if (vk_staff_positionColor !== undefined) {
		staffPositionClassName += ` has-text-color`;
		if (isHexColor(vk_staff_positionColor)) {
			staffPositionColorInlineStyle = {
				color: `${vk_staff_positionColor}`,
			};
		} else {
			staffPositionClassName += ` has-${sanitizeSlug(vk_staff_positionColor)}-color`;
		}
	}

	let staffProfileTitleColorInlineStyle = {};
	let staffProfileTitleClassName = '';
	if (vk_staff_profileTitleColor !== undefined) {
		staffProfileTitleClassName += ` has-text-color`;
		if (isHexColor(vk_staff_profileTitleColor)) {
			staffProfileTitleColorInlineStyle = {
				color: `${vk_staff_profileTitleColor}`,
			};
		} else {
			staffProfileTitleClassName += ` has-${sanitizeSlug(vk_staff_profileTitleColor)}-color`;
		}
	}

	let staffProfileTextColorInlineStyle = {};
	let staffProfileTextClassName = '';
	if (vk_staff_profileTextColor !== undefined) {
		staffProfileTextClassName += ` has-text-color`;
		if (isHexColor(vk_staff_profileTextColor)) {
			staffProfileTextColorInlineStyle = {
				color: `${vk_staff_profileTextColor}`,
			};
		} else {
			staffProfileTextClassName += ` has-${sanitizeSlug(vk_staff_profileTextColor)}-color`;
		}
	}

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Layout', 'vk-blocks-pro')}>
					<SelectControl
						value={vk_staff_layout} // eslint-disable-line camelcase
						onChange={
							(value) => setAttributes({ vk_staff_layout: value }) // eslint-disable-line camelcase
						}
						options={[
							{
								value: 'default',
								label: __('Default', 'vk-blocks-pro'),
							},
							{
								value: 'imageLeft',
								label: __('Image left', 'vk-blocks-pro'),
							},
						]}
					/>
				</PanelBody>
				<PanelBody title={__('Image border', 'vk-blocks-pro')}>
					<SelectControl
						value={vk_staff_photoBorder} // eslint-disable-line camelcase
						onChange={
							(value) =>
								setAttributes({ vk_staff_photoBorder: value }) // eslint-disable-line camelcase
						}
						options={[
							{
								value: 'default',
								label: __('Default', 'vk-blocks-pro'),
							},
							{
								value: 'none',
								label: __('None', 'vk-blocks-pro'),
							},
						]}
					/>
				</PanelBody>
				<PanelBody title={__('Alt text', 'vk-blocks-pro')}>
					<BaseControl
						help={__(
							'Set the alt text for profile image',
							'vk-blocks-pro'
						)}
					>
						<TextControl
							value={vk_staff_photo_image_alt} // eslint-disable-line camelcase
							onChange={(value) =>
								setAttributes({
									vk_staff_photo_image_alt: value, // eslint-disable-line camelcase
								})
							}
						/>
					</BaseControl>
				</PanelBody>
				<PanelBody title={__('Color', 'vk-blocks-pro')}>
					<BaseControl
						id={vkStaffNameColorId}
						label={__('Staff name', 'vk-blocks-pro')}
					>
						<AdvancedColorPalette
							id={vkStaffNameColorId}
							schema={'vk_staff_nameColor'}
							{...props}
						/>
					</BaseControl>
					<BaseControl
						id={vkStaffCaptionColorId}
						label={__('Name caption', 'vk-blocks-pro')}
					>
						<AdvancedColorPalette
							id={vkStaffCaptionColorId}
							schema={'vk_staff_captionColor'}
							{...props}
						/>
					</BaseControl>
					<BaseControl
						id={vkStaffPositionColorId}
						label={__('Role position', 'vk-blocks-pro')}
					>
						<AdvancedColorPalette
							id={vkStaffPositionColorId}
							schema={'vk_staff_positionColor'}
							{...props}
						/>
					</BaseControl>
					<BaseControl
						id={vkStaffProfileTitleColorId}
						label={__('Profile title', 'vk-blocks-pro')}
					>
						<AdvancedColorPalette
							id={vkStaffProfileTitleColorId}
							schema={'vk_staff_profileTitleColor'}
							{...props}
						/>
					</BaseControl>
					<BaseControl
						id={vkStaffProfileTextColorId}
						label={__('Profile text', 'vk-blocks-pro')}
					>
						<AdvancedColorPalette
							id={vkStaffProfileTextColorId}
							schema={'vk_staff_profileTextColor'}
							{...props}
						/>
					</BaseControl>
				</PanelBody>
				<PanelBody title={__('Heading Font', 'vk-blocks-pro')}>
					<RadioControl
						label={__('Font', 'vk-blocks-pro')}
						selected={vk_staff_fontFamily}
						options={[
							{
								label: __('Unspecified', 'vk-blocks-pro'),
								value: '0',
							},
							{
								label: __('minchoBody', 'vk-blocks-pro'),
								value: '1',
							},
						]}
						onChange={(value) =>
							setAttributes({ vk_staff_fontFamily: value })
						}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className={staffTextClassName}>
					<RichText
						tagName="h3"
						className={
							`vk_staff_text_name` + staffTextNameClassName
						}
						style={staffNameColorInlineStyle}
						onChange={(value) =>
							setAttributes({ vk_staff_text_name: value })
						}
						value={vk_staff_text_name} // eslint-disable-line camelcase
						placeholder={__('Your Name', 'vk-blocks-pro')}
					/>
					<RichText
						tagName="p"
						className={
							`vk_staff_text_caption` + staffCaptionClassName
						}
						style={staffCaptionColorInlineStyle}
						onChange={(value) =>
							setAttributes({ vk_staff_text_caption: value })
						}
						value={vk_staff_text_caption} // eslint-disable-line camelcase
						placeholder={__('Caption', 'vk-blocks-pro')}
					/>
					<RichText
						tagName="p"
						className={
							`vk_staff_text_role` + staffPositionClassName
						}
						style={staffPositionColorInlineStyle}
						onChange={(value) =>
							setAttributes({ vk_staff_text_role: value })
						}
						value={vk_staff_text_role} // eslint-disable-line camelcase
						placeholder={__('Role position', 'vk-blocks-pro')}
					/>
					<RichText
						tagName="h4"
						className={
							`vk_staff_text_profileTitle` +
							staffProfileTitleClassName
						}
						style={staffProfileTitleColorInlineStyle}
						onChange={(value) =>
							setAttributes({ vk_staff_text_profileTitle: value })
						}
						value={vk_staff_text_profileTitle} // eslint-disable-line camelcase
						placeholder={__('Profile title', 'vk-blocks-pro')}
					/>
					<RichText
						tagName="p"
						className={
							`vk_staff_text_profileText` +
							staffProfileTextClassName
						}
						style={staffProfileTextColorInlineStyle}
						onChange={
							(value) =>
								setAttributes({
									vk_staff_text_profileText: value,
								}) // eslint-disable-line camelcase
						}
						value={vk_staff_text_profileText} // eslint-disable-line camelcase
						placeholder={__('Profile text', 'vk-blocks-pro')}
					/>
				</div>
				<div className={imgBorderClassName}>
					<MediaUpload
						onSelect={(value) =>
							setAttributes({
								vk_staff_photo_image: value.sizes.full.url,
							})
						}
						type="image"
						value={vk_staff_photo_image} // eslint-disable-line camelcase
						render={({ open }) => (
							<Button
								onClick={open}
								className={
									vk_staff_photo_image // eslint-disable-line camelcase
										? 'image-button'
										: 'button button-large'
								}
							>
								{!vk_staff_photo_image ? ( // eslint-disable-line camelcase
									__('Select image', 'vk-blocks-pro')
								) : (
									<img
										className={`vk_staff_photo_image`}
										src={vk_staff_photo_image} // eslint-disable-line camelcase
										alt={vk_staff_photo_image_alt} // eslint-disable-line camelcase
									/>
								)}
							</Button>
						)}
					/>
				</div>
			</div>
		</>
	);
}
