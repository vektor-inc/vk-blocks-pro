/**
 * WP API は基本的に一度のリクエストで100件までしかデータが取得できないので上限を設定
 * https://twitter.com/Toro_Unit/status/1486728890311921664
 */
export const MAX_FETCHED_TERMS = 100;
export const DEFAULTS_POSTS_PER_PAGE = 3;

export default {
	MAX_FETCHED_TERMS,
	DEFAULTS_POSTS_PER_PAGE,
};
