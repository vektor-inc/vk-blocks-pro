/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { colorSlugToColorCode } from '@vkblocks/admin/utils/color-slug-to-color-code';
import hex2rgba from '@vkblocks/utils/hex-to-rgba';
/*globals vkBlocksObject */

export const TextStylePreview = (props) => {
	const { textStyleListObj } = props;

	let highlighterColor;
	if (!!textStyleListObj.highlighter) {
		highlighterColor = textStyleListObj.highlighter;
	} else {
		highlighterColor = vkBlocksObject.highlighterColor;
	}

	let backgroundProperty = '';
	if (
		textStyleListObj.is_active_highlighter &&
		!!textStyleListObj.background_color
	) {
		// background_colorとhighlighter両方
		backgroundProperty = `linear-gradient(${colorSlugToColorCode(
			textStyleListObj.background_color
		)} 60%,${hex2rgba(highlighterColor, 0.7)} 0)`;
	} else if (
		!textStyleListObj.is_active_highlighter &&
		!!textStyleListObj.background_color
	) {
		// background_colorのみ
		backgroundProperty = `${colorSlugToColorCode(
			textStyleListObj.background_color
		)}`;
	} else if (
		textStyleListObj.is_active_highlighter &&
		!!!textStyleListObj.background_color
	) {
		// highlighterのみ
		backgroundProperty = `linear-gradient(transparent 60%,${hex2rgba(
			highlighterColor,
			0.7
		)} 0)`;
	}

	return (
		<div className="custom_format_item_preview">
			<p
				className={
					textStyleListObj.title ? 'active-custom-format' : null
				}
			>
				<span
					className={textStyleListObj.class_name}
					style={{
						fontWeight: textStyleListObj.font_weight_bold && 'bold',
						fontStyle: textStyleListObj.font_italic && 'italic',
						textDecoration:
							textStyleListObj.font_strikethrough &&
							'line-through',
						whiteSpace: textStyleListObj.nowrap && 'nowrap',
						fontSize:
							textStyleListObj.font_size &&
							textStyleListObj.font_size,
						color:
							!!textStyleListObj.color &&
							colorSlugToColorCode(textStyleListObj.color),
						background: backgroundProperty,
					}}
				>
					{__(
						'プレビューテキスト',
						// 'Preview Text',
						'vk-blocks'
					)}
				</span>
			</p>
		</div>
	);
};
