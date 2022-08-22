/**
 * WordPress dependencies
 */
import { getColorObjectByAttributeValues } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { vkColorPalette } from '@vkblocks/admin/utils/settings';

export const colorSlugToColorCode = (color) => {
	let colorCode;
	if (color) {
		const ColorValue = getColorObjectByAttributeValues(
			vkColorPalette,
			color
		);
		if (ColorValue.color !== undefined) {
			colorCode = ColorValue.color;
		} else {
			colorCode = color;
		}
	}
	return colorCode;
};
