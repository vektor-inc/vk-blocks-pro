import save1_3_9 from './1.3.9/save';
import save1_12_0 from './1.12.0/save';
import save1_76_0 from './1.76.0/save';

const blockAttributes = {};


/**
 * 1.12.x で値を追加
 */
const blockAttributes2 = {
	containerClass: {
		type: "string",
		default: "vk_accordion",
	},
};

/**
 * 1.76.0 で値を追加
 */
const blockAttributes3 = {
	...blockAttributes2,
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
	},
	isDeviceSpecific: {
		type: "boolean",
		default: false
	}
};

const deprecated = [
	{
		attributes: blockAttributes3,
		save: save1_76_0
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
