import { populateOptions } from './actions';
import { fetchOptions } from './controls';
export function* getOptions() {
	const options = yield fetchOptions();
	return populateOptions(options);
}
