/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal dependencies
 */
import { readTextFile } from './file';

/**
 * readFile from JSON file.
 *
 * @param {File} file File.
 */
export async function readFile(file) {
	const fileContent = await readTextFile(file);
	let uploadedOption;
	try {
		uploadedOption = JSON.parse(fileContent);
	} catch (e) {
		throw new Error('Invalid JSON file');
	}
	return uploadedOption;
}

/**
 * Import from updateOption.
 *
 * @param {Object} updateOption
 */
export async function importOptions(updateOption) {
	const response = await apiFetch({
		path: '/vk-blocks/v1/update_vk_blocks_options',
		method: 'POST',
		data: {
			vkBlocksOption: updateOption,
		},
	});
	return {
		response,
		updateOption,
	};
}
