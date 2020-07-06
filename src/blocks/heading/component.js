import { vkbBlockEditor } from "./../_helper/depModules";
const { RichText } = vkbBlockEditor;
const { __ } = wp.i18n; // Import __() from wp.i18n
import ReactHtmlParser from 'react-html-parser';
import { Fragment } from "react";

const renderTitle = (level, contents,tStyle, headingStyle ) =>{
	switch (level) {
		case 1:
			return <h1 style={tStyle} className={headingStyle}>{contents}</h1>;
		case 2:
			return <h2 style={tStyle} className={headingStyle}>{contents}</h2>;
		case 3:
			return <h3 style={tStyle} className={headingStyle}>{contents}</h3>;
		case 4:
			return <h4 style={tStyle} className={headingStyle}>{contents}</h4>;
		case 5:
			return <h5 style={tStyle} className={headingStyle}>{contents}</h5>;
		case 6:
			return <h6 style={tStyle} className={headingStyle}>{contents}</h6>;
	}
}

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

	if (for_ === "edit") {

		let titleContent = <Fragment>
			{ReactHtmlParser(fontAwesomeIconBefore)}
				<RichText
					tagName={"span"}
					value={title}
					onChange={(value) => {
						setAttributes({ title: value} )
					}}
					style={tStyle}
					className={headingStyle}
					placeholder={__("Input title…", "vk-blocks")}
				/>
				{ReactHtmlParser(fontAwesomeIconAfter)}
		</Fragment>

		let subtextContent;
		if (subTextFlag === "on") {
			subtextContent = <RichText
			tagName={"p"}
			value={subText}
			onChange={value => setAttributes({ subText: value })}
			style={subTextStyle}
			className={subTextClass}
			placeholder={__("Input sub text…", "vk-blocks")}
		  />
		}

		return (<div className={containerClass} style={cStyle}>{renderTitle(level, titleContent, tStyle, headingStyle)}{subtextContent}</div>);

	} else if (for_ === "save") {

		let titleContent = <Fragment>
			{ReactHtmlParser(fontAwesomeIconBefore)}
			<RichText.Content
				tagName={"span"}
				value={title}
				style={tStyle}
				className={headingStyle}
			/>
			{ReactHtmlParser(fontAwesomeIconAfter)}
		</Fragment>

		let subtextContent;
		if (subTextFlag === "on") {
			subtextContent = <RichText.Content
			tagName={"p"}
			value={subText}
			style={subTextStyle}
			className={subTextClass}
		  />
		}
		return (<div className={containerClass} style={cStyle}>{renderTitle(level, titleContent, tStyle, headingStyle)}{subtextContent}</div>);
	}
}
