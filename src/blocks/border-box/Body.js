import { vkbBlockEditor } from "../_helper/depModules";
const { InnerBlocks, RichText } = vkbBlockEditor;
const { __ } = wp.i18n; // Import __() from wp.i18n

const Body = (props) => {
	const { setAttributes, attributes, for_ } = props;
	const { heading } = attributes;

	let inner;
	let title;
	//編集画面とサイト上の切り替え
	if (for_ === "edit") {
		inner = <InnerBlocks />;
		title = <RichText
			tagName="h4"
			className={"vk_borderBox_title"}
			onChange={value => setAttributes({ heading: value })}
			value={heading}
			placeholder={__("Please enter a title.", "vk-blocks")}
		/>

	} else if ("save") {
		inner = <InnerBlocks.Content />;
		title = <RichText.Content
			tagName="h4"
			className={"vk_borderBox_title"}
			value={heading}
		/>
	}

	return (
		<div className="vk_borderBox vk_borderBox-style-solid-kado-tit-tab">
			{/* <!-- [ ここに vk_borderBox _inner ...できれば無しでいきたいが...  ] --> */}
			<div className="vk_borderBox_title_container">
				<i className="fas fa-exclamation-triangle"></i>
				{title}
			</div>
			<div className="vk_borderBox_body">
				{inner}
			</div>
			{/* <!-- [ / ここに vk_borderBox _inner ...できれば無しでいきたいが...  ] --> */}
		</div>
	);

}
export default Body;
