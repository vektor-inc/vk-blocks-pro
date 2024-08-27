/**
 * NOTE: このファイルは、use-rich-url-data.jsのコピーです。
 * https://github.com/WordPress/gutenberg/blob/d5915916abc45e6682f4bdb70888aa41e98aa395/packages/block-editor/src/components/link-control/use-rich-url-data.js
 */

import fetchUrlData from './fetch-url-data';

/**
 * WordPress dependencies
 */
import { useEffect, useReducer } from '@wordpress/element';

function reducer(state, action) {
	switch (action.type) {
		case 'RESOLVED':
			return {
				...state,
				isFetching: false,
				richData: action.richData,
			};
		case 'ERROR':
			return {
				...state,
				isFetching: false,
				richData: null,
			};
		case 'LOADING':
			return {
				...state,
				isFetching: true,
			};
		default:
			throw new Error(`Unexpected action type ${action.type}`);
	}
}

function useRemoteUrlData(url, clearCache = false) {
	const [state, dispatch] = useReducer(reducer, {
		richData: null,
		isFetching: false,
	});

	const fetchRichUrlData = fetchUrlData;

	useEffect(() => {
		// Only make the request if we have an actual URL
		// and the fetching util is available. In some editors
		// there may not be such a util.
		if (
			url?.length &&
			fetchRichUrlData &&
			typeof AbortController !== 'undefined'
		) {
			dispatch({
				type: 'LOADING',
			});

			const controller = new window.AbortController();

			const signal = controller.signal;

			fetchRichUrlData(url, {
				signal,
			})
				.then((urlData) => {
					dispatch({
						type: 'RESOLVED',
						richData: urlData,
					});
				})
				.catch(() => {
					// Avoid setting state on unmounted component
					if (!signal.aborted) {
						dispatch({
							type: 'ERROR',
						});
					}
				});

			// Cleanup: when the URL changes the abort the current request.
			return () => {
				controller.abort();
			};
		}
	}, [url, clearCache]);

	return state;
}

export default useRemoteUrlData;
