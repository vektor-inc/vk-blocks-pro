import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { fixBrokenUnicode } from '@vkblocks/utils/depModules';
import { MediaUpload } from '@wordpress/block-editor';

// 過去に保存された画像か確認
export const isDeprecatedImage = (Image) => {
	return Image && Image.indexOf('{') === -1;
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
			setAttributes({ Image: JSON.stringify(value) });
		}
	};
	const getImagePlaceHolderDeprecated = (Image, imageBorderSettings) => {
		console.log('getImagePlaceHolderDeprecated');

		if (!Image) {
			return __('Select image', 'vk-blocks');
		}
		return (
			<img
				className={'vk_prContent_colImg_image'}
				src={Image}
				alt={__('Upload image', 'vk-blocks')}
				style={{ border: imageBorderSettings }}
			/>
		);
	};

	const getImagePlaceHolder = (Image, imageBorderSettings) => {
		Image = JSON.parse(fixBrokenUnicode(Image));

		if (Image === null || typeof Image.sizes === 'undefined') {
			return __('Select image', 'vk-blocks');
		}
		return (
			<img
				className={'vk_prContent_colImg_image'}
				src={Image.sizes.full.url}
				alt={Image.alt}
				style={{ border: imageBorderSettings }}
			/>
		);
	};

	//バージョンによって画像の保存方式変更
	if (isDeprecatedImage(Image)) {
		prContentDatas.setImage = setImageURL;
		prContentDatas.value = Image;
		prContentDatas.alt = __('Upload image', 'vk-blocks');
		prContentDatas.getImagePlaceHolder = getImagePlaceHolderDeprecated;
	} else {
		prContentDatas.setImage = setImageJSON;
		prContentDatas.value = JSON.parse(fixBrokenUnicode(Image));
		prContentDatas.alt = prContentDatas.value.alt;
		prContentDatas.getImagePlaceHolder = getImagePlaceHolder;
	}

	return (
		<MediaUpload
			onSelect={prContentDatas.setImage}
			type="image"
			value={prContentDatas.value}
			render={({ open }) => (
				<Button
					onClick={open}
					className={
						prContentDatas.value
							? 'image-button'
							: 'button button-large'
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
	const imageBorderSettings = getImageBorder(ImageBorderColor);

	if (!Image) {
		return __('Select image', 'vk-blocks');
	}
	if (Image && Image.indexOf('{') === -1) {
		return (
			<img
				className={'vk_prContent_colImg_image'}
				src={Image}
				alt={__('Upload image', 'vk-blocks')}
				style={{ border: imageBorderSettings }}
			/>
		);
	}
	const ImageParse = JSON.parse(fixBrokenUnicode(Image));
	if (ImageParse && typeof ImageParse.sizes !== 'undefined') {
		return (
			<img
				className={'vk_prContent_colImg_image'}
				src={ImageParse.sizes.full.url}
				alt={ImageParse.alt}
				style={{ border: imageBorderSettings }}
			/>
		);
	}
};
