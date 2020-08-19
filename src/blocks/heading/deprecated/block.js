/**
 * heading block type
 *
 */
import { schema_0_40_0, schemav0_24_1, schema, schema1, schema2 } from "./schema";
import classNames from "classnames";
import { VKBHeading,VKBHeading2,VKBHeadingV0_24_1 } from "./component";
import { VKBHeading_0_39_5 } from "./component_0_39_5";
import { VKBHeading_0_40_0 } from "./component_0_40_0";

const { Fragment, Component } = wp.element;
import { vkbBlockEditor } from "./../../_helper/depModules";
const { RichText } = vkbBlockEditor;
const { __ } = wp.i18n;

export const Deprecated = [
	{
		attributes: schema_0_40_0,
		save(props) {
			const {attributes} = props
			return (
				<div id={attributes.anchor}>
					<VKBHeading_0_40_0 {...props} for_={"save"}/>
				</div>
			);
		},
	},
	{
		attributes:schema2,
		save(props) {
			const {attributes} = props
			return (
				<div id={attributes.anchor}>
					<VKBHeading_0_39_5 attributes={attributes} for_={"save"} />
				</div>
			);
		},
	},
	{
		attributes:schema2,
		save(props) {
			const {attributes} = props
			return (
				<div id={attributes.anchor}>
					<VKBHeading2 attributes={attributes} for_={"save"} />
				</div>
			);
		},
	},
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
			anchor: {
				type: 'string',
				source: 'attribute',
				attribute: 'id',
				selector: '*',
			},
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
    attributes: {
			anchor: {
				type: 'string',
				source: 'attribute',
				attribute: 'id',
				selector: '*',
			},
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
	},
	{
		attributes:schemav0_24_1,
		save({ attributes, className }) {
			return (
				<div className={className}>
					<VKBHeadingV0_24_1 attributes={attributes} for_={"save"} />
				</div>
			);
		},
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
