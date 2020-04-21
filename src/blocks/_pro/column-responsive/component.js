const { InnerBlocks } = wp.editor;
const { __ } = wp.i18n; // Import __() from wp.i18n
const { Component } = wp.element;

export class ColumnResponsive extends Component {
  render() {
    console.log(this.props);
    let for_ = this.props.for_;
    let attributes = this.props.attributes;
    let innerClass = "";
    let className = this.props.className;
    let containerClass = " vk_card";
    let elm;

    const ALLOWED_BLOCKS = [["vk-blocks/column-responsive-item"]];
    const TEMPLATE = ALLOWED_BLOCKS;

    // [
    //   [
    //     "core/column",
    //     {},
    //     [["core/paragraph", { placeholder: "Enter side content..." }]],
    //   ],
    //   [
    //     "core/column",
    //     {},
    //     [["core/paragraph", { placeholder: "Enter side content..." }]],
    //   ],
    //   [
    //     "core/column",
    //     {},
    //     [["core/paragraph", { placeholder: "Enter side content..." }]],
    //   ],
    // ];

    //編集画面とサイト上の切り替え
    if (for_ === "edit") {
      innerClass = "editting";
      innerClass = innerClass + " vk_posts-edit";
      // innerClass =
      //   innerClass +
      //   " vk_posts-edit-col-xs-" +
      //   convertToGrid(attributes.col_xs);
      // innerClass =
      //   innerClass +
      //   " vk_posts-edit-col-sm-" +
      //   convertToGrid(attributes.col_sm);
      // innerClass =
      //   innerClass +
      //   " vk_posts-edit-col-md-" +
      //   convertToGrid(attributes.col_md);
      // innerClass =
      //   innerClass +
      //   " vk_posts-edit-col-lg-" +
      //   convertToGrid(attributes.col_lg);
      // innerClass =
      //   innerClass +
      //   " vk_posts-edit-col-xl-" +
      //   convertToGrid(attributes.col_xl);

      elm = (
        <div className={innerClass}>
          <InnerBlocks template={TEMPLATE} allowedBlocks={ALLOWED_BLOCKS} />
        </div>
      );
    } else if ("save") {
      elm = <InnerBlocks.Content />;
    }
    return <div className={`vk_posts ${className}`}>{elm}</div>;
  }
}
