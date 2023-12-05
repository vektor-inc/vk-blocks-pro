/**
 * WordPress dependencies
 */
import { createReduxStore, register } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';

const DEFAULT_STATE = {};

const actions = {
	setTermColor(payload) {
		return {
			type: 'SET_TERM_COLOR',
			...payload,
		};
	},

	fetchFromAPI(path, method = 'GET', param = {}) {
		return {
			type: 'FETCH_FROM_API',
			path,
			method,
			data: param,
		};
	},
};

const store = createReduxStore('vk-blocks/term-color', {
	reducer(state = DEFAULT_STATE, action) {
		switch (action.type) {
			case 'SET_TERM_COLOR':
				return {
					...state,
					[action.postId]: action.value,
				};
		}
		return state;
	},

	actions,

	selectors: {
		getTermColorInfoByPost(state, postId) {
			return state[postId];
		},
	},

	controls: {
		FETCH_FROM_API(action) {
			const requestOptions = {
				path: action.path,
			};

			if (action.method) {
				requestOptions.method = action.method;
			}

			if (action.data) {
				requestOptions.data = action.data;
			}

			return apiFetch(requestOptions);
		},
	},

	resolvers: {
		*getTermColorInfoByPost(postId) {
			const termColorInfo = yield actions.fetchFromAPI(
				'vk-blocks/v1/get_post_single_term_info',
				'POST',
				{ post_id: postId }
			);

			const payload = {
				postId,
				value: termColorInfo,
			};
			return actions.setTermColor(payload);
		},
	},
});

register(store);
