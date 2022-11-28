import save000 from "./0.0.0/save"
import save001 from "./0.0.1/save"
import save002 from "./0.0.2/save"
import save003 from "./0.0.3/save"
import save0_49_1 from "./0.49.1/save"
import save0_58_7 from "./0.58.7/save"
import save1_46_0 from "./1.46.0/save"

const blockAttributes = {
	effect: {
		type: "string",
		default: "slide-up",
	},
	clientId: {
		type: "string",
		default: "",
	},
};

const blockAttributes2 = {
	...blockAttributes,
	speed: {
		type: "string",
		default: "fast",
	},
	range: {
		type: "string",
		default: "short",
	},
}

const blockAttributes3 = {
	...blockAttributes2,
	clientId: {
		type: "string"
	},
	blockId: {
		type: "string"
	}
}

/*
// 1.46.1以降 で attributes を追加
const blockAttributes4 = {
	...blockAttributes3,
	iteration: {
		type: "boolean"
	}
}
*/

const deprecated = [
	{
		attributes:	blockAttributes3,
		save: save1_46_0
	},
	{
		attributes:	blockAttributes2,
		save: save0_58_7
	},
	{
		attributes:	blockAttributes2,
		save: save0_49_1
	},
	{
		attributes:	blockAttributes2,
		save: save003,
	},
	{
		attributes:	blockAttributes2,
		save: save002,
	},
	{
		attributes:	blockAttributes2,
		save: save001,
	},
	{
		attributes: blockAttributes,
		save: save000,
	}
];

export default deprecated;
