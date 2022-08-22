import { populateOptions } from './actions';
import { fetchOptions } from './controls';
export function* getVKBlocksOption() {
	const options = yield fetchOptions('vk_blocks_options');
	return populateOptions('vkBlocksOption', options);
}

export function* getBalloonMeta() {
	const options = yield fetchOptions('balloon_meta');
	return populateOptions('balloonMeta', options);
}
