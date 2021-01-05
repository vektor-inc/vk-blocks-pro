import save000 from "./0.0.0/save"
import save001 from "./0.0.1/save"
import save0_49_1 from "./0.49.1/save"
import save0_58_7 from "./0.58.7/save"

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

const deprecated = [
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
		save001,
	},
	{
		attributes: blockAttributes,
		save000,
	}
];

export default deprecated;
