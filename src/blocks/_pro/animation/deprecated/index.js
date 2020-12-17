import save000 from "./0.0.0/save"
import save001 from "./0.0.1/save"
import save002 from "./0.49.1/save"

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

export const deprecated = [
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
		save: save002
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
