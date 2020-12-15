import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { fixBrokenUnicode } from '@vkblocks/utils/depModules';
import { MediaUpload } from '@wordpress/block-editor';

// 過去に保存された画像か確認
export const is_deprecated_image = (Image) => {
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

export const PrContentMediaUpload = () => {
	const imageBorderSettings = getImageBorder(ImageBorderColor);

	let prContentDatas = {};

	//画像のURL保存
	const setImageURL = (value) =>
		setAttributes({ Image: value.sizes.full.url });
	//画像のJSONオブジェクト保存
	const setImageJSON = (value) => {
		if (value) {
			setAttributes({ Image: JSON.stringify(value) });
		}
	};

	//バージョンによって画像の保存方式変更
	if (is_deprecated_image(Image)) {
		prContentDatas.setImage = setImageURL;
		prContentDatas.value = Image;
		prContentDatas.alt = __('Upload image', 'vk-blocks');
	} else {
		prContentDatas.setImage = setImageJSON;
		prContentDatas.value = JSON.parse(fixBrokenUnicode(Image));
		prContentDatas.alt = prContentDatas.value.alt;
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
					{!prContentDatas.value ||
					prContentDatas.value === null ||
					typeof prContentDatas.value.sizes === 'undefined' ? (
						__('Select image', 'vk-blocks')
					) : (
						<img
							className={'vk_prContent_colImg_image'}
							src={prContentDatas.value}
							alt={prContentDatas.alt}
							style={{ border: imageBorderSettings }}
						/>
					)}
				</Button>
			)}
		/>
	);
};
