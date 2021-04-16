/**
 * External dependencies
 */
import classnames from 'classnames';
/**
 * WordPress dependencies
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

// import StaffMediaUpload from './staffMediaUpload';

export default function save({ attributes, className }) {
	const {
		vk_staff_layout, // eslint-disable-line camelcase
		vk_staff_text_name, // eslint-disable-line camelcase
		vk_staff_text_caption, // eslint-disable-line camelcase
		vk_staff_text_role, // eslint-disable-line camelcase
		vk_staff_text_profileTitle, // eslint-disable-line camelcase
		vk_staff_text_profileText, // eslint-disable-line camelcase
		vk_staff_nameColor, // eslint-disable-line camelcase
		vk_staff_captionColor, // eslint-disable-line camelcase
		vk_staff_positionColor, // eslint-disable-line camelcase
		vk_staff_profileTitleColor, // eslint-disable-line camelcase
		vk_staff_profileTextColor, // eslint-disable-line camelcase
		vk_staff_photo_image, // eslint-disable-line camelcase
		vk_staff_photo_image_alt, // eslint-disable-line camelcase
		vk_staff_photoBorder, // eslint-disable-line camelcase
	} = attributes;

	const classes = classnames('vk_staff', {
		[className]: !!className,
		[`vk_staff-layout-${vk_staff_layout}`]: !!vk_staff_layout, // eslint-disable-line camelcase
	});

	// 画像の線のクラスとimgタグの親タグのクラス名を生成.
	const imgBorderClassName = classnames('vk_staff_photo', {
		[`vk_staff_photo-border-${vk_staff_photoBorder}`]: !!vk_staff_photoBorder, // eslint-disable-line camelcase
	});

	return (
		<div {...useBlockProps.save({ className: classes })}>
			<div className={`vk_staff_text`}>
				<RichText.Content
					tagName="h3"
					className={'vk_staff_text_name'}
					style={{ color: vk_staff_nameColor }}
					value={vk_staff_text_name} // eslint-disable-line camelcase
				/>
				<RichText.Content
					tagName="p"
					className={'vk_staff_text_caption'}
					style={{ color: vk_staff_captionColor }}
					value={vk_staff_text_caption} // eslint-disable-line camelcase
				/>
				<RichText.Content
					tagName="p"
					className={'vk_staff_text_role'}
					style={{ color: vk_staff_positionColor }}
					value={vk_staff_text_role} // eslint-disable-line camelcase
				/>
				<RichText.Content
					tagName="h4"
					className={'vk_staff_text_profileTitle'}
					style={{ color: vk_staff_profileTitleColor }}
					value={vk_staff_text_profileTitle} // eslint-disable-line camelcase
				/>
				<RichText.Content
					tagName="p"
					className={'vk_staff_text_profileText'}
					style={{ color: vk_staff_profileTextColor }}
					value={vk_staff_text_profileText} // eslint-disable-line camelcase
				/>
			</div>
			{vk_staff_photo_image && ( // eslint-disable-line camelcase
				<div className={imgBorderClassName}>
					<img
						className={`vk_staff_photo_image`}
						src={vk_staff_photo_image} // eslint-disable-line camelcase
						alt={vk_staff_photo_image_alt} // eslint-disable-line camelcase
					/>
				</div>
			)}
		</div>
	);
}
