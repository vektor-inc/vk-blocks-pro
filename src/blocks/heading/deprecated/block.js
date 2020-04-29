/**
 * heading block type
 *
 */
import { schema, schema1 } from "./schema";
import classNames from "classnames";
import { VKBHeading } from "./component";
const { Fragment, Component } = wp.element;
const { RichText } = wp.editor;
const { __ } = wp.i18n;

function set_attirbuite(number) {
  var attributes = {};

  for (var i = 1; i <= number; i++) {
    attributes["heading" + i] = {
      type: "string",
      source: "html",
      selector: "h1.vk_prBlocks_item_title-" + i
    };
    attributes["content" + i] = {
      type: "string",
      source: "html",
      selector: "p.vk_prBlocks_item_summary-" + i
    };
    attributes["url" + i] = {
      type: "string",
      default: null
    };
    attributes["urlOpenType" + i] = {
      type: "Boolean",
      default: false
    };
    attributes["icon" + i] = {
      type: "string",
      default: "fas fa-file"
    };
    attributes["color" + i] = {
      type: "string",
      default: "#0693e3"
    };
    attributes["bgType" + i] = {
      type: "string",
      default: "0"
    };
    attributes["insertImage" + i] = {
      type: "string",
      default: null
    };
  }

  return attributes;
}

