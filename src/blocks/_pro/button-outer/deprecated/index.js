import save1_35_0 from './1.35.0/save';

const blockAttributes = {
	buttonsJustify: {
		'type': 'string',
		'default': 'left'
	}
};

const deprecated = [
	{
		attributes: blockAttributes,
		save: save1_35_0,
	}
];
export default deprecated;
