/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { isURL, getProtocol, isValidProtocol } from '@wordpress/url';

/**
 * A simple in-memory cache for requests.
 * This avoids repeat HTTP requests which may be beneficial
 * for those wishing to preserve low-bandwidth.
 */
const CACHE = new Map();

/**
 * @typedef WPRemoteUrlData
 *
 * @property {string} title contents of the remote URL's `<title>` tag.
 */

/**
 * Fetches data about a remote URL.
 * eg: <title> tag, favicon...etc.
 *
 * @async
 * @param {string}  url     the URL to request details from.
 * @param {Object?} options any options to pass to the underlying fetch.
 * @return {Promise< WPRemoteUrlData[] >} Remote URL data.
 */
const fetchUrlData = async (url, options = { clearCache: false }) => {
	const endpoint = 'vk-blocks/v1/blog_card_data/';

	if (!isURL(url)) {
		return Promise.reject(`${url} is not a valid URL.`);
	}

	// Test for "http" based URL as it is possible for valid
	// yet unusable URLs such as `tel:123456` to be passed.
	const protocol = getProtocol(url);

	if (
		!protocol ||
		!isValidProtocol(protocol) ||
		!protocol.startsWith('http') ||
		!/^https?:\/\/[^\/\s]/i.test(url)
	) {
		return Promise.reject(
			`${url} does not have a valid protocol. URLs must be "http" based`
		);
	}

	if (CACHE.has(url) && !options.clearCache) {
		return CACHE.get(url);
	}

	return apiFetch({
		path: endpoint,
		method: 'POST',
		data: {
			url,
			clearCache: options.clearCache,
		},
		// ...options,
	}).then((res) => {
		CACHE.set(url, res);
		return res;
	});
};

export default fetchUrlData;
