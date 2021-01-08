import { __ } from '@wordpress/i18n'; // Import __() from wp.i18n
import { Button } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { MediaUpload } from '@wordpress/block-editor';
import { dispatch } from '@wordpress/data';
import noImage from "../../../inc/vk-blocks/images/no-image.svg";

export const AdvancedMediaUpload = (props) => {
	const { schema, clientId, setAttributes, attributes } = props;

	const deleteImgBtn = () => {
		dispatch('core/editor').updateBlockAttributes(clientId, {
			[schema]: null,
			[alt]:null
		});
	};

	return (
		<MediaUpload
			onSelect={(value) => {
				setAttributes({ [schema]: value.url });
			}}
			type="image"
			value={attributes[schema]}
			render={({ open }) => (
				<Fragment>
					{attributes[schema] ? (
						<Fragment>
							<img
								className={'icon-image'}
								src={attributes[schema]}
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
