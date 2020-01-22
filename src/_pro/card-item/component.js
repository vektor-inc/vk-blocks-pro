const { __ } = wp.i18n; // Import __() from wp.i18n
const { RichText, MediaUpload } =
  wp.blockEditor && wp.blockEditor.BlockEdit ? wp.blockEditor : wp.editor;
const { Button } = wp.components;
const { Fragment } = wp.element;
const { useDispatch, dispatch } = wp.data;

import { convertToGrid } from "../../_helper/convert-to-grid";

export class Component extends React.Component {
  render() {
    const { setAttributes, attributes, className, clientId } = this.props.value;
    let {
      layout,
      col_xs,
      col_sm,
      col_md,
      col_lg,
      col_xl,
      display_image,
      display_excerpt,
      display_btn,
      btn_text,
      btn_align,
      title,
      excerpt_text,
      image,
      url
    } = attributes;

    const for_ = this.props.for_;
    let containerClass = " vk_card_item";

    const isEdit = () => {
      if (for_ === "edit") {
        return true;
      } else if ("save") {
        return false;
      }
    };

    let imgContainerClass;
    let imgClass;
    let vk_post_body;
    let vk_title;
    let vk_date;
    if (layout === "card-horizontal") {
    } else if (layout === "media") {
      imgContainerClass = "vk_post_imgOuter media-img";
      imgClass = "vk_post_imgOuter_img";
      vk_post_body = "media-body";
      vk_title = " media-title";
      vk_date = "media-date";
    } else if (layout === "card") {
      layout = layout + " card-post";
      imgContainerClass = "vk_post_imgOuter";
      imgClass = "vk_post_imgOuter_img card-img-top";
      vk_post_body = "card-body";
      vk_title = "card-title";
      vk_date = "card-date";
    }

    const deleteImgBtn = () => {
      dispatch("core/editor").updateBlockAttributes(clientId, {
        image: null
      });
    };

    const uploadImgBtn = image => {
      const imageParsed = JSON.parse(image);
      return (
        <MediaUpload
          onSelect={value => setAttributes({ image: JSON.stringify(value) })}
          type="image"
          className={"vk_post_imgOuter_img card-img-top"}
          value={image}
          render={({ open }) => (
            <Fragment>
              {!imageParsed ? (
                <Button onClick={open} className={"button button-large"}>
                  {__("Select image", "vk-blocks")}
                </Button>
              ) : (
                <Fragment>
                  <img
                    className={"vk_post_imgOuter_img card-img-top"}
                    src={imageParsed.sizes.full.url}
                    alt={imageParsed.alt}
                  />
                  <Button onClick={deleteImgBtn} className={"image-button"}>
                    {__("×", "vk-blocks")}
                  </Button>
                </Fragment>
              )}
            </Fragment>
          )}
        />
      );
    };

    const renderImage = display_image => {
      if (display_image) {
        if (isEdit(for_)) {
          return (
            <Fragment>
              <div className={imgContainerClass} style={imageStyle}>
                <div className="card-img-overlay"></div>
                {uploadImgBtn(image)}
              </div>
            </Fragment>
          );
        } else {
          return (
            <div className={imgContainerClass} style={imageStyle}>
              <a href={url}>
                <div className="card-img-overlay"></div>
              </a>
            </div>
          );
        }
      }
    };
    const renderExcerpt = display_excerpt => {
      if (display_excerpt) {
        const titleTag = "p";
        const titleClass = "vk_post_excerpt card-text";
        if (isEdit(for_)) {
          return (
            <RichText
              tagName={titleTag}
              className={titleClass}
              value={excerpt_text}
              onChange={value => setAttributes({ excerpt_text: value })}
              placeholder={__(
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
                "vk-blocks"
              )}
            />
          );
        } else {
          return (
            <RichText.Content
              tagName={titleTag}
              className={titleClass}
              value={excerpt_text}
            />
          );
        }
      }
    };
    const renderButton = display_btn => {
      if (display_btn) {
        return (
          <a className="btn btn-primary vk_post_btn" href={url}>
            {btn_text}
          </a>
        );
      }
    };

    const renderTitle = () => {
      const titleTag = "h5";
      const titleClass = "vk_post_title card-title";
      if (isEdit(for_)) {
        return (
          <RichText
            tagName={titleTag}
            className={titleClass}
            value={title}
            onChange={value => setAttributes({ title: value })}
            placeholder={__("Title", "vk-blocks")}
          />
        );
      } else {
        return (
          <a href={url}>
            <RichText.Content
              tagName={titleTag}
              className={titleClass}
              value={title}
            />
          </a>
        );
      }
    };

    let imageStyle;
    if (image) {
      let imageParsed = JSON.parse(image);
      imageStyle = {
        backgroundImage: `url(${imageParsed.sizes.full.url})`
      };
    } else {
      imageStyle = {};
    }

    return (
      <div
        className={`vk_post ${layout} card-post vk_PostList_card vk_post-col-xs-${convertToGrid(
          col_xs
        )} vk_post-col-sm-${convertToGrid(
          col_sm
        )} vk_post-col-md-${col_md} vk_post-col-lg-${convertToGrid(
          col_lg
        )} vk_post-col-xl-${convertToGrid(col_xl)} vk_post-btn-display`}
      >
        {renderImage(display_image)}
        <div className="vk_post_body card-body">
          {renderTitle()}
          {renderExcerpt(display_excerpt)}
          <div className={`vk_post_btnOuter ${btn_align}`}>
            {renderButton(display_btn)}
          </div>
        </div>
      </div>
    );
  }
}
