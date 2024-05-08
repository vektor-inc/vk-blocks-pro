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
];
