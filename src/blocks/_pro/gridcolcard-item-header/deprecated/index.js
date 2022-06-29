import save1_39_0 from './1.39.0/save';
import save001 from './0.0.1/save';
import save000 from './0.0.0/save';

const blockAttributes = {
	containerSpace: {
		type: 'object',
		default: {
			top: null,
			left: null,
			right: null,
			bottom: null
		}
	},
	headerImageAspectRatio: {
		type: 'string',
		default: '1.618/1'
	},
	headerImageFit: {
		type: 'boolean',
		default: true
	},
	headerDisplay: {
		type: 'string',
		default: 'delete'
	}
};

/*
// 1.39.0 からの変更で追加したもの
const blockAttributes2 = {
	headerImageAspectRatio: {
		type: 'string',
		default: 'auto'
	},
};
*/


const deprecated = [
	{
		attributes: blockAttributes,
		save: save1_39_0
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
