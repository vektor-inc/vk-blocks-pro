/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { AdminContext } from '@vkblocks/admin/index';
import { colorSlugToColorCode } from '@vkblocks/admin/utils/color-slug-to-color-code';
import hex2rgba from '@vkblocks/utils/hex-to-rgba';
/*globals vkBlocksObject */

export const TextStylePreview = (props) => {
	const { vkBlocksOption } = useContext(AdminContext);
	const { i } = props;

	let highlighterColor;
	if (!!vkBlocksOption.text_style_lists[i].highlighter) {
		highlighterColor = vkBlocksOption.text_style_lists[i].highlighter;
	} else {
		highlighterColor = vkBlocksObject.highlighterColor;
	}

	let backgroundProperty = '';
	if (
		vkBlocksOption.text_style_lists[i].is_active_highlighter &&
		!!vkBlocksOption.text_style_lists[i].background_color
	) {
		// background_colorとhighlighter両方
		backgroundProperty = `linear-gradient(${colorSlugToColorCode(
			vkBlocksOption.text_style_lists[i].background_color
		)} 60%,${hex2rgba(highlighterColor, 0.7)} 0)`;
	} else if (
		!vkBlocksOption.text_style_lists[i].is_active_highlighter &&
		!!vkBlocksOption.text_style_lists[i].background_color
	) {
		// background_colorのみ
		backgroundProperty = `${colorSlugToColorCode(
			vkBlocksOption.text_style_lists[i].background_color
		)}`;
	} else if (
		vkBlocksOption.text_style_lists[i].is_active_highlighter &&
		!!!vkBlocksOption.text_style_lists[i].background_color
	) {
		// highlighterのみ
		backgroundProperty = `linear-gradient(transparent 60%,${hex2rgba(
			highlighterColor,
			0.7
		)} 0)`;
	}

	return (
		<div className="text_style_item_preview">
			<p
				className={
					vkBlocksOption.text_style_lists[i].title
						? 'active-text-style'
						: null
				}
			>
				<span
					className={vkBlocksOption.text_style_lists[i].class_name}
					style={{
						fontWeight:
							vkBlocksOption.text_style_lists[i].font_weight_bold &&
							'bold',
						fontStyle:
							vkBlocksOption.text_style_lists[i].font_italic &&
							'italic',
						textDecoration:
							vkBlocksOption.text_style_lists[i].font_strikethrough &&
							'line-through',
						whiteSpace:
							vkBlocksOption.text_style_lists[i].nowrap && 'nowrap',
						fontSize:
							vkBlocksOption.text_style_lists[i].font_size &&
							vkBlocksOption.text_style_lists[i].font_size,
						color:
							!!vkBlocksOption.text_style_lists[i].color &&
							colorSlugToColorCode(
								vkBlocksOption.text_style_lists[i].color
							),
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
