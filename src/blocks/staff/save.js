import classnames from 'classnames';

// WordPress  dependencies
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';

import { fixBrokenUnicode } from '@vkblocks/utils/depModules';

export default function save({ attributes, className }) {
	const {
		imageBorderProperty,
		vkStaffTextName,
		vkStaffTextCaption,
		vkStaffTextRole,
		vkStaffTextProfileTitle,
		vkStaffTextProfileText,
		vkStaffPhotoImage,
		//vkStaffPhotoImageAlt,
		vkStaffLayout,
		vkStaffNameColor,
		vkStaffCaptionColor,
		vkStaffPositionColor,
		vkStaffProfileTitleColor,
		vkStaffProfileTextColor,
		//vkStaffPhotoBorder,
	} = attributes;

	const classes = classnames('vk_staff', {
		[className]: !!className,
		[`vk_staff-layout-${vkStaffLayout}`]: !!vkStaffLayout,
	});
	const renderImage = () => {
		if (!vkStaffPhotoImage) {
			return __('Select image', 'vk-blocks');
		}
		if (vkStaffPhotoImage && vkStaffPhotoImage.indexOf('{') === -1) {
			return (
				<img
					className={'vk_staff_photo_image'}
					src={vkStaffPhotoImage}
					alt={__('Upload image', 'vk-blocks')}
					style={{ border: imageBorderProperty }}
				/>
			);
		}
		const ImageParse = JSON.parse(fixBrokenUnicode(vkStaffPhotoImage));
		if (ImageParse && typeof ImageParse.sizes !== 'undefined') {
			return (
				<img
					className={'vk_staff_photo_image'}
					src={ImageParse.sizes.full.url}
					alt={ImageParse.alt}
					style={{ border: imageBorderProperty }}
				/>
			);
		}
	};
	// const figureClasses = classnames('vk_staff_photo', {
	// 	[`vk_staff_photo-border-${vkStaffPhotoBorder}`]: !!vkStaffPhotoBorder,
	// });

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
					className={'vk_staff_text_profileTitle'}
					style={{ color: vkStaffProfileTitleColor }}
					value={vkStaffTextProfileTitle}
				/>
				<RichText.Content
					tagName="p"
					className={'vk_staff_text_profileText'}
					style={{ color: vkStaffProfileTextColor }}
					value={vkStaffTextProfileText}
				/>
			</div>
			{/* {vkStaffPhotoImage ? (
				<figure className={figureClasses}>
					<img
						className={`vk_staff_photo_image`}
						src={vkStaffPhotoImage}
						alt={vkStaffPhotoImageAlt}
					/>
				</figure>
			) : (
				''
			)} */}
			<div className={'vk_staff_photo'}>{renderImage()}</div>
		</div>

		// <NewComponent
		// 	attributes={attributes}
		// 	setAttributes={''}
		// 	className={''}
		// 	for_={'save'}
		// />
	);
}
