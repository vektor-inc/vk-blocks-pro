import classnames from 'classnames';

// WordPress  dependencies
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
	const vkStaffNameColorId = `vk_staff_name-color-${clientId}`;
	const vkStaffCaptionColorId = `vk_staff_caption-color-${clientId}`;
	const vkStaffPositionColorId = `vk_staff_position-color-${clientId}`;
	const vkStaffProfileTitleColorId = `vk_staff_profileTitle-color-${clientId}`;
	const vkStaffProfileTextColorId = `vk_staff_profileText-color-${clientId}`;
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

	// const figureClasses = classnames('vk_staff_photo', {
	// 	[`vk_staff_photo-border-${vkStaffPhotoBorder}`]: !!vkStaffPhotoBorder,
	// });

	const blockProps = useBlockProps({
		className: classes,
	});

	// TODO! renderImage
	const renderImage = () => {
		if (vkStaffPhotoImage) {
			return (
				<MediaUpload
					onSelect={(value) =>
						setAttributes({
							vkStaffPhotoImage: value.sizes.full.url,
						})
					}
					type="image"
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
									alt={__('Upload image', 'vk-blocks')}
									style={{ border: vkStaffPhotoBorder }}
								/>
							)}
						</Button>
					)}
				/>
			);
		}
	};

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

			<div {...blockProps}>
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
				<div className={'vk_staff_photo'}>{renderImage()}</div>

				{/* <div className={figureClasses}>
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
				</div> */}
			</div>
		</>
	);
}
