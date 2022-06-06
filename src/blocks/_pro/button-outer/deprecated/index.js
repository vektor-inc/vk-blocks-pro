import save1_35_0 from './1.35.0/save';
import save1_36_2 from './1.36.2/save';

const blockAttributes = {
	buttonsJustify: {
		'type': 'string',
		'default': 'left'
	}
};

const blockAttributes2 = {
	...blockAttributes,
	"gap": {
		"type": "string",
		"default": null
	},
}

const deprecated = [
	{
		attributes: blockAttributes2,
		save: save1_36_2,
	},	{
		attributes: blockAttributes,
		save: save1_35_0,
	}
];
export default deprecated;
