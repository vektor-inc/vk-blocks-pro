import save000 from './0.0.0/save';
import save001 from './0.0.1/save';
import save1202 from './1.20.2/save';


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
		save: save1202,
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
