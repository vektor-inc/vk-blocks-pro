const { __ } = wp.i18n;
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
	}
};

let mergeSchema = () => {
	return Object.assign(originalSchema, faSchema);
};

export const schema = mergeSchema();

export const example  = {
    attributes: {
        heading: __("Title", "vk-blocks"),
		color: "red",
		faIcon: '<i class="fas fa-user"></i>',
		innerBlocks: {
			name: 'core/paragraph',
			attributes: {
				content: __("Lorem ipsum dolor sit amet", "vk-blocks"),
			},
		},
    },
}
