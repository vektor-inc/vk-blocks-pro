import { vkbBlockEditor } from "./../_helper/depModules";
const { RichText } = vkbBlockEditor;
const { __ } = wp.i18n; // Import __() from wp.i18n

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

	let titleAndIcons = "";
	const replaced = title.replace(/<i class=".*?"><\/i>/g, '')
	titleAndIcons = fontAwesomeIconBefore + replaced + fontAwesomeIconAfter

	if (for_ === "edit") {
		return (
			<div className={containerClass} style={cStyle}>
				<RichText
					tagName={tagName}
					value={titleAndIcons}
					onChange={(value) => {
						setAttributes({ title: value} )
					}}
					style={tStyle}
					className={headingStyle}
					placeholder={__("Input title…", "vk-blocks")}
				/>
				{subTextFlag === "on" && <RichText tagName={"p"} value={subText} onChange={value => setAttributes({ subText: value })} style={subTextStyle} className={subTextClass} placeholder={__("Input sub text…", "vk-blocks")}/>}
			</div>
		);
	} else if (for_ === "save") {
		return (
			<div className={containerClass} style={cStyle}>
				<RichText.Content
						tagName={tagName}
						value={titleAndIcons}
						style={tStyle}
						className={headingStyle}
					/>
				{subTextFlag === "on" && <RichText.Content tagName={"p"} value={subText} style={subTextStyle} className={subTextClass} />}
			</div>
		);
	}
}
