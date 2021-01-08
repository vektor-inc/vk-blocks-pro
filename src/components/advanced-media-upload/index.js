import { __ } from '@wordpress/i18n'; // Import __() from wp.i18n
import { Button } from '@wordpress/components';
import { MediaUpload } from '@wordpress/block-editor';
import { dispatch } from '@wordpress/data';
import noImage from '../../../inc/vk-blocks/images/no-image.svg';

export const AdvancedMediaUpload = (props) => {
	const { url, clientId, setAttributes, attributes, alt } = props;

	const deleteImgBtn = () => {
		dispatch('core/editor').updateBlockAttributes(clientId, {
			[url]: null,
			[alt]: null,
		});
	};

	return (
		<MediaUpload
			onSelect={(value) => {
				setAttributes({ [url]: value.url });
				setAttributes({ [alt]: value.alt });
			}}
			type="image"
			value={attributes[url]}
			render={({ open }) => (
				<>
					{attributes[url] ? (
						<>
							<img
								className={'icon-image'}
								src={attributes[url]}
								alt={attributes[alt]}
							/>
							<Button
								onClick={deleteImgBtn}
								className={'image-button button button-delete'}
							>
								{__('Delete Image', 'vk-blocks')}
							</Button>
						</>
					) : (
						<>
							<img
								className={'icon-image'}
								src={noImage}
								alt={''}
							/>
							<Button
								onClick={open}
								className={
									'button button-large components-button'
								}
							>
								{__('Select image', 'vk-blocks')}
							</Button>
						</>
					)}
				</>
			)}
		/>
	);
};
