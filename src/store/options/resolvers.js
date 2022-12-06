import { populateOptions } from './actions';
import { fetchOptions } from './controls';
export function* getVKBlocksOption() {
	const options = yield fetchOptions();
	return populateOptions(options);
}

export function* getBalloonMeta() {
	const options = yield fetchOptions();
	return populateOptions(options);
}
