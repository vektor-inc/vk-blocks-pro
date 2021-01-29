import save000 from './0.0.0/save';
import save001 from './0.0.1/save';
import save002 from './0.0.2/save';
import save0_5_1 from './0.5.1/save';
import save0_43_0 from './0.43.0/save';
import save0_58_7 from './0.58.7/save';
import save0_58_9 from './0.58.9/save';

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
	...blockAttributes.titleColor.default='',
	...blockAttributes.contentColor.default='',
	...blockAttributes.url.default='',
	...blockAttributes.buttonColorCustom.default='',
	...blockAttributes.Image.default='{}',
	...blockAttributes.ImageBorderColor.default='',
	...blockAttributes.fontAwesomeIconBefore.default='',
	...blockAttributes.fontAwesomeIconAfter.default='',
}

const blockAttributes3 = {
	...blockAttributes2,
	...blockAttributes2.fontAwesomeIconBefore.default='<i class="fas fa-user"></i>',
	...blockAttributes2.fontAwesomeIconAfter.default='<i class="fas fa-user"></i>',
}

const deprecated = [
	{
		attributes: blockAttributes3,
		save: save0_58_9,
	},
	{
		attributes: blockAttributes3,
		save: save0_58_7,
	},
	{
		attributes: blockAttributes3,
		save: save0_43_0,
	},
	{
		attributes: blockAttributes2,
		save: save0_5_1,
	},
	{
		attributes: blockAttributes2,
		save: save002,
	},
	{
		attributes: blockAttributes,
		save: save001,
	},
	{
		attributes: blockAttributes,
		save: save000,
	},
];

export default deprecated;
