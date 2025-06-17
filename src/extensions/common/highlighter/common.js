/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { applyFormat, getActiveFormat } from '@wordpress/rich-text';
import hex2rgba from '@vkblocks/utils/hex-to-rgba';

export const name = 'vk-blocks/highlighter';
export const alpha = 0.7;
export const defaultColor = '#fffd6b';

export const highlighColor = {
	title: __('Highlighter', 'vk-blocks-pro'),
	tagName: 'span',
	className: 'vk_highlighter',
	attributes: {
		data: 'data-color',
		style: 'style',
	},
};

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

export function getActiveColors(value, name) {
	const activeColorFormat = getActiveFormat(value, name);

	if (!activeColorFormat) {
		return undefined;
	}

	return activeColorFormat.attributes.data;
}
