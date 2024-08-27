/**
 * グラデーションCSSか否かを判定する関数
 */

export const isGradientStyle = (str) => {
	return str.match(/^(.+)-gradient/);
};
