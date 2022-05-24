import save1_34_1 from './1.34.1/save';

const blockAttributes = {
	buttonsJustify: {
		'type': 'string',
		'default': 'left'
	}
};

const deprecated = [
	{
		attributes: blockAttributes,
		save: save1_34_1,
	}
];
export default deprecated;
