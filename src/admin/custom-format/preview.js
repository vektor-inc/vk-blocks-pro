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

const getPreviewClassName = (obj) =>
	obj.is_active_highlighter
		? obj.class_name + '--vk-highlighter'
		: obj.class_name;

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
		if (textStyleListObj.is_active_highlighter) {
			declarations += `--vk-highlighter-color: ${hex2rgba(highlighterColor, 0.7)};`;
			declarations += `background: linear-gradient(transparent 60%, var(--vk-highlighter-color) 0);`;
			if (!!textStyleListObj.background_color) {
				declarations += `background-color: ${colorSlugToColorCode(textStyleListObj.background_color)};`;
			}
		} else if (!!textStyleListObj.background_color) {
			declarations += `background: ${colorSlugToColorCode(textStyleListObj.background_color)};`;
		}

		let dynamic_css = '';
		if (declarations) {
			dynamic_css += `.${getPreviewClassName(textStyleListObj)} { ${declarations} }`;
		}

		if (textStyleListObj.custom_css) {
			// selectorをクラスに変換する
			dynamic_css += textStyleListObj.custom_css.replace(
				/selector/g,
				'.' + getPreviewClassName(textStyleListObj)
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
				<span
					className={
						textStyleListObj.is_active_highlighter
							? getPreviewClassName(textStyleListObj)
							: getPreviewClassName(textStyleListObj)
					}
				>
					{__('Preview Text', 'vk-blocks-pro')}
				</span>
			</p>
		</div>
	);
};
