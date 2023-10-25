/**
 * WordPress dependencies
 */
import { createReduxStore, register } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal dependencies
 */
import { STORE_NAME, API_PATH } from './constants';

export const updateOptions = (options) => {
	apiFetch({
		path: API_PATH,
		method: 'POST',
		data: options,
	});
};

const DEFAULT_STATE = {
	options: {},
};

/**
 * Store definition for the block-editor namespace.
 *
 * @see https://github.com/WordPress/gutenberg/blob/HEAD/packages/data/README.md#createReduxStore
 *
 * @type {Object}
 */
const actions = {
	setOptions(options) {
		return {
			type: 'SET_OPTIONS',
			options,
		};
	},

	fetchFromAPI(path) {
		return {
			type: 'FETCH_FROM_API',
			path,
		};
	},
};

const store = createReduxStore(STORE_NAME, {
	reducer(state = DEFAULT_STATE, action) {
		switch (action.type) {
			case 'SET_OPTIONS':
				return {
					...state,
					options: action.options,
				};
		}

		return state;
	},

	actions,

	selectors: {
		getOptions(state) {
			const { options } = state;
			return options;
		},
	},

	controls: {
		FETCH_FROM_API(action) {
			return apiFetch({ path: action.path });
		},
	},

	resolvers: {
		*getOptions() {
			const options = yield actions.fetchFromAPI(API_PATH);
			return actions.setOptions(options);
		},
	},
});

register(store);
