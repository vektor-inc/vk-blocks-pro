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

	return (
		<MediaUpload
			onSelect={(value) => setAttributes({ [schema]: value.url, [schema + 'Id']: value.id })}
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
							<div class="components-button-group">
							<Button
								onClick={deleteImgBtn}
								className={'image-button button button-delete'}
							>
								{__('Delete Image', 'vk-blocks-pro')}
							</Button>
							<Button
								onClick={open}
								className={'image-button button button-replace'}
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
