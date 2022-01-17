import save000 from './0.0.0/save';
import schema000 from './0.0.0/schema';
import save001 from './0.0.1/save';
import schema001 from './0.0.1/schema';
import save002 from './0.0.2/save';
import schema002 from './0.0.2/schema';
import save0_59_0 from './0.59.0/save';
import schema0_59_0 from './0.59.0/schema';
import save1_0_7 from './1.0.7/save';
import schema1_0_7 from './1.0.7/schema';
import save1_20_2 from './1.20.2/save';
import schema1_20_2 from './1.20.2/schema';

export const deprecated = [
	{
		attributes: schema1_20_2(4),
		save: save1_20_2,
	},
	{
		attributes: schema1_0_7(4),
		save: save1_0_7,
	},
	{
		attributes: schema0_59_0(4),
		save: save0_59_0,
	},
	{
		attributes: schema002(4),
		save: save002,
	},
	{
		attributes: schema001(4),
		save: save001,
	},
	{
		attributes: schema000(4),
		save: save000,
	},
];
