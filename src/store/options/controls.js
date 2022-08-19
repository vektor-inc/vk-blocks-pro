import { FETCH_OPTIONS } from './types';
import apiFetch from '@wordpress/api-fetch';

export const fetchOptions = () => {
	return {
		type: FETCH_OPTIONS,
	};
};

export default {
	FETCH_OPTIONS() {
		return apiFetch({
			path: '/vk-blocks/v1/get_vk_blocks_options'
		});
	}
}