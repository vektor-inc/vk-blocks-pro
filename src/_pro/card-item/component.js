const { __ } = wp.i18n; // Import __() from wp.i18n
const { RichText } =
  wp.blockEditor && wp.blockEditor.BlockEdit ? wp.blockEditor : wp.editor;

export class Component extends React.Component {
  render() {
    const { setAttributes, attributes, className } = this.props.value;
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
      excerpt_text
    } = attributes;

    const for_ = this.props.for_;
    const url = "";
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

    const renderImage = display_image => {
      if (display_image) {
        return (
          <img
            src="http://vccw.test/wp-content/plugins/vk-blocks-pro/inc/vk-blocks/images/no-image.png"
            alt=""
            className="vk_post_imgOuter_img card-img-top"
          />
        );
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

    return (
      <div
        className={`vk_post ${layout} card-post vk_PostList_card vk_post-col-xs-${col_xs} vk_post-col-sm-${col_sm} vk_post-col-md-${col_md} vk_post-col-lg-${col_lg} vk_post-col-xl-${col_xl} vk_post-btn-display`}
      >
        <div className={imgContainerClass}>
          <a href="http://vccw.test/archives/1">
            <div className="card-img-overlay"></div>
            {renderImage(display_image)}
          </a>
        </div>
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
