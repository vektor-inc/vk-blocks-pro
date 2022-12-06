import { FETCH_OPTIONS, POST_OPTIONS } from './types';
import apiFetch from '@wordpress/api-fetch';

export const fetchOptions = () => {
	return {
		type: FETCH_OPTIONS
	};
};

export const postOptions = (options) => {
	return {
		type: POST_OPTIONS,
		options,
	};
};

export default {
	FETCH_OPTIONS() {
		return apiFetch({
			path: `/vk-blocks/v1/get_vk_blocks_options`,
		});
	},
	POST_OPTIONS({ options }) {
		return apiFetch({
			path: '/vk-blocks/v1/update_vk_blocks_options',
			method: 'POST',
			data: {
				vkBlocksOption: options,
			},
		});
	},
};
