import classnames from 'classnames';
// WordPress  dependencies
import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes, className }) {
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

	return (
		<div {...useBlockProps.save({ className: classes })}>
			<div className={`vk_staff_text`}>
				<RichText.Content
					tagName="h3"
					className={'vk_staff_text_name'}
					style={{ color: vkStaffNameColor }}
					value={vkStaffTextName}
				/>
				<RichText.Content
					tagName="p"
					className={'vk_staff_text_caption'}
					style={{ color: vkStaffCaptionColor }}
					value={vkStaffTextCaption}
				/>
				<RichText.Content
					tagName="p"
					className={'vk_staff_text_role'}
					style={{ color: vkStaffPositionColor }}
					value={vkStaffTextRole}
				/>
				<RichText.Content
					tagName="h4"
					className={'vk_staff_text_profile_title'}
					style={{ color: vkStaffProfileTitleColor }}
					value={vkStaffTextProfileTitle}
				/>
				<RichText.Content
					tagName="p"
					className={'vk_staff_text_profile_text'}
					style={{ color: vkStaffProfileTextColor }}
					value={vkStaffTextProfileText}
				/>
			</div>
			{vkStaffPhotoImage ? (
				<div
					className={`vk_staff_photo vk_staff_photo-border-${vkStaffPhotoBorder}`}
				>
					<img
						className={`vk_staff_photo_image`}
						src={vkStaffPhotoImage}
						alt={vkStaffPhotoImageAlt}
					/>
				</div>
			) : (
				''
			)}
		</div>

		// <NewComponent
		// 	attributes={attributes}
		// 	setAttributes={''}
		// 	className={''}
		// 	for_={'save'}
		// />
	);
}
