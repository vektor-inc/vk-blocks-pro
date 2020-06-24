import { faSchema } from "./../_helper/font-awesome-new";
export const originalSchema = {
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
		default: ""
	},
	fontAwesomeIconAfter: {
		type: "string",
		default: ""
	}
};

let mergeSchema = () => {
	return Object.assign(originalSchema, faSchema);
};

export const schema = mergeSchema();
