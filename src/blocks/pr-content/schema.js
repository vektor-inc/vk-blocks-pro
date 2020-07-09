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
	title: "",
	titleColor: "",
	content: "",
	contentColor: "",
	url: "",
	buttonType: "0",
	buttonColor: "primary",
	buttonColorCustom: "",
	buttonText: "",
	buttonTarget: false,
	Image: "{}",
	ImageBorderColor:"",
	layout: "left",
	fontAwesomeIconBefore: '<i class="fas fa-user"></i>',
	fontAwesomeIconAfter: '<i class="fas fa-user"></i>'
};
