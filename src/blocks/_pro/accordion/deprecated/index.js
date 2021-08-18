import save1_3_9 from './1.3.9/save';
import save1_13_2 from './1.13.2/save';

const blockAttributes = {};

/**
 * 1.13.x で値を追加
 */
const blockAttributes2 = {
	containerClass: {
		type: "string",
		default: "vk_accordion",
	},
};

const deprecated = [
	{
		attributes: blockAttributes2,
		save: save1_13_2,
	},
	{
		attributes: blockAttributes,
		save: save1_3_9,
	}
];
export default deprecated;
