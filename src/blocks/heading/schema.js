export const schema = {
	anchor: {
		type: 'string',
		source: 'attribute',
		attribute: 'id',
		selector: '*',
	},
	level: {
		type: "number",
		default: 2
	},
	align: {
		type: "string"
	},
	titleStyle: {
		type: "string",
		default: "default"
	},
	outerMarginBottom: {
		type: "number",
		default: ""
	},
	title: {
		type: "string",
		source: "html",
		selector: "span",
		default: ""
	},
	titleColor: {
		type: "string",
		default: "#000000"
	},
	titleSize: {
		type: "number",
		default: 2
	},
	titleMarginBottom: {
		type: "number",
		default: 1
	},
	subText: {
		source: "html",
		selector: "p",
		default: ""
	},
	subTextFlag: {
		type: "string",
		default: "on"
	},
	subTextColor: {
		type: "string",
		default: "#000000"
	},
	subTextSize: {
		type: "number",
		default: 1.2
	},
	fontAwesomeIconBefore: {
		type: 'string',
		default: '',
	},
	fontAwesomeIconAfter: {
		type: 'string',
		default:  '',
	 },
	 fontAwesomeIconColor: {
		type: "string",
		default: "#000000"
	},
};

export const example = {
	anchor: '',
	level: 2,
	align: "left",
	titleStyle: "default",
	outerMarginBottom: "",
	title:  "",
	titleColor: "#000000",
	titleSize: 2,
	titleMarginBottom: 1,
	subText: "",
	subTextFlag: {
		type: "string",
		default: "on"
	},
	subTextColor: "#000000",
	subTextSize: 1.2,
	fontAwesomeIconBefore: '',
	fontAwesomeIconAfter: '',
	fontAwesomeIconColor: "#000000",
};
