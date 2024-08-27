import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { fixBrokenUnicode } from '@vkblocks/utils/fixBrokenUnicode';
import { MediaUpload } from '@wordpress/block-editor';

// 過去に保存された画像か確認
export const isDeprecatedImage = (image) => {
	return image && image.indexOf('{') === -1;
};

// 画像の枠線設定を取得
export const getImageBorder = (ImageBorderColor) => {
	let imageBorderSettings = 'none';
	//borderColorが指定されなかった場合はボーダーを非表示に
	if (ImageBorderColor) {
		imageBorderSettings = `1px solid ${ImageBorderColor}`;
	}
	return imageBorderSettings;
};

export const PrContentMediaUploadEdit = ({
	ImageBorderColor,
	setAttributes,
	Image,
}) => {
	/* eslint no-unused-vars: 0 */
	const imageBorderSettings = getImageBorder(ImageBorderColor);
	const prContentDatas = {};

	//画像のURL保存
	const setImageURL = (value) =>
		setAttributes({ Image: value.sizes.full.url });

	//画像のJSONオブジェクト保存
	const setImageJSON = (value) => {
		if (value) {
			// JSONデータから抜き出し
			const imageData = {
				alt: value.alt,
				sizes: {
					full: {
						url: value.sizes.full.url,
					},
				},
			};

			setAttributes({ Image: JSON.stringify(imageData) });
		}
	};
	const getImagePlaceHolderDeprecated = (image, borderSettings) => {
		if (!image) {
			return __('Select image', 'vk-blocks-pro');
		}
		return (
			<img
				className={'vk_prContent_colImg_image'}
				src={image}
				alt={__('Upload image', 'vk-blocks-pro')}
				style={{ border: borderSettings }}
			/>
		);
	};

	const getImagePlaceHolder = (image, borderSettings) => {
		image = JSON.parse(fixBrokenUnicode(image));

		if (image === null || typeof image.sizes === 'undefined') {
			return __('Select image', 'vk-blocks-pro');
		}
		return (
			<img
				className={'vk_prContent_colImg_image'}
				src={image.sizes.full.url}
				alt={image.alt}
				style={{ border: borderSettings }}
			/>
		);
	};

	//バージョンによって画像の保存方式変更
	if (isDeprecatedImage(Image)) {
		prContentDatas.setImage = setImageURL;
		prContentDatas.value = Image;
		prContentDatas.alt = __('Upload image', 'vk-blocks-pro');
		prContentDatas.getImagePlaceHolder = getImagePlaceHolderDeprecated;
	} else {
		prContentDatas.setImage = setImageJSON;
		prContentDatas.value = JSON.parse(fixBrokenUnicode(Image));
		prContentDatas.alt = prContentDatas.value.alt;
		prContentDatas.getImagePlaceHolder = getImagePlaceHolder;
	}

	const isImageUpload =
		Image !== null && Image !== undefined && Image !== '' && Image !== '{}';

	return (
		<MediaUpload
			onSelect={prContentDatas.setImage}
			type="image"
			value={prContentDatas.value}
			render={({ open }) => (
				<Button
					onClick={open}
					className={
						isImageUpload ? 'image-button' : 'button button-large'
					}
				>
					{prContentDatas.getImagePlaceHolder(
						Image,
						imageBorderSettings
					)}
				</Button>
			)}
		/>
	);
};

export const PrContentMediaUpload = ({ Image, ImageBorderColor }) => {
	if (!Image) {
		return __('Select Image', 'vk-blocks-pro');
	}

	const imageBorderSettings = getImageBorder(ImageBorderColor);

	if (Image && Image.indexOf('{') === -1) {
		return (
			<img
				className={'vk_prContent_colImg_image'}
				src={Image}
				alt={__('Upload image', 'vk-blocks-pro')}
				style={{ border: imageBorderSettings }}
			/>
		);
	}
	const imageParse = JSON.parse(fixBrokenUnicode(Image));
	if (imageParse && typeof imageParse.sizes !== 'undefined') {
		return (
			<img
				className={'vk_prContent_colImg_image'}
				src={imageParse.sizes.full.url}
				alt={imageParse.alt}
				style={{ border: imageBorderSettings }}
			/>
		);
	}
};
