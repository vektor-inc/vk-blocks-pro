import { iconName, iconUser, iconPicture, title, content, baseColor, url } from "./../../utils/example-data"
export const schema = {
	title: {
		source: "html",
		selector: ".vk_prContent_colTxt_title"
	},
	titleColor: {
		type: "string",
		default: ""
	},
	content: {
		source: "html",
		selector: ".vk_prContent_colTxt_text"
	},
	contentColor: {
		type: "string",
		default: ""
	},
	url: {
		type: "string",
		default: ""
	},
	buttonType: {
		type: "string",
		default: "0"
	},
	buttonColor: {
		type: "string",
		default: "primary"
	},
	buttonColorCustom: {
		type: "string",
		default: ""
	},
	buttonText: {
		source: "html",
		selector: ".vk_button_link_txt",
		default: ""
	},
	buttonTarget: {
		type: "Boolean",
		default: false
	},
	Image: {
		type: "string",
		default: "{}"
	},
	ImageBorderColor: {
		type: "string",
		default: ""
	},
	layout: {
		type: "string",
		default: "left"
	},
	fontAwesomeIconBefore: {
		type: "string",
		default: '<i class="fas fa-user"></i>'
	},
	fontAwesomeIconAfter: {
		type: "string",
		default: '<i class="fas fa-user"></i>'
	}
};

export const example = {
	attributes:{
		title,
		titleColor: baseColor,
		content,
		contentColor: baseColor,
		url,
		buttonType: "0",
		buttonColor: "primary",
		buttonColorCustom: "",
		buttonText: iconName,
		buttonTarget: false,
		Image: iconPicture,
		ImageBorderColor:baseColor,
		layout: "left",
		fontAwesomeIconBefore: iconUser,
		fontAwesomeIconAfter: iconUser
	}
}
