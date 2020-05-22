import { faSchema } from "./../_helper/font-awesome";

export const originalSchema = {
	heading: {
		type: "string",
		source: "html",
		selector: "h4"
	},
	style: {
		type: 'string',
		default: 'solid',
	},
	color: {
		type: 'string',
		default: 'red',
	}
};

let mergeSchema = () => {
	return Object.assign(originalSchema, faSchema);
};

export const schema = mergeSchema();
