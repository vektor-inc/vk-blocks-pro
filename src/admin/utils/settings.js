/**
 * Internal dependencies
 */
/*globals vkBlocksObject */

// HighlightやHighlighterはテーマのカラーパレットが表示されるのでthemeがあったらthemeそれ以外はdefault+vkColorPalette
export const vkColorPalette = vkBlocksObject.colorPalette.theme
	? vkBlocksObject.colorPalette.theme
	: vkBlocksObject.colorPalette.default;