export const Deprecated = [
  {
    attributes: schema1,
    save({ attributes, className }) {
      return (
        <div className={className} id="vk-htags-a181b726-7749-4bd8-9887-0306c0bc7bd5">
          <VKBHeading attributes={attributes} for_={"save"} />
        </div>
      );
    }
  },
  {
    attributes: schema1,
    save({ attributes, className }) {
      return (
        <div className={className} id="vk-htags--1">
          <VKBHeading attributes={attributes} for_={"save"} />
        </div>
      );
    }
  },
  {
    attributes: {
      level: {
        type: "number",
        default: 2
      },
      align: {
        type: "string"
      },
      titleStyle: {
        type: "string",
        default: "default"
      },
      outerMarginBottom: {
        type: "number",
        default: null
      },
      title: {
        type: "string",
        source: "html",
        selector: "h1,h2,h3,h4,h5,h6",
        default: ""
      },
      titleColor: {
        type: "string",
        default: "#000000"
      },
      titleSize: {
        type: "number",
        default: 2
      },
      titleMarginBottom: {
        type: "number",
        default: 1
      },
      subText: {
        source: "html",
        selector: "p",
        default: ""
      },
      subTextFlag: {
        type: "string",
        default: "on"
      },
      subTextColor: {
        type: "string",
        default: "#000000"
      },
      subTextSize: {
        type: "number",
        default: 1.2
      }
    },
    save({ attributes, className }) {
      return (
        <NoAnchor attributes={attributes} className={className} for_={"save"} />
      );
    }
  },
  {
    attributes: schema,
    supports: {
      className: false,
      anchor: true
    },

    save({ attributes }) {
      const {
        level,
        align,
        title,
        titleColor,
        titleSize,
        subText,
        subTextFlag,
        subTextColor,
        subTextSize,
        titleStyle,
        titleMarginBottom,
        outerMarginBottom
      } = attributes;
      const tagName = "h" + level;

      return (
        <div
          className={`vk_heading vk_heading-style-${titleStyle}`}
          style={{ marginBottom: outerMarginBottom + `rem` }}
        >
          <RichText.Content
            tagName={tagName}
            value={title}
            style={{
              color: titleColor,
              fontSize: titleSize + "rem",
              textAlign: align,
              marginBottom: titleMarginBottom + "rem"
            }}
            className={`vk_heading_title vk_heading_title-style-${titleStyle}`}
          />
          {// サブテキスト
            (() => {
              if (subTextFlag === "on") {
                return (
                  <RichText.Content
                    tagName={"p"}
                    value={subText}
                    style={{
                      color: subTextColor,
                      fontSize: subTextSize + "rem",
                      textAlign: align
                    }}
                    className={`vk_heading_subtext vk_heading_subtext-style-${titleStyle}`}
                  />
                );
              }
            })()}
        </div>
      );
    }
  },
  {
    attributes: set_attirbuite(4),
    save({ attributes }) {
      const {
        heading1,
        heading2,
        heading3,
        content1,
        content2,
        content3,
        url1,
        url2,
        url3,
        urlOpenType1,
        urlOpenType2,
        urlOpenType3,
        icon1,
        icon2,
        icon3,
        color1,
        color2,
        color3,
        bgType1,
        bgType2,
        bgType3,
        insertImage1,
        insertImage2,
        insertImage3
      } = attributes;

      return (
        <article className="vk_prBlocks row">
          <div className="vk_prBlocks_item col-sm-4">
            <a
              href={url1}
              target={urlOpenType1 ? "_blank" : "_self"}
              className="vk_prBlocks_item_link"
            >
              {(() => {
                if (insertImage1) {
                  return (
                    <div
                      className="vk_prBlocks_item_image"
                      style={{
                        backgroundImage: "url(" + insertImage1 + ")",
                        backgroundRepeat: "no-repeat 50% center",
                        backgroundSize: "cover"
                      }}
                    >
                      <img src={insertImage1} alt="" />
                    </div>
                  );
                } else {
                  if (!color1) {
                    color1 = "#0693e3";
                    bgType1 === "0";
                  }
                  if (bgType1 === "0") {
                    return (
                      <div
                        className="vk_prBlocks_item_icon_outer"
                        style={{
                          backgroundColor: color1,
                          border: `1px solid ${color1}`
                        }}
                      >
                        <i
                          className={`${icon1} vk_prBlocks_item_icon`}
                          style={{ color: "#fff" }}
                        ></i>
                      </div>
                    );
                  } else {
                    return (
                      <div
                        className="vk_prBlocks_item_icon_outer"
                        style={{
                          backgroundColor: "transparent",
                          border: "1px solid " + color1
                        }}
                      >
                        <i
                          className={`${icon1} vk_prBlocks_item_icon`}
                          style={{ color: color1 }}
                        ></i>
                      </div>
                    );
                  }
                }
              })()}
              <RichText.Content
                className="vk_prBlocks_item_title vk_prBlocks_item_title-1"
                tagName={"h1"}
                value={heading1}
              />
              <RichText.Content
                className="vk_prBlocks_item_summary vk_prBlocks_item_summary-1"
                tagName={"p"}
                value={content1}
              />
            </a>
          </div>
          <div className="vk_prBlocks_item col-sm-4">
            <a
              href={url2}
              target={urlOpenType2 ? "_blank" : "_self"}
              className="vk_prBlocks_item_link"
            >
              {(() => {
                if (insertImage2) {
                  return (
                    <div
                      className="vk_prBlocks_item_image"
                      style={{
                        backgroundImage: "url(" + insertImage2 + ")",
                        backgroundRepeat: "no-repeat 50% center",
                        backgroundSize: "cover"
                      }}
                    >
                      <img src={insertImage2} alt="" />
                    </div>
                  );
                } else {
                  if (!color2) {
                    color2 = "#0693e3";
                    bgType2 === "0";
                  }
                  if (bgType2 === "0") {
                    return (
                      <div
                        className="vk_prBlocks_item_icon_outer"
                        style={{
                          backgroundColor: color2,
                          border: `1px solid ${color2}`
                        }}
                      >
                        <i
                          className={`${icon2} vk_prBlocks_item_icon`}
                          style={{ color: "#fff" }}
                        ></i>
                      </div>
                    );
                  } else {
                    return (
                      <div
                        className="vk_prBlocks_item_icon_outer"
                        style={{
                          backgroundColor: "transparent",
                          border: "1px solid " + color2
                        }}
                      >
                        <i
                          className={`${icon2} vk_prBlocks_item_icon`}
                          style={{ color: color2 }}
                        ></i>
                      </div>
                    );
                  }
                }
              })()}
              <RichText.Content
                className="vk_prBlocks_item_title vk_prBlocks_item_title-2"
                tagName={"h1"}
                value={heading2}
              />
              <RichText.Content
                className="vk_prBlocks_item_summary vk_prBlocks_item_summary-2"
                tagName={"p"}
                value={content2}
              />
            </a>
          </div>

          <div className="vk_prBlocks_item col-sm-4">
            <a
              href={url3}
              target={urlOpenType3 ? "_blank" : "_self"}
              className="vk_prBlocks_item_link"
            >
              {(() => {
                if (insertImage3) {
                  return (
                    <div
                      className="vk_prBlocks_item_image"
                      style={{
                        backgroundImage: "url(" + insertImage3 + ")",
                        backgroundRepeat: "no-repeat 50% center",
                        backgroundSize: "cover"
                      }}
                    >
                      <img src={insertImage3} alt="" />
                    </div>
                  );
                } else {
                  if (!color3) {
                    color3 = "#0693e3";
                    bgType3 === "0";
                  }
                  if (bgType3 === "0") {
                    return (
                      <div
                        className="vk_prBlocks_item_icon_outer"
                        style={{
                          backgroundColor: color3,
                          border: `1px solid ${color3}`
                        }}
                      >
                        <i
                          className={`${icon3} vk_prBlocks_item_icon`}
                          style={{ color: "#fff" }}
                        ></i>
                      </div>
                    );
                  } else {
                    return (
                      <div
                        className="vk_prBlocks_item_icon_outer"
                        style={{
                          backgroundColor: "transparent",
                          border: "1px solid " + color3
                        }}
                      >
                        <i
                          className={`${icon3} vk_prBlocks_item_icon`}
                          style={{ color: color3 }}
                        ></i>
                      </div>
                    );
                  }
                }
              })()}
              <RichText.Content
                className="vk_prBlocks_item_title vk_prBlocks_item_title-3"
                tagName={"h1"}
                value={heading3}
              />
              <RichText.Content
                className="vk_prBlocks_item_summary vk_prBlocks_item_summary-3"
                tagName={"p"}
                value={content3}
              />
            </a>
          </div>
        </article>
      );
    }
  },
  {
    attributes: {
      level: {
        type: "number",
        default: 2
      },
      align: {
        type: "string"
      },
      titleStyle: {
        type: "string",
        default: "default"
      },
      outerMarginBottom: {
        type: "number",
        default: null
      },
      title: {
        type: "string",
        source: "html",
        selector: "h1,h2,h3,h4,h5,h6",
        default: ""
      },
      titleColor: {
        type: "string",
        default: "#000000"
      },
      titleSize: {
        type: "number",
        default: 2.6
      },
      titleMarginBottom: {
        type: "number",
        default: null
      },
      subText: {
        source: "html",
        selector: "p",
        default: ""
      },
      subTextFlag: {
        type: "string",
        default: "on"
      },
      subTextColor: {
        type: "string",
        default: "#000000"
      },
      subTextSize: {
        type: "number",
        default: 1.8
      }
    },
    supports: {
      className: false,
      anchor: true
    },
    save({ attributes }) {
      const {
        level,
        align,
        title,
        titleColor,
        titleSize,
        subText,
        subTextFlag,
        subTextColor,
        subTextSize,
        titleStyle,
        titleMarginBottom,
        outerMarginBottom
      } = attributes;
      const tagName = "h" + level;

      return (
        <Fragment>
          {outerMarginBottom == null ? (
            <div className={`vk_heading vk_heading-style-${titleStyle}`}>
              <RichText.Content
                tagName={tagName}
                value={title}
                style={{
                  color: titleColor,
                  fontSize: titleSize + "rem",
                  textAlign: align
                }}
                className={`vk_heading_title vk_heading_title-style-${titleStyle}`}
              />
              {// サブテキスト
                (() => {
                  if (subTextFlag === "on") {
                    return (
                      <RichText.Content
                        tagName={"p"}
                        value={subText}
                        style={{
                          color: subTextColor,
                          fontSize: subTextSize + "rem",
                          textAlign: align
                        }}
                        className={`vk_heading_subtext vk_heading_subtext-style-${titleStyle}`}
                      />
                    );
                  }
                })()}
            </div>
          ) : (
              <div
                className={`vk_heading vk_heading-style-${titleStyle}`}
                style={{ marginBottom: outerMarginBottom + `rem` }}
              >
                <RichText.Content
                  tagName={tagName}
                  value={title}
                  style={{
                    color: titleColor,
                    fontSize: titleSize + "rem",
                    textAlign: align,
                    marginBottom: titleMarginBottom + "rem"
                  }}
                  className={`vk_heading_title vk_heading_title-style-${titleStyle}`}
                />
                {// サブテキスト
                  (() => {
                    if (subTextFlag === "on") {
                      return (
                        <RichText.Content
                          tagName={"p"}
                          value={subText}
                          style={{
                            color: subTextColor,
                            fontSize: subTextSize + "rem",
                            textAlign: align
                          }}
                          className={`vk_heading_subtext vk_heading_subtext-style-${titleStyle}`}
                        />
                      );
                    }
                  })()}
              </div>
            )}
        </Fragment>
      );
    }
  }
];

