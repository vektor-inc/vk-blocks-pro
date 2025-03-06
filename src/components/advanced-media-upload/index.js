import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { MediaUpload } from '@wordpress/block-editor';
import { dispatch } from '@wordpress/data';
import noImage from '../../../inc/vk-blocks/images/no-image.svg';

export const AdvancedMediaUpload = (props) => {
	const { schema, clientId, setAttributes, attributes } = props;

	const deleteImgBtn = () => {
		dispatch('core/block-editor').updateBlockAttributes(clientId, {
			[schema]: null,
			[schema + 'Id']: null,
		});
	};

	const ensureImageId = (callback) => {
		const schemaIdKey = schema + 'Id';

		if (attributes[schema] && !attributes[schemaIdKey]) {
			wp.media
				.attachment(attributes[schema])
				.fetch()
				.then((media) => {
					if (media && media.id) {
						setAttributes({ [schemaIdKey]: media.id });
					}
				});
		}

		// すぐにコールバック（open）を実行
		if (callback) {
			callback();
		}
	};

	return (
		<MediaUpload
			onSelect={(value) => {
				const schemaIdKey = schema + 'Id'; // 例: "bgImageId"
				const newAttributes = { [schema]: value.url };

				if (value.id) {
					newAttributes[schemaIdKey] = value.id;
				} else {
					// IDがない場合、wp.media.attachment() を使って取得
					wp.media
						.attachment(value.url)
						.fetch()
						.then((media) => {
							if (media && media.id) {
								setAttributes({ [schemaIdKey]: media.id });
							}
						});
				}
				setAttributes(newAttributes);
			}}
			type="image"
			value={attributes[schema + 'Id']}
			render={({ open }) => (
				<>
					{attributes[schema] ? (
						<>
							{/* eslint-disable-next-line jsx-a11y/alt-text*/}
							<img
								className={'icon-image'}
								src={attributes[schema]}
							/>
							<div className="components-button-group">
								<Button
									onClick={deleteImgBtn}
									className={
										'image-button button button-delete'
									}
								>
									{__('Delete Image', 'vk-blocks-pro')}
								</Button>
								<Button
									onClick={() => {
										ensureImageId(open);
									}}
									className={
										'image-button button button-replace'
									}
								>
									{__('Replace Image', 'vk-blocks-pro')}
								</Button>
							</div>
						</>
					) : (
						<>
							{/* eslint-disable-next-line jsx-a11y/alt-text*/}
							<img className={'icon-image'} src={noImage} />
							<Button
								onClick={open}
								className={
									'button button-large components-button'
								}
							>
								{__('Select image', 'vk-blocks-pro')}
							</Button>
						</>
					)}
				</>
			)}
		/>
	);
};
