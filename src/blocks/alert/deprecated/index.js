import { save as save1_79_0, migrate as migrate1_79_0 } from './1.79.0/save';
import save000 from './0.0.0/save';

const blockAttributes = {
	style: {
		type: 'string',
		default: 'info',
	},
	content: {
		type: 'string',
		source: 'html',
		selector: 'p',
	},
};

const deprecated = [
	{
		attributes: blockAttributes,
		migrate: migrate1_79_0,
		save: save1_79_0,
	},
	{
		attributes: blockAttributes,
		save: save000,
	},
];
export default deprecated;
