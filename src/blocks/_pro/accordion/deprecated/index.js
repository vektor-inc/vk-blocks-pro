import save1_3_9 from './1.3.9/save';
import save1_12_0 from './1.12.0/save';

const blockAttributes = {
	containerClass: {
		type: "string",
		default: "vk_accordion-container",
	},
};

const deprecated = [
	{
		attributes: {
			...blockAttributes,
			containerClass: {
				type: "string",
				default: "vk_accordion",
			},
		},
		save: save1_12_0
	},
	{
		attributes: {
			...blockAttributes,
			containerClass: {
				type: "string",
				default: "vk_accordion-container",
			},
		},
		save: save1_3_9
	}
];
export default deprecated;
