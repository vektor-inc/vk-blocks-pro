import save000 from './0.0.0/save';
import schema000 from './0.0.0/schema';
import save001 from './0.0.1/save';
import schema001 from './0.0.1/schema';
import save002 from './0.0.2/save';
import schema002 from './0.0.2/schema';

export const deprecated = [
	{
		attributes: schema002(4),
		save002,
	},
	{
		attributes: schema001(4),
		save001,
	},
	{
		attributes: schema000(4),
		save000,
	},
];
