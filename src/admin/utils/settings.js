/**
 * Internal dependencies
 */
/*globals vkBlocksObject */

// HighlightやHighlighterはテーマのカラーパレットが表示されるのでthemeがあったらthemeそれ以外はdefault+vkColorPalette
export const colorPalette = vkBlocksObject.colorPalette.theme
	? vkBlocksObject.colorPalette.theme
	: [
			...vkBlocksObject.colorPalette.default,
			...vkBlocksObject.vkColorPalette,
	  ];
