export const schema = {
	unit: {
		type: 'string',
		default: 'px',
	},
	pc: {
		type: 'number',
		default: 600,
	},
	tablet: {
		type: 'number',
		default: 600,
	},
	mobile: {
		type: 'number',
		default: 600,
	},
	autoPlay: {
		type: "boolean",
		default: true,
	},
	autoPlayDelay: {
		type: "number",
		default: 2500,
	},
	pagination: {
		type: "boolean",
		default: true,
	},
	clientId: {
		type: "string",
		default: "",
	},
	width:{
		type: "string",
		default: "",
	},
	loop: {
		type: "boolean",
		default: true,
	},
	effect: {
		type: "string",
		default: "slide",
	},
};
