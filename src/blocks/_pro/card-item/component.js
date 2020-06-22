const { __ } = wp.i18n; // Import __() from wp.i18n
import { vkbBlockEditor } from "./../../_helper/depModules";
const { RichText, MediaUpload } = vkbBlockEditor;
const { Button } = wp.components;
const { Fragment } = wp.element;
const { dispatch } = wp.data;

import { convertToGrid } from "../../_helper/convert-to-grid";

export class Component extends React.Component {
  render() {
    const { setAttributes, attributes, className, clientId } = this.props;
    let {
      layout,
      col_xs,
      col_sm,
      col_md,
      col_lg,
      col_xl,
      display_image,
      display_btn,
      btn_text,
      title,
      excerpt_text,
      image,
      url,
      activeControl,
      linkTarget,
      rel,
    } = attributes;

    const align = JSON.parse(activeControl);
    const for_ = this.props.for_;
    const containerClass = " vk_card_item";

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
    } else if (layout === "card-noborder") {
      layout = "card " + layout + " card-post";
      imgContainerClass = "vk_post_imgOuter";
      imgClass = "vk_post_imgOuter_img card-img-top";
      vk_post_body = "card-body";
      vk_title = "card-title";
      vk_date = "card-date";
    } else if (layout === "card-imageRound") {
      layout = "card card-noborder " + layout + " card-post";
      imgContainerClass = "vk_post_imgOuter";
      imgClass = "vk_post_imgOuter_img card-img-top";
      vk_post_body = "card-body";
      vk_title = "card-title";
      vk_date = "card-date";
	}

    const deleteImgBtn = () => {
      dispatch("core/editor").updateBlockAttributes(clientId, {
        image: null,
      });
    };

    const uploadImgBtn = (image) => {
      const imageParsed = JSON.parse(image);
      return (
	<MediaUpload
		onSelect={ (value) => setAttributes({ image: JSON.stringify(value) }) }
		type="image"
		className={ "vk_post_imgOuter_img card-img-top" }
		value={ image }
		render={ ({ open }) => (
			<Fragment>
				{ !imageParsed ? (
					<Button onClick={ open } className={ "button button-large" }>
						{ __("Select image", "vk-blocks") }
					</Button>
              ) : (
	<Fragment>
		<img
			className={ "vk_post_imgOuter_img card-img-top" }
			src={ imageParsed.sizes.full.url }
			alt={ imageParsed.alt }
                    />
		<Button
			onClick={ deleteImgBtn }
			className={ "image-button button button-delete" }
                    >
			{ __("Delete Image", "vk-blocks") }
		</Button>
	</Fragment>
                ) }
			</Fragment>
          ) }
        />
      );
    };

    const renderImage = (display_image) => {
      if (display_image) {
        if (isEdit(for_)) {
          return (
	<Fragment>
		<div className={ imgContainerClass } style={ imageStyle }>
			<div className="card-img-overlay"></div>
			{ uploadImgBtn(image) }
		</div>
	</Fragment>
          );
        }
          return (
	<div className={ imgContainerClass } style={ imageStyle }>
		{ switchAddUrltoImage(url) }
	</div>
          );

      }
    };

    const switchAddUrltoImage = (url) => {
      const overlay = <div className="card-img-overlay"></div>;
      if (url) {
        return (
	<a href={ url } target={ linkTarget } rel={ rel }>
		{ overlay }
	</a>
        );
      }
        return overlay;

    };

    const renderExcerpt = (align) => {
      const titleTag = "p";
      const titleClass = `vk_post_excerpt card-text has-text-align-${align.text}`;
      if (isEdit(for_)) {
        return (
	<RichText
		tagName={ titleTag }
		className={ titleClass }
		value={ excerpt_text }
		onChange={ (value) => setAttributes({ excerpt_text: value }) }
		placeholder={ __(
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
              "vk-blocks"
            ) }
          />
        );
      }
        return (
	<RichText.Content
		tagName={ titleTag }
		className={ titleClass }
		value={ excerpt_text }
          />
        );

    };

    const renderButton = (display_btn, align) => {
      if (display_btn) {
        return (
	<div className={ `vk_post_btnOuter has-text-align-${align.button}` }>
		<a
			className={ `btn btn-primary vk_post_btn` }
			href={ url }
			target={ linkTarget }
			rel={ rel }
            >
			{ btn_text }
		</a>
	</div>
        );
      }
		};


		const renderTitle = (align) => {
      const titleTag = "h5";
      const titleClass = `vk_post_title card-title has-text-align-${align.title}`;
      if (isEdit(for_)) {
        return (
				<RichText
		tagName={ titleTag }
		className={ titleClass }
		value={ title }
		onChange={ (value) => setAttributes({ title: value }) }
		placeholder={ __("Title", "vk-blocks") }
          />
        );
      }else if(!isEdit(for_) && !url){
				return (<RichText.Content
							tagName={ titleTag }
							className={ titleClass }
							value={ title }/>);
			}else{
				return (
					<a href={ url } target={ linkTarget } rel={ rel }>
						<RichText.Content
							tagName={ titleTag }
							className={ titleClass }
							value={ title }
										/>
					</a>);
			}
    };

    let imageStyle;
    if (image) {
      const imageParsed = JSON.parse(image);
      imageStyle = {
        backgroundImage: `url(${imageParsed.sizes.full.url})`,
      };
    } else {
      imageStyle = {};
    }

    const btnClass = display_btn ? "vk_post-btn-display" : "";

    return (
	<div
		className={ `${className} vk_post ${layout} vk_card_item vk_post-col-xs-${convertToGrid(
          col_xs
        )} vk_post-col-sm-${convertToGrid(
          col_sm
        )} vk_post-col-md-${convertToGrid(
          col_md
        )} vk_post-col-lg-${convertToGrid(
          col_lg
        )} vk_post-col-xl-${convertToGrid(col_xl)} ${btnClass}` }
      >
		{ renderImage(display_image) }
		<div className="vk_post_body card-body">
			{ renderTitle(align) }
			{ renderExcerpt(align) }
			{ renderButton(display_btn, align) }
		</div>
	</div>
    );
  }
}
