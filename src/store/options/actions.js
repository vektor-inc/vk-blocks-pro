import { POPULATE_OPTIONS } from './types';
import { postOptions } from './controls';
export function* setOptions(options) {
	yield postOptions(options);
	return populateOptions(options);
}

export function populateOptions(options) {
	return {
		type: POPULATE_OPTIONS,
		options,
	};
}
