import { FETCH_OPTIONS, POST_OPTIONS } from './types';
import apiFetch from '@wordpress/api-fetch';

export const fetchOptions = (fetchType) => {
	return {
		type: FETCH_OPTIONS,
		fetchType,
	};
};

export const postOptions = (options) => {
	return {
		type: POST_OPTIONS,
		options,
	};
};

export default {
	FETCH_OPTIONS({ fetchType }) {
		return apiFetch({
			path: `/vk-blocks/v1/get_vk_blocks_options/${fetchType}`,
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
