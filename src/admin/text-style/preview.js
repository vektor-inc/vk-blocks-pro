/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { AdminContext } from '@vkblocks/admin/index';
import { colorSlugToColorCode } from '@vkblocks/admin/utils/color-slug-to-color-code';
import hex2rgba from '@vkblocks/utils/hex-to-rgba';

export default function TextStylePreview(props) {
	const { vkBlocksOption } = useContext(AdminContext);
	const { i } = props;

	let backgroundProperty = '';
	if (
		!!vkBlocksOption.text_style[i].background_color &&
		!!vkBlocksOption.text_style[i].highlighter
	) {
		// background_colorとhighlighter両方ある時
		backgroundProperty = `linear-gradient(${colorSlugToColorCode(
			vkBlocksOption.text_style[i].background_color
		)} 60%,${hex2rgba(vkBlocksOption.text_style[i].highlighter, 0.7)} 0)`;
	} else if (
		!!vkBlocksOption.text_style[i].background_color &&
		!!!vkBlocksOption.text_style[i].highlighter
	) {
		// background_colorのみある時
		backgroundProperty = `${colorSlugToColorCode(
			vkBlocksOption.text_style[i].background_color
		)}`;
	} else if (
		!!!vkBlocksOption.text_style[i].background_color &&
		!!vkBlocksOption.text_style[i].highlighter
	) {
		// highlighterのみある時
		backgroundProperty = `linear-gradient(transparent 60%,${hex2rgba(
			vkBlocksOption.text_style[i].highlighter,
			0.7
		)} 0)`;
	}

	return (
		<div className="text_style_item_preview">
			<p>
				<span
					className={`vk-text-style--${i}`}
					style={{
						fontWeight:
							vkBlocksOption.text_style[i].font_weight_bold &&
							'bold',
						fontStyle:
							vkBlocksOption.text_style[i].font_italic &&
							'italic',
						textDecoration:
							vkBlocksOption.text_style[i].font_strikethrough &&
							'line-through',
						whiteSpace:
							vkBlocksOption.text_style[i].nowrap && 'nowrap',
						fontSize:
							vkBlocksOption.text_style[i].font_size &&
							vkBlocksOption.text_style[i].font_size,
						color:
							!!vkBlocksOption.text_style[i].color &&
							colorSlugToColorCode(
								vkBlocksOption.text_style[i].color
							),
						background: backgroundProperty,
					}}
				>
					{sprintf(
						/* translators: %s: number of i. */
						__('Preview Text %s'),
						i
					)}
				</span>
			</p>
		</div>
	);
}
