/**
 * 文字列から正規表現でHTMLタグを除去する
 *
 * @param {string} html The string containing html.
 *
 * @return {string} The text content with any html removed.
 */
export const stripHTML = (html) => {
	return html.replace(/(<([^>]+)>)/gi, '');
};
