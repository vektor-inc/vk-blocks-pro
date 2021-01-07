const { __ } = wp.i18n; // Import __() from wp.i18n
const { Button } = wp.components;
const { Fragment } = wp.element;
const { MediaUpload } =
	wp.blockEditor && wp.blockEditor.BlockEdit ? wp.blockEditor : wp.editor;
const { dispatch } = wp.data;
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
				<Fragment>
					{attributes[url] ? (
						<Fragment>
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
						</Fragment>
					) : (
						<Fragment>
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
						</Fragment>
					)}
				</Fragment>
			)}
		/>
	);
};
