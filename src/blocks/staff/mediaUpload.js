// WordPress  dependencies
import { __ } from '@wordpress/i18n';
import { MediaUpload } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

// 過去に保存された画像か確認
export const isDeprecatedImage = (image) => {
    return image && image.indexOf('{') === -1;
};

export const staffMediaUploadEdit = ({
    setAttributes,
    vkStaffPhotoImage,
    vkStaffPhotoBorder,
}) => {
    const prContentDatas = {};

    //バージョンによって画像の保存方式変更
    if (isDeprecatedImage(vkStaffPhotoImage)) {
        prContentDatas.setImage = setImageURL;
        prContentDatas.value = Image;
        prContentDatas.alt = __('Select image', 'vk-blocks');
        prContentDatas.getImagePlaceHolder = getImagePlaceHolderDeprecated;
    } else {
        prContentDatas.setImage = setImageJSON;
        prContentDatas.value = JSON.parse(fixBrokenUnicode(Image));
        prContentDatas.alt = prContentDatas.value.alt;
        prContentDatas.getImagePlaceHolder = getImagePlaceHolder;
    }

    return (
        <MediaUpload
            onSelect={(value) =>
                setAttributes({
                    vkStaffPhotoImage: value.sizes.full.url,
                })
            }
            type="image"
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
                                className={'vk_staff_photo_image'}
                                src={vkStaffPhotoImage}
                                alt={__('Upload image', 'vk-blocks')}
                                style={{ border: vkStaffPhotoBorder }}
                            />
                        )}
                </Button>
            )}
        />
    );

}