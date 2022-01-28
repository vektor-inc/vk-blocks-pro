import save000 from "./0.0.0/save"
import save001 from "./0.0.1/save"
import save002 from "./0.0.2/save"
import save003 from "./0.0.3/save"
import save0_49_1 from "./0.49.1/save"
import save0_58_7 from "./0.58.7/save"
import save1_22_3 from "./1.22.3/save"

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
	blockId: {
		type: "string",
		default: "1"
	},
};

const deprecated = [
	{
		attributes: blockAttributes2,
		save: save1_22_3
	},
	{
		attributes:	{
			...blockAttributes,
			speed: {
				type: "string",
				default: "fast",
			},
			range: {
				type: "string",
				default: "short",
			},
		},
		save: save0_58_7
	},
	{
		attributes:	{
			...blockAttributes,
			speed: {
				type: "string",
				default: "fast",
			},
			range: {
				type: "string",
				default: "short",
			},
		},
		save: save0_49_1
	},
	{
		attributes:	{
			...blockAttributes,
			speed: {
				type: "string",
				default: "fast",
			},
			range: {
				type: "string",
				default: "short",
			},
		},
		save: save003,
	},
	{
		attributes:	{
			...blockAttributes,
			speed: {
				type: "string",
				default: "fast",
			},
			range: {
				type: "string",
				default: "short",
			},
		},
		save: save002,
	},
	{
		attributes:	{
			...blockAttributes,
			speed: {
				type: "string",
				default: "fast",
			},
			range: {
				type: "string",
				default: "short",
			},
		},
		save: save001,
	},
	{
		attributes: blockAttributes,
		save: save000,
	}
];

export default deprecated;
