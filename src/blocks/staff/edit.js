import classnames from 'classnames';
// import { pick } from 'lodash';

// WordPress  dependencies
import { useInstanceId } from '@wordpress/compose';
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
	//MediaPlaceholder
	MediaUpload,
} from '@wordpress/block-editor';
// import { image as icon } from '@wordpress/icons';

// pick imageProps
// export const pickRelevantMediaFiles = (image) => {
// 	const imageProps = pick(image, ['alt', 'id', 'link', 'caption']);
// 	imageProps.url =
// 		get(image, ['sizes', 'large', 'url']) ||
// 		get(image, ['media_details', 'sizes', 'large', 'source_url']) ||
// 		image.url;
// 	return imageProps;
// };

export default function StaffEdit({ attributes, setAttributes, className }) {
	const instanceId = useInstanceId(StaffEdit);
	const vkStaffNameColorId = `vk_staff_name-color-${instanceId}`;
	const vkStaffCaptionColorId = `vk_staff_caption-color-${instanceId}`;
	const vkStaffPositionColorId = `vk_staff_position-color-${instanceId}`;
	const vkStaffProfileTitleColorId = `vk_staff_profileTitle-color-${instanceId}`;
	const vkStaffProfileTextColorId = `vk_staff_profileText-color-${instanceId}`;
	const {
		vkStaffTextName,
		vkStaffTextCaption,
		vkStaffTextRole,
		vkStaffTextProfileTitle,
		vkStaffTextProfileText,
		vkStaffPhotoImage,
		vkStaffPhotoImageAlt,
		vkStaffLayout,
		vkStaffNameColor,
		vkStaffCaptionColor,
		vkStaffPositionColor,
		vkStaffProfileTitleColor,
		vkStaffProfileTextColor,
		vkStaffPhotoBorder,
	} = attributes;

	const classes = classnames('vk_staff', {
		[className]: !!className,
		[`vk_staff-layout-${vkStaffLayout}`]: !!vkStaffLayout,
	});

	// const mediaPlaceholder = (
	// 	<MediaPlaceholder
	// 		icon={ <BlockIcon icon={ icon } /> }
	// 		onSelect={ onSelectImage }
	// 		onSelectURL={ onSelectURL }
	// 		notices={ noticeUI }
	// 		onError={ onUploadError }
	// 		accept="image/*"
	// 		allowedTypes={ ALLOWED_MEDIA_TYPES }
	// 		value={ { id, src } }
	// 		mediaPreview={ mediaPreview }
	// 		disableMediaButtons={ url }
	// 	/>
	// );

	// const figureClasses = classnames('vk_staff_photo', {
	// 	[`vk_staff_photo-border-${vkStaffPhotoBorder}`]: !!vkStaffPhotoBorder,
	// });

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Layout', 'vk-blocks')}>
					<SelectControl
						value={vkStaffLayout}
						onChange={(value) =>
							setAttributes({ vkStaffLayout: value })
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
						value={vkStaffPhotoBorder}
						onChange={(value) =>
							setAttributes({ vkStaffPhotoBorder: value })
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
							value={vkStaffPhotoImageAlt}
							onChange={(value) =>
								setAttributes({
									vkStaffPhotoImageAlt: value,
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
							value={vkStaffNameColor}
							onChange={(value) =>
								setAttributes({ vkStaffNameColor: value })
							}
						/>
					</BaseControl>
					<BaseControl
						id={vkStaffCaptionColorId}
						label={__('Name caption', 'vk-blocks')}
					>
						<ColorPalette
							id={vkStaffCaptionColorId}
							value={vkStaffCaptionColor}
							onChange={(value) =>
								setAttributes({ vkStaffCaptionColor: value })
							}
						/>
					</BaseControl>
					<BaseControl
						id={vkStaffPositionColorId}
						label={__('Role position', 'vk-blocks')}
					>
						<ColorPalette
							id={vkStaffPositionColorId}
							value={vkStaffPositionColor}
							onChange={(value) =>
								setAttributes({ vkStaffPositionColor: value })
							}
						/>
					</BaseControl>
					<BaseControl
						id={vkStaffProfileTitleColorId}
						label={__('Profile title', 'vk-blocks')}
					>
						<ColorPalette
							id={vkStaffProfileTitleColorId}
							value={vkStaffProfileTitleColor}
							onChange={(value) =>
								setAttributes({
									vkStaffProfileTitleColor: value,
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
							value={vkStaffProfileTextColor}
							onChange={(value) =>
								setAttributes({
									vkStaffProfileTextColor: value,
								})
							}
						/>
					</BaseControl>
				</PanelBody>
			</InspectorControls>

			<div {...useBlockProps({ className: classes })}>
				<div className={'vk_staff_text'}>
					<RichText
						tagName="h3"
						className={'vk_staff_text_name'}
						style={{ color: vkStaffNameColor }}
						onChange={(value) =>
							setAttributes({ vkStaffTextName: value })
						}
						value={vkStaffTextName}
						placeholder={__('Your Name', 'vk-blocks')}
					/>
					<RichText
						tagName="p"
						className={'vk_staff_text_caption'}
						style={{ color: vkStaffCaptionColor }}
						onChange={(value) =>
							setAttributes({ vkStaffTextCaption: value })
						}
						value={vkStaffTextCaption}
						placeholder={__('Caption', 'vk-blocks')}
					/>
					<RichText
						tagName="p"
						className={'vk_staff_text_role'}
						style={{ color: vkStaffPositionColor }}
						onChange={(value) =>
							setAttributes({ vkStaffTextRole: value })
						}
						value={vkStaffTextRole}
						placeholder={__('Role position', 'vk-blocks')}
					/>
					<RichText
						tagName="h4"
						className={'vk_staff_text_profileTitle'}
						style={{ color: vkStaffProfileTitleColor }}
						onChange={(value) =>
							setAttributes({
								vkStaffTextProfileTitle: value,
							})
						}
						value={vkStaffTextProfileTitle}
						placeholder={__('Profile title', 'vk-blocks')}
					/>
					<RichText
						tagName="p"
						className={'vk_staff_text_profileText'}
						style={{ color: vkStaffProfileTextColor }}
						onChange={(value) =>
							setAttributes({
								vkStaffTextProfileText: value,
							})
						}
						value={vkStaffTextProfileText}
						placeholder={__('Profile text', 'vk-blocks')}
					/>
				</div>
				<div
					className={`vk_staff_photo vk_staff_photo-border-${vkStaffPhotoBorder}`}
				>
					<MediaUpload
						onSelect={(value) =>
							setAttributes({
								vkStaffPhotoImage: value.sizes.full.url,
							})
						}
						type="image"
						className={'vk_staff_photo_image'}
						value={vkStaffPhotoImage}
						render={({ open }) => (
							<Button
								onClick={open}
								className={
									vkStaffPhotoImage
										? 'image-button'
										: 'button button-large'
								}
							>
								{!vkStaffPhotoImage ? (
									__('Select image', 'vk-blocks')
								) : (
									<img
										className={'vk_staff_photo_image'}
										src={vkStaffPhotoImage}
										alt={vkStaffPhotoImageAlt}
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
