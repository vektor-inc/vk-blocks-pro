import save000 from './0.0.0/save';
import save001 from './0.0.1/save';
import save002 from './0.0.2/save';

const blockAttributes = {
	heading: {
		type: "string",
		source: "html",
		selector: "dt"
	  },
	  content: {
		type: "string",
		source: "html",
		selector: "dd"
	}
};

const deprecated = [
	{
		attributes: blockAttributes,
		save: save000,
	},
	{
		attributes: blockAttributes,
		save: save001,
	},
	{
		attributes: {
			...blockAttributes,
			content: {
				type: "string",
			}
		},
		save: save002,
	},
];
export default deprecated;
