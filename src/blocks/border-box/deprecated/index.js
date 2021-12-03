import save000 from './0.0.0/save';
import save001 from './0.0.1/save';
import save1204 from './1.20.4/save';


const blockAttributes = {
	heading: {
		type: 'string',
		source: 'html',
		selector: 'h4',
	},
	color: {
		type: 'string',
		default: 'red',
	},
	faIcon: {
		type: 'string',
		default: '',
	},
};

const deprecated = [
	{
		attributes: {
			...blockAttributes,
			bgColor: {
				type: 'string',
				default: 'transparent',
			},
			color: {
				type: 'string',
			}
		},
		save: save1204,
	},
	{
		attributes: {
			...blockAttributes,
			bgColor: {
				type: 'string',
				default: 'transparent',
			}
		},
		save: save001,
	},
	{
		attributes: blockAttributes,
		save: save000,
	}
];
export default deprecated;
