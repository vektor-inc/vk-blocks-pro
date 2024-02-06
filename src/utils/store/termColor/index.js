/**
 * WordPress dependencies
 */
import { createReduxStore, register } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';

const DEFAULT_STATE = {};

const store = createReduxStore('vk-blocks/term-color', {
	reducer(state = DEFAULT_STATE, action) {
		switch (action.type) {
			case 'SET_TERM_COLOR':
				const currentTaxonomyState =
					state[action.postId]?.[action.taxonomy] || {};
				return {
					...state,
					[action.postId]: {
						...(state[action.postId] || {}),
						[action.taxonomy]: {
							value: action.value,
							isLoading:
								currentTaxonomyState.isLoading !== undefined
									? currentTaxonomyState.isLoading
									: false,
						},
					},
				};
			case 'SET_IS_LOADING':
				const currentTaxonomyStateForLoading =
					state[action.postId]?.[action.taxonomy] || {};
				return {
					...state,
					[action.postId]: {
						...(state[action.postId] || {}),
						[action.taxonomy]: {
							...currentTaxonomyStateForLoading,
							isLoading: action.isLoading,
						},
					},
				};
		}
		return state;
	},

	actions: {
		/**
		 * Action that sets the color for a specific term within a post's taxonomy.
		 *
		 * @param {Object} payload          The action payload containing the term color information.
		 * @param {number} payload.postId   The ID of the post.
		 * @param {string} payload.taxonomy The taxonomy to which the term belongs.
		 * @param {string} payload.value    The color value to set for the term.
		 * @return {Object} Action object.
		 */
		setTermColor(payload) {
			return {
				type: 'SET_TERM_COLOR',
				...payload,
			};
		},

		/**
		 * Action that sets the loading state for a specific taxonomy term within a post.
		 *
		 * @param {Object}  payload           The action payload containing the loading state information.
		 * @param {number}  payload.postId    The ID of the post.
		 * @param {string}  payload.taxonomy  The taxonomy to which the term belongs.
		 * @param {boolean} payload.isLoading The loading state to set for the term (true or false).
		 * @return {Object} Action object.
		 */
		setIsLoading(payload) {
			return {
				type: 'SET_IS_LOADING',
				...payload,
			};
		},
	},

	selectors: {
		/**
		 * Retrieves term color information for a given post and taxonomy.
		 * Automatically selects a taxonomy if not specified.
		 *
		 * @param {Object} state                             Current state of the store.
		 * @param {number} postId                            Post ID to retrieve color information for.
		 * @param {string} [taxonomy='__VK_TAXONOMY_AUTO__'] Optional taxonomy name.
		 * @return {Object} Term color value and loading state. Returns null and true if data is unavailable.
		 */
		getTermColorInfo(state, postId, taxonomy = '__VK_TAXONOMY_AUTO__') {
			const postInfo = state[postId];
			if (!postInfo || !postInfo[taxonomy]?.value) {
				return {
					value: null,
					isLoading: true,
				};
			}

			return postInfo[taxonomy];
		},
	},

	resolvers: {
		/**
		 * Fetches and sets term color information for a post, with an optional specified taxonomy.
		 * If no taxonomy is provided, one is automatically selected.
		 *
		 * @param {number} postId                            Post ID for retrieving term color information.
		 * @param {string} [taxonomy='__VK_TAXONOMY_AUTO__'] Optional taxonomy name.
		 * @return {Function} Thunk action for updating store with term color information and loading state.
		 */

		getTermColorInfo(postId, taxonomy = '__VK_TAXONOMY_AUTO__') {
			return async ({ dispatch }) => {
				const fetchData = { post_id: postId };

				if ('__VK_TAXONOMY_AUTO__' !== taxonomy) {
					fetchData.taxonomy = taxonomy;
				}
				dispatch.setIsLoading({
					postId,
					taxonomy,
					isLoading: true,
				});
				const termColorInfo = await apiFetch({
					path: 'vk-blocks/v1/get_post_single_term_info',
					method: 'POST',
					data: fetchData,
				});

				const payload = {
					postId,
					taxonomy,
					value: termColorInfo,
				};
				dispatch.setTermColor(payload);
				dispatch.setIsLoading({
					postId,
					taxonomy,
					isLoading: false,
				});
			};
		},
	},
});

register(store);
