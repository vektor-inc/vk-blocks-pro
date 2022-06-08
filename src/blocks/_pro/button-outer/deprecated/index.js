import save1_35_0 from './1.35.0/save';
import save1_37_0 from './1.37.0/save';

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
		save: save1_37_0,
	},	{
		attributes: blockAttributes,
		save: save1_35_0,
	}
];
export default deprecated;
