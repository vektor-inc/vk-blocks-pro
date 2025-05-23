import save1_78_0 from './1.78.0/save';

const blockAttributes = {
	style: {
		type: 'string',
		default: 'default',
	},
	renderHtml: {
		type: 'string',
		default: '',
	},
	open: {
		type: 'string',
		default: 'open',
	},
	className: {
		type: 'string',
		default: '',
	},
};

/* 次回対応おねがいします
const blockAttributes2 = {
	...blockAttributes,
	excludeFromTOC: {
		type: 'boolean',
		default: false
	}
}
*/

const deprecated = [
	{
		attributes: blockAttributes,
		save: save1_78_0,
	},
];
export default deprecated;
