/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal dependencies
 */
import { API_PATH } from '@vkblocks/utils/api/constants';

export const updateOptions = (options) => {
	apiFetch({
		path: API_PATH,
		method: 'POST',
		data: options,
	}).then((/*response, status*/) => {
		// setTimeout(() => {
		// 	console.log(response);
		// 	console.log( status );
		// }, 600);
	});
};
