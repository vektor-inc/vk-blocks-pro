import save1_7_1 from './1.7.1/save';

const blockAttributes = {
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
	fontAwesomeIconBefore: {
		type: 'string',
	},
	fontAwesomeIconAfter: {
		type: 'string',
	},
};

const blockAttributes2 = {
	...blockAttributes,
	titleColor: {
		type: 'string',
		default: ''
	},
	contentColor: {
		type: 'string',
		default: ''
	},
	url: {
		type: 'string',
		default: ''
	},
	buttonColorCustom: {
		type: 'string',
		default: ''
	},
	Image: {
		type: 'string',
		default: '{}'
	},
	ImageBorderColor: {
		type: 'string',
		default: ''
	},
	fontAwesomeIconBefore: {
		type: 'string',
		default: ''
	},
	fontAwesomeIconAfter: {
		type: 'string',
		default: ''
	}
};

const blockAttributes3 = {
	...blockAttributes2,
	fontAwesomeIconBefore: {
		type: 'string',
		default: '<i class="fas fa-user"></i>'
	},
	fontAwesomeIconAfter: {
		type: 'string',
		default: '<i class="fas fa-user"></i>'
	}
};

const deprecated = [
	{
		attributes: blockAttributes3,
		save: save1_7_1,
	},
];

export default deprecated;
