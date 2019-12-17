export const schema = {
	title: {
		source: 'html',
			selector: '.vk_prContent_colTxt_title',
	},
	titleColor: {
		type: 'string',
	},
	content: {
		source: 'html',
			selector: '.vk_prContent_colTxt_text',
	},
	contentColor: {
		type: 'string',
	},
	url: {
		type: 'string',
	default: null,
	},
	buttonType: {
		type: 'string',
	default: '0',
	},
	buttonColor: {
		type: 'string',
		default: 'primary',
	},
	buttonColorCustom: {
		type: 'string',
		default: null,
	},
	buttonText: {
		source: 'html',
		selector: '.vk_button_link_txt',
		default: '',
	},
	buttonTarget: {
		type: 'Boolean',
	default: false,
	},
	Image: {
		type: 'string',
		default: null,
	},
	ImageBorderColor: {
		type: 'string',
		default: null,
	},
	layout: {
		type: 'string',
	default: 'left',
	},
	fontAwesomeIconBefore:{
		type: 'string',
	},
	fontAwesomeIconAfter:{
		type: 'string',
	}
};
