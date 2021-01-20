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
	BaseControl,
	SelectControl,
	Button,
} from '@wordpress/components';
import {
	InspectorControls,
	ColorPalette,
	useBlockProps,
	RichText,
	MediaUpload,
} from '@wordpress/block-editor';

export default function StaffEdit({
	attributes,
	setAttributes,
	className,
	clientId,
}) {
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
		[`vk_staff_photo-border-${vk_staff_photoBorder}`]: !!vk_staff_photoBorder, // eslint-disable-line camelcase
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Layout', 'vk-blocks')}>
					<SelectControl
						value={vk_staff_layout} // eslint-disable-line camelcase
						onChange={
							(value) => setAttributes({ vk_staff_layout: value }) // eslint-disable-line camelcase
						}
						options={[
							{
								value: 'default',
								label: __('Default', 'vk-blocks'),
							},
							{
								value: 'imageLeft',
								label: __('Image left', 'vk-blocks'),
							},
						]}
					/>
				</PanelBody>
				<PanelBody title={__('Image border', 'vk-blocks')}>
					<SelectControl
						value={vk_staff_photoBorder} // eslint-disable-line camelcase
						onChange={
							(value) =>
								setAttributes({ vk_staff_photoBorder: value }) // eslint-disable-line camelcase
						}
						options={[
							{
								value: 'default',
								label: __('Default', 'vk-blocks'),
							},
							{
								value: 'none',
								label: __('None', 'vk-blocks'),
							},
						]}
					/>
				</PanelBody>
				<PanelBody title={__('Alt text', 'vk-blocks')}>
					<BaseControl
						help={__(
							'Set the alt text for profile image',
							'vk-blocks'
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
				<PanelBody title={__('Color', 'vk-blocks')}>
					<BaseControl
						id={vkStaffNameColorId}
						label={__('Staff name', 'vk-blocks')}
					>
						<ColorPalette
							id={vkStaffNameColorId}
							value={vk_staff_nameColor} // eslint-disable-line camelcase
							onChange={
								(value) =>
									setAttributes({ vk_staff_nameColor: value }) // eslint-disable-line camelcase
							}
						/>
					</BaseControl>
					<BaseControl
						id={vkStaffCaptionColorId}
						label={__('Name caption', 'vk-blocks')}
					>
						<ColorPalette
							id={vkStaffCaptionColorId}
							value={vk_staff_captionColor} // eslint-disable-line camelcase
							onChange={(value) =>
								setAttributes({
									vk_staff_captionColor: value, // eslint-disable-line camelcase
								})
							}
						/>
					</BaseControl>
					<BaseControl
						id={vkStaffPositionColorId}
						label={__('Role position', 'vk-blocks')}
					>
						<ColorPalette
							id={vkStaffPositionColorId}
							value={vk_staff_positionColor} // eslint-disable-line camelcase
							onChange={(value) =>
								setAttributes({
									vk_staff_positionColor: value, // eslint-disable-line camelcase
								})
							}
						/>
					</BaseControl>
					<BaseControl
						id={vkStaffProfileTitleColorId}
						label={__('Profile title', 'vk-blocks')}
					>
						<ColorPalette
							id={vkStaffProfileTitleColorId}
							value={vk_staff_profileTitleColor} // eslint-disable-line camelcase
							onChange={(value) =>
								setAttributes({
									vk_staff_profileTitleColor: value, // eslint-disable-line camelcase
								})
							}
						/>
					</BaseControl>
					<BaseControl
						id={vkStaffProfileTextColorId}
						label={__('Profile text', 'vk-blocks')}
					>
						<ColorPalette
							id={vkStaffProfileTextColorId}
							value={vk_staff_profileTextColor} // eslint-disable-line camelcase
							onChange={(value) =>
								setAttributes({
									vk_staff_profileTextColor: value, // eslint-disable-line camelcase
								})
							}
						/>
					</BaseControl>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className={`vk_staff_text`}>
					<RichText
						tagName="h3"
						className={'vk_staff_text_name'}
						style={{ color: vk_staff_nameColor }} // eslint-disable-line camelcase
						onChange={(value) =>
							setAttributes({ vk_staff_text_name: value })
						}
						value={vk_staff_text_name} // eslint-disable-line camelcase
						placeholder={__('Your Name', 'vk-blocks')}
					/>
					<RichText
						tagName="p"
						className={'vk_staff_text_caption'}
						style={{ color: vk_staff_captionColor }} // eslint-disable-line camelcase
						onChange={(value) =>
							setAttributes({ vk_staff_text_caption: value })
						}
						value={vk_staff_text_caption} // eslint-disable-line camelcase
						placeholder={__('Caption', 'vk-blocks')}
					/>
					<RichText
						tagName="p"
						className={'vk_staff_text_role'}
						style={{ color: vk_staff_positionColor }} // eslint-disable-line camelcase
						onChange={(value) =>
							setAttributes({ vk_staff_text_role: value })
						}
						value={vk_staff_text_role} // eslint-disable-line camelcase
						placeholder={__('Role position', 'vk-blocks')}
					/>
					<RichText
						tagName="h4"
						className={'vk_staff_text_profileTitle'}
						style={{ color: vk_staff_profileTitleColor }} // eslint-disable-line camelcase
						onChange={(value) =>
							setAttributes({ vk_staff_text_profileTitle: value })
						}
						value={vk_staff_text_profileTitle} // eslint-disable-line camelcase
						placeholder={__('Profile title', 'vk-blocks')}
					/>
					<RichText
						tagName="p"
						className={'vk_staff_text_profileText'}
						style={{ color: vk_staff_profileTextColor }} // eslint-disable-line camelcase
						onChange={
							(value) =>
								setAttributes({
									vk_staff_text_profileText: value,
								}) // eslint-disable-line camelcase
						}
						value={vk_staff_text_profileText} // eslint-disable-line camelcase
						placeholder={__('Profile text', 'vk-blocks')}
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
									__('Select image', 'vk-blocks')
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
