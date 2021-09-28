/**
 * カラーコードか否かを判定する関数
 */

export const isHexColor = (color) => {
	return color
		? color.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/) !== null
		: false;
};
