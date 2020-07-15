import { faSchema } from "./font-awesome-new";

export const originalSchema = {
	heading: {
		type: "string",
		source: "html",
		selector: "h4"
	},
	color: {
		type: 'string',
		default: 'red',
	},
	bgColor: {
		type: 'string',
		default: 'transparent'
	}

};

let mergeSchema = () => {
	return Object.assign(originalSchema, faSchema);
};

export const schema = mergeSchema();
