/**
 * カラーコードか否かを判定する関数
 */

export const isHexColor = (color) => {
	let isHex = false;
	if (
		color &&
		color.match(/^#([A-Fa-f0-9]{8}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/) !==
			null
	) {
		isHex = true;
	}
	return isHex;
};
