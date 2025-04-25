/**
 * External dependencies
 */
import classnames from 'classnames';
/**
 * WordPress dependencies
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { isHexColor } from '@vkblocks/utils/is-hex-color';
import { sanitizeSlug } from '@vkblocks/utils/sanitizeSlug';

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
		vk_staff_fontFamily,
	} = attributes;

	const classes = classnames('vk_staff', {
		[className]: !!className,
		[`vk_staff-layout-${vk_staff_layout}`]: !!vk_staff_layout, // eslint-disable-line camelcase
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

	const staffNameColorInlineStyle = {};
	let staffTextNameClassName = '';
	if (vk_staff_nameColor !== undefined) {
		staffTextNameClassName += ` has-text-color`;
		if (!isHexColor(vk_staff_nameColor)) {
			staffTextNameClassName += ` has-${sanitizeSlug(vk_staff_nameColor)}-color`;
		}
	}

	const staffCaptionColorInlineStyle = {};
	let staffCaptionClassName = '';
	if (vk_staff_captionColor !== undefined) {
		staffCaptionClassName += ` has-text-color`;
		if (!isHexColor(vk_staff_captionColor)) {
			staffCaptionClassName += ` has-${sanitizeSlug(vk_staff_captionColor)}-color`;
		}
	}

	const staffPositionColorInlineStyle = {};
	let staffPositionClassName = '';
	if (vk_staff_positionColor !== undefined) {
		staffPositionClassName += ` has-text-color`;
		if (!isHexColor(vk_staff_positionColor)) {
			staffPositionClassName += ` has-${sanitizeSlug(vk_staff_positionColor)}-color`;
		}
	}

	const staffProfileTitleColorInlineStyle = {};
	let staffProfileTitleClassName = '';
	if (vk_staff_profileTitleColor !== undefined) {
		staffProfileTitleClassName += ` has-text-color`;
		if (!isHexColor(vk_staff_profileTitleColor)) {
			staffProfileTitleClassName += ` has-${sanitizeSlug(vk_staff_profileTitleColor)}-color`;
		}
	}

	const staffProfileTextColorInlineStyle = {};
	let staffProfileTextClassName = '';
	if (vk_staff_profileTextColor !== undefined) {
		staffProfileTextClassName += ` has-text-color`;
		if (!isHexColor(vk_staff_profileTextColor)) {
			staffProfileTextClassName += ` has-${sanitizeSlug(vk_staff_profileTextColor)}-color`;
		}
	}

	return (
		<div {...useBlockProps.save({ className: classes })}>
			<div className={staffTextClassName}>
				<RichText.Content
					tagName="h3"
					className={`vk_staff_text_name` + staffTextNameClassName}
					style={staffNameColorInlineStyle}
					value={vk_staff_text_name} // eslint-disable-line camelcase
				/>
				<RichText.Content
					tagName="p"
					className={`vk_staff_text_caption` + staffCaptionClassName}
					style={staffCaptionColorInlineStyle}
					value={vk_staff_text_caption} // eslint-disable-line camelcase
				/>
				<RichText.Content
					tagName="p"
					className={`vk_staff_text_role` + staffPositionClassName}
					style={staffPositionColorInlineStyle}
					value={vk_staff_text_role} // eslint-disable-line camelcase
				/>
				<RichText.Content
					tagName="h4"
					className={
						`vk_staff_text_profileTitle` +
						staffProfileTitleClassName
					}
					style={staffProfileTitleColorInlineStyle}
					value={vk_staff_text_profileTitle} // eslint-disable-line camelcase
				/>
				<RichText.Content
					tagName="p"
					className={
						'vk_staff_text_profileText' + staffProfileTextClassName
					}
					style={staffProfileTextColorInlineStyle}
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
