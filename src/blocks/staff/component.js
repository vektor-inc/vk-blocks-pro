// WordPress  dependencies
import { __ } from '@wordpress/i18n';
import { RichText, MediaUpload } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { Component } from '@wordpress/element';

export class NewComponent extends Component {
	render() {
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
		} = this.props.attributes;
		const setAttributes = this.props.setAttributes;
		const className = this.props.className;
		const for_ = this.props.for_;
		let returnELm = '';

		if (for_ === 'edit') {
			returnELm = (
				<div
					className={`${className} vk_staff vk_staff-layout-${vkStaffLayout}`}
				>
					<div className={`vk_staff_text`}>
						<RichText
							tagName="h3"
							className={'vkStaffTextName'}
							style={{ color: vkStaffNameColor }}
							onChange={(value) =>
								setAttributes({ vkStaffTextName: value })
							}
							value={vkStaffTextName}
							placeholder={__('Your Name', 'vk-blocks')}
						/>
						<RichText
							tagName="p"
							className={'vkStaffTextCaption'}
							style={{ color: vkStaffCaptionColor }}
							onChange={(value) =>
								setAttributes({ vkStaffTextCaption: value })
							}
							value={vkStaffTextCaption}
							placeholder={__('Caption', 'vk-blocks')}
						/>
						<RichText
							tagName="p"
							className={'vkStaffTextRole'}
							style={{ color: vkStaffPositionColor }}
							onChange={(value) =>
								setAttributes({ vkStaffTextRole: value })
							}
							value={vkStaffTextRole}
							placeholder={__('Role position', 'vk-blocks')}
						/>
						<RichText
							tagName="h4"
							className={'vkStaffTextProfileTitle'}
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
							className={'vkStaffTextProfileText'}
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
							className={'vkStaffPhotoImage'}
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
											className={`vkStaffPhotoImage`}
											src={vkStaffPhotoImage}
											alt={vkStaffPhotoImageAlt}
										/>
									)}
								</Button>
							)}
						/>
					</div>
				</div>
			);
		} else if (for_ === 'save') {
			returnELm = (
				<div
					className={`${className} vk_staff vk_staff-layout-${vkStaffLayout}`}
				>
					<div className={`vk_staff_text`}>
						<RichText.Content
							tagName="h3"
							className={'vkStaffTextName'}
							style={{ color: vkStaffNameColor }}
							value={vkStaffTextName}
						/>
						<RichText.Content
							tagName="p"
							className={'vkStaffTextCaption'}
							style={{ color: vkStaffCaptionColor }}
							value={vkStaffTextCaption}
						/>
						<RichText.Content
							tagName="p"
							className={'vkStaffTextRole'}
							style={{ color: vkStaffPositionColor }}
							value={vkStaffTextRole}
						/>
						<RichText.Content
							tagName="h4"
							className={'vkStaffTextProfileTitle'}
							style={{ color: vkStaffProfileTitleColor }}
							value={vkStaffTextProfileTitle}
						/>
						<RichText.Content
							tagName="p"
							className={'vkStaffTextProfileText'}
							style={{ color: vkStaffProfileTextColor }}
							value={vkStaffTextProfileText}
						/>
					</div>
					{vkStaffPhotoImage ? (
						<div
							className={`vk_staff_photo vk_staff_photo-border-${vkStaffPhotoBorder}`}
						>
							<img
								className={`vkStaffPhotoImage`}
								src={vkStaffPhotoImage}
								alt={vkStaffPhotoImageAlt}
								// alt={sprintf(
								// 	// translators: %s: VK Staff Photo Image Alt.
								// 	__('%s', 'vk-blocks'),
								// 	vkStaffPhotoImageAlt
								// )}
							/>
						</div>
					) : (
						''
					)}
				</div>
			);
		}
		return returnELm;
	}
}
