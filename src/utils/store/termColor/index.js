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
	}
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

	resolvers: {
		getTermColorInfoByPost(postId) {		
			return async ( { dispatch } ) => {
				const termColorInfo = await apiFetch({
					path: 'vk-blocks/v1/get_post_single_term_info',
					method: 'POST',
					data: { post_id: postId }
				});
	
				const payload = {
					postId,
					value: termColorInfo,
				};
				dispatch.setTermColor(payload);	
			};		
		}
	},
});

register(store);
