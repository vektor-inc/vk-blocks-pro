import {vkbBlockEditor} from "../../_helper/depModules"
const { InnerBlocks } =vkbBlockEditor;
const { __ } = wp.i18n;

export const ColumnResponsive = ( props ) => {
  const for_ = props.for_;
  let innerClass = "";
  const containerClass = " vk_grid-column";
  let elm;

  const ALLOWED_BLOCKS = [["vk-blocks/grid-column-item"]];
  const TEMPLATE = ALLOWED_BLOCKS;

  //編集画面とサイト上の切り替え
  if (for_ === "edit") {
    innerClass = "editting";
    innerClass = innerClass + " vk_posts-edit";

    elm = (
	<div className={ `${containerClass}` }>
		<InnerBlocks
          //編集画面の追加タグ用に2回目のClassを挿入
			template={ TEMPLATE }
			allowedBlocks={ ALLOWED_BLOCKS }
        />
	</div>
    );
  } else if ("save") {
    elm = (
				<div className={ "row" }>
					<InnerBlocks.Content />
				</div>
    );
  }
  return elm;
};
