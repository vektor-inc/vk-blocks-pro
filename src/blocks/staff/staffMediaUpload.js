/**
 * staffの画像専用の画像アップロードコンポーネント.
 */

/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { MediaUpload } from '@wordpress/block-editor';

// imgタグに振る独自classを設定.
const imgClassName = 'vk_staff_photo_image';

// save
export const StaffMediaUploadSave = ({
	vk_staff_photo_image, // eslint-disable-line camelcase
	vk_staff_photo_image_alt, // eslint-disable-line camelcase
	vk_staff_photo_border, // eslint-disable-line camelcase
}) => {
	// eslint-disable-next-line camelcase
	if (!vk_staff_photo_image) {
		return __('Select Image', 'vk-blocks');
	}
	// 画像の線のクラスとimgタグの親タグのクラス名を生成.
	const imgBorderClassName = classnames('vk_staff_photo', {
		[`vk_staff_photo-border-${vk_staff_photo_border}`]: !!vk_staff_photo_border, // eslint-disable-line camelcase
	});
	return (
		<div className={imgBorderClassName}>
			<img
				className={imgClassName}
				src={vk_staff_photo_image} // eslint-disable-line camelcase
				alt={vk_staff_photo_image_alt} // eslint-disable-line camelcase
			/>
		</div>
	);
};

// edit
export const StaffMediaUploadEdit = ({
	vk_staff_photo_image, // eslint-disable-line camelcase
	vk_staff_photo_image_alt, // eslint-disable-line camelcase
	vk_staff_photoBorder, // eslint-disable-line camelcase
	setAttributes,
}) => {
	// 画像の線のクラスとimgタグの親タグのクラス名を生成.
	const imgBorderClassName = classnames('vk_staff_photo', {
		[`vk_staff_photo-border-${vk_staff_photoBorder}`]: !!vk_staff_photoBorder, // eslint-disable-line camelcase
	});

	// 画像のプレースホルダー
	const imagePlaceHolder = (image, staffPhotoAlt) => {
		if (!image) {
			return __('Select image', 'vk-blocks');
		}
		return <img className={imgClassName} src={image} alt={staffPhotoAlt} />;
	};

	//画像のURL保存
	const setImageURL = (value) =>
		setAttributes({ vk_staff_photo_image: value.sizes.full.url });

	// 画像データの設定.
	const staffPhotoDatas = {};
	staffPhotoDatas.setImage = setImageURL;
	staffPhotoDatas.value = vk_staff_photo_image; // eslint-disable-line camelcase
	staffPhotoDatas.imagePlaceHolder = imagePlaceHolder;

	return (
		<div className={imgBorderClassName}>
			<MediaUpload
				onSelect={staffPhotoDatas.setImage}
				type="image"
				value={staffPhotoDatas.value}
				render={({ open }) => (
					<Button
						onClick={open}
						className={
							staffPhotoDatas.value
								? 'image-button'
								: 'button button-large'
						}
					>
						{staffPhotoDatas.imagePlaceHolder(
							vk_staff_photo_image,
							vk_staff_photo_image_alt
						)}
					</Button>
				)}
			/>
		</div>
	);
};
