import save1_3_9 from './1.3.9/save';
import save1_12_0 from './1.12.0/save';
import save1_72_1 from './1.72.1/save';

const blockAttributes = {};

/**
 * 1.72.1 で値を追加
 */
const blockAttributes3 = {
	containerClass2: {
		initialState: {
			type: "string",
			default: "close"
		},
		initialStateMobile: {
			type: "string",
			default: ""
		},
		initialStateTablet: {
			type: "string",
			default: ""
		},
		initialStateDesktop: {
			type: "string",
			default: ""
		}
	},
};

/**
 * 1.12.x で値を追加
 */
const blockAttributes2 = {
	containerClass: {
		type: "string",
		default: "vk_accordion",
	},
};

const deprecated = [
	{
		attributes: blockAttributes3,
		save: save1_72_1
	},
	{
		attributes: blockAttributes2,
		save: save1_12_0
	},
	{
		attributes: blockAttributes,
		save: save1_3_9
	}
];
export default deprecated;
