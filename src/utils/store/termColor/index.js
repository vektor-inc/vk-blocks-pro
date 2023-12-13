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
	setIsLoading(payload) {
		return {
			type: 'SET_IS_LOADING',
			...payload,
		};
	},
};

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
							// 既存のloading値を継承するか、存在しなければfalseを設定
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

	actions,

	selectors: {
		getTermColorInfoByPost(
			state,
			postId,
			taxonomy = '__VK_TAXONOMY_AUTO__'
		) {
			// postIdに対応するデータが存在しない場合はnullを返す
			const postInfo = state[postId];
			if (!postInfo || !postInfo[taxonomy]?.value) {
				return {
					value: null,
					isLoading: true,
				};
			}

			// 指定されたtaxonomyに対応する情報を返す
			return postInfo[taxonomy];
		},
	},

	resolvers: {
		getTermColorInfoByPost(postId, taxonomy = '__VK_TAXONOMY_AUTO__') {
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
