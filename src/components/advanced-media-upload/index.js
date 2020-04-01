const { __ } = wp.i18n; // Import __() from wp.i18n
const { Button } = wp.components;
const { Fragment } = wp.element;
const { MediaUpload } =
  wp.blockEditor && wp.blockEditor.BlockEdit ? wp.blockEditor : wp.editor;
const { dispatch } = wp.data;

export const AdvancedMediaUpload = props => {
  const { schema, clientId, setAttributes } = props;

  console.log([schema]);

  const deleteImgBtn = () => {
    dispatch("core/editor").updateBlockAttributes(clientId, {
      bgImage: null
    });
  };

  return (
    <MediaUpload
      onSelect={value => setAttributes({ [schema]: value.url })}
      type="image"
      value={schema}
      render={({ open }) => (
        <Fragment>
          {console.log(schema)}
          {schema ? (
            <Fragment>
              <img className={"icon-image"} src={schema} />
              <Button
                onClick={deleteImgBtn}
                className={"image-button button button-delete"}
              >
                {__("Delete Image", "vk-blocks")}
              </Button>
            </Fragment>
          ) : (
            <Button
              onClick={open}
              className={"button button-large components-button"}
            >
              {__("Select image", "vk-blocks")}
            </Button>
          )}
        </Fragment>
      )}
    />
  );
};
