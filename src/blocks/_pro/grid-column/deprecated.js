const { InnerBlocks } = wp.editor;
const { __ } = wp.i18n; // Import __() from wp.i18n
const { Component } = wp.element;

export const DepColumnResponsive01 = (props) => {
	const for_ = props.for_;
	const attributes = props.attributes;
	let innerClass = "";
	const className = props.className;
	const containerClass = " vk_grid-column";
	let elm;

	const ALLOWED_BLOCKS = [["vk-blocks/grid-column-item"]];
	const TEMPLATE = ALLOWED_BLOCKS;

	//編集画面とサイト上の切り替え
	if (for_ === "edit") {
		innerClass = "editting";
		innerClass = innerClass + " vk_posts-edit";

		elm = (
			<div className={ `${ containerClass }` }>
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

export const deprecated = [
	{
		attributes: {
			name: {
				type: "string",
				default: "grid-column-item",
			},
			layout: {
				type: "string",
				default: "card",
			},
			col_xs: {
				type: "number",
				default: 1,
			},
			col_sm: {
				type: "number",
				default: 2,
			},
			col_md: {
				type: "number",
				default: 3,
			},
			col_lg: {
				type: "number",
				default: 3,
			},
			col_xl: {
				type: "number",
				default: 3,
			},
		},
		save({ attributes, className }) {
			return (
				<DepColumnResponsive01
					attributes={ attributes }
					className={ className }
					for_={ "save" }
				/>
			);
		},
	}
];
