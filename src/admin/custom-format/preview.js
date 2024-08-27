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

	const generateCustomFormatCss = () => {
		let declarations = '';
		if (textStyleListObj.font_weight_bold) {
			declarations += `font-weight:bold;`;
		}
		if (textStyleListObj.font_italic) {
			declarations += `font-style:italic;`;
		}
		if (textStyleListObj.font_strikethrough) {
			declarations += `text-decoration:line-through;`;
		}
		if (textStyleListObj.nowrap) {
			declarations += `white-space:nowrap;`;
		}
		if (!!textStyleListObj.font_size) {
			declarations += `font-size: ${textStyleListObj.font_size};`;
		}
		if (!!textStyleListObj.color) {
			declarations += `color: ${colorSlugToColorCode(
				textStyleListObj.color
			)};`;
		}

		const highlighterColor = !!textStyleListObj.highlighter
			? textStyleListObj.highlighter
			: vkBlocksObject.highlighterColor;
		if (
			textStyleListObj.is_active_highlighter &&
			!!textStyleListObj.background_color
		) {
			// background_colorとhighlighter両方
			declarations += `background: linear-gradient(${colorSlugToColorCode(
				textStyleListObj.background_color
			)} 60%,${hex2rgba(highlighterColor, 0.7)} 0)`;
		} else if (
			!textStyleListObj.is_active_highlighter &&
			!!textStyleListObj.background_color
		) {
			// background_colorのみ
			declarations += `background: ${colorSlugToColorCode(
				textStyleListObj.background_color
			)}`;
		} else if (
			textStyleListObj.is_active_highlighter &&
			!!!textStyleListObj.background_color
		) {
			// highlighterのみ
			declarations += `background: linear-gradient(transparent 60%,${hex2rgba(
				highlighterColor,
				0.7
			)} 0)`;
		}

		let dynamic_css = '';
		if (declarations) {
			dynamic_css += `.${textStyleListObj.class_name} { ${declarations} }`;
		}

		if (textStyleListObj.custom_css) {
			// selectorをクラスに変換する
			dynamic_css += textStyleListObj.custom_css.replace(
				/selector/g,
				'.' + textStyleListObj.class_name
			);
		}

		return dynamic_css;
	};

	return (
		<div className="custom_format_item_preview">
			<p
				className={
					textStyleListObj.title ? 'active-custom-format' : null
				}
			>
				{(() => {
					const cssTag = generateCustomFormatCss(textStyleListObj);
					if (cssTag) {
						return <style>{cssTag}</style>;
					}
				})()}
				<span className={textStyleListObj.class_name}>
					{__('Preview Text', 'vk-blocks-pro')}
				</span>
			</p>
		</div>
	);
};
