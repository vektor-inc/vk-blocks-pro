import save0_49_1 from "./0.49.1/save"
import save0_58_7 from "./0.58.7/save"
import save1_34_1 from "./1.34.1/save"
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
// 1.46.0 の次で attributes を追加
const blockAttributes4 = {
	...blockAttributes3,
	once: {
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
		save: save1_34_1
	},
	{
		attributes:	blockAttributes2,
		save: save0_58_7
	},
	{
		attributes:	blockAttributes2,
		save: save0_49_1
	}
];

export default deprecated;
