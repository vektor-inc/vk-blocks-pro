import save1_83_0 from './1.83.0/save';
import save1_84_0 from './1.84.0/save';

const blockAttributes = {
	footerDisplay: {
		type: 'string',
		default: 'delete'
	},
};

// 1.83.0 からの変更で追加したもの
const blockAttributes2 = {
	...blockAttributes,
	footerDisplay: {
		type: 'string',
		default: 'display'
	},
};

const deprecated = [
	{
		attributes: blockAttributes2,
		save: save1_84_0,
	},
	{
		attributes: blockAttributes,
		save: save1_83_0,
	},
];
export default deprecated;
