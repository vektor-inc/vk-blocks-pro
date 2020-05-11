const { __ } = wp.i18n; // Import __() from wp.i18n
const { Button } = wp.components;
const { Fragment } = wp.element;
const { MediaUpload } =
	wp.blockEditor && wp.blockEditor.BlockEdit ? wp.blockEditor : wp.editor;
const { dispatch } = wp.data;
import noImage from "../../../inc/vk-blocks/images/no-image.png";

export const AdvancedMediaUpload = (props) => {
	const { schema, clientId, setAttributes, attributes } = props;

	const deleteImgBtn = () => {
		dispatch("core/editor").updateBlockAttributes(clientId, {
			[schema]: null,
		});
	};

	return (
		<MediaUpload
			onSelect={(value) => setAttributes({ [schema]: value.url })}
			type="image"
			value={attributes[schema]}
			render={({ open }) => (
				<Fragment>
					{attributes[schema] ? (
						<Fragment>
							<img className={"icon-image"} src={attributes[schema]} />
							<Button
								onClick={deleteImgBtn}
								className={"image-button button button-delete"}
							>
								{__("Delete Image", "vk-blocks")}
							</Button>
						</Fragment>
					) : (
							<Fragment>
								<img className={"icon-image"} src={noImage} />
								<Button
									onClick={open}
									className={"button button-large components-button"}
								>
									{__("Select image", "vk-blocks")}
								</Button>
							</Fragment>
						)}
				</Fragment>
			)}
		/>
	);
};
