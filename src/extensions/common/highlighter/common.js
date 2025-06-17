/**
 * WordPress dependencies
 */
import { applyFormat } from '@wordpress/rich-text';
import hex2rgba from '@vkblocks/utils/hex-to-rgba';

export const name = 'vk-blocks/highlighter';
export const alpha = 0.7;
export const defaultColor = '#fffd6b';

// 色が指定されていなかったらデフォルトカラーを指定する
export const setColorIfUndefined = (color) => {
	if (color === undefined) {
		color = defaultColor;
	}
	return color;
};

//ハイライトカラーが選択されたら
export const highlighterOnApply = ({ color, value, onChange }) => {
	color = setColorIfUndefined(color);
	const style = `--vk-highlighter-color: ${hex2rgba(color, alpha)};`;

	onChange(
		applyFormat(value, {
			type: name,
			attributes: {
				data: color,
				style,
			},
		})
	);
};
