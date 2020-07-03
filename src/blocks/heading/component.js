const { Component,useEffect } = wp.element;
import { vkbBlockEditor } from "./../_helper/depModules";
import ReactHtmlParser from 'react-html-parser';
const { RichText } = vkbBlockEditor;
const { __ } = wp.i18n; // Import __() from wp.i18n
const { dispatch } = wp.data;

export const VKBHeading =(props) => {
	const {attributes,setAttributes,for_,clientId} = props
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
		outerMarginBottom,
		fontAwesomeIconBefore,
		fontAwesomeIconAfter
	} = attributes;
	let containerClass = `vk_heading vk_heading-style-${titleStyle}`;
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

	let headingStyle = `vk_heading_title vk_heading_title-style-${titleStyle}`;
	let subTextStyle = {
		color: subTextColor,
		fontSize: subTextSize + "rem",
		textAlign: align
	}
	let subTextClass = `vk_heading_subtext vk_heading_subtext-style-${titleStyle}`;

	const { updateBlockAttributes } = dispatch("core/block-editor") ? dispatch("core/block-editor") : dispatch("core/editor");

	// useEffect(() => {
	// 	const replaced = title.replace(/^<i.*i>/g, '')
	// 	console.log(replaced)
	// 	console.log(clientId)
	// 	updateBlockAttributes(clientId, { title: "fontAwesomeIconBefore" + replaced + "fontAwesomeIconAfter"});
	// },[fontAwesomeIconBefore,fontAwesomeIconAfter])

	console.log(props)

	if (for_ === "edit") {
		return (
			<div className={containerClass} style={cStyle}>
				<RichText
					tagName={tagName}
					value={title}
					onChange={(value) => {
						setAttributes({ title: value})
					}}
					style={tStyle}
					className={headingStyle}
					placeholder={__("Input title…", "vk-blocks")}
				/>
				{/* {subTextFlag === "on" && <RichText tagName={"p"} value={subText} onChange={value => setAttributes({ subText: value })} style={subTextStyle} className={subTextClass} placeholder={__("Input sub text…", "vk-blocks")}/>} */}
			</div>
		);
	} else if (for_ === "save") {
		return (
			<div className={containerClass} style={cStyle}>
				<RichText.Content
						tagName={tagName}
						value={title}
						style={tStyle}
						className={headingStyle}
					/>
				{/* {subTextFlag === "on" && <RichText.Content tagName={"p"} value={subText} style={subTextStyle} className={subTextClass} />} */}
			</div>
		);
	}
}
