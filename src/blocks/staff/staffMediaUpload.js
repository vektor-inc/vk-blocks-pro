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

export const StaffMediaUpload = ({
	vk_staff_photo_image, // eslint-disable-line camelcase
	vk_staff_photo_image_alt, // eslint-disable-line camelcase
	vk_staff_photoBorder, // eslint-disable-line camelcase
	setAttributes,
}) => {
	// 画像の線のクラスとimgタグの親タグのクラス名を生成.
	const imgBorderClassName = classnames('vk_staff_photo', {
		[`vk_staff_photo-border-${vk_staff_photoBorder}`]: !!vk_staff_photoBorder, // eslint-disable-line camelcase
	});

	return (
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
	);
};

export default StaffMediaUpload;