export class NoAnchor extends Component {
  render() {
    const {
      level,
      align,
      title,
      titleColor,
      titleSize,
      subText,
      subTextFlag,
      subTextColor,
      subTextSize,
      titleStyle,
      titleMarginBottom,
      outerMarginBottom
    } = this.props.attributes;
    const setAttributes = this.props.setAttributes;
    let className = this.props.className;
    let for_ = this.props.for_;
    let containerClass = classNames(
      className,
      `vk_heading vk_heading-style-${titleStyle}`
    );
    const tagName = "h" + level;
    let cStyle;
    let tStyle;

    //containerのマージンを切り替え
    if (outerMarginBottom != null) {
      cStyle = { marginBottom: outerMarginBottom + `rem` };
    }

    //titleのマージンを切り替え
    if (titleMarginBottom != null) {
      tStyle = {
        color: titleColor,
        fontSize: titleSize + "rem",
        marginBottom: titleMarginBottom + "rem",
        textAlign: align
      };
    } else {
      tStyle = {
        color: titleColor,
        fontSize: titleSize + "rem",
        textAlign: align
      };
    }

    return (
      <div className={containerClass} style={cStyle}>
        <RichText.Content
          tagName={tagName}
          value={title}
          onChange={value => setAttributes({ title: value })}
          style={tStyle}
          className={`vk_heading_title vk_heading_title-style-${titleStyle}`}
          placeholder={__("Input title…", "vk-blocks")}
        />
        {// サブテキスト
          (() => {
            if (subTextFlag === "on") {
              return (
                <RichText.Content
                  tagName={"p"}
                  value={subText}
                  onChange={value => setAttributes({ subText: value })}
                  style={{
                    color: subTextColor,
                    fontSize: subTextSize + "rem",
                    textAlign: align
                  }}
                  className={`vk_heading_subtext vk_heading_subtext-style-${titleStyle}`}
                  placeholder={__("Input sub text…", "vk-blocks")}
                />
              );
            }
          })()}
      </div>
    );
  }
}
