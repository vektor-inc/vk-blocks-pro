import save1_80_1 from './1.80.1/save';
// import save1_81_0 from './1.81.0/save';

const blockAttributes = {
	footerDisplay: {
		type: 'string',
		default: 'delete'
	},
};

/*
// 1.81.0 からの変更で追加したもの
const blockAttributes2 = {
	...blockAttributes,
	footerDisplay: {
		type: 'string',
		default: 'display'
	},
};
*/

const deprecated = [
	{
	//	attributes: blockAttributes2,
	//	save: save1_81_0,
	},
	{
		attributes: blockAttributes,
		save: save1_80_1,
	},
];
export default deprecated;
