import { __ } from '@wordpress/i18n';
import {
	__experimentalColorGradientControl as ColorGradientControl,
	getGradientSlugByValue,
	getColorObjectByColorValue,
	useSetting
} from '@wordpress/block-editor';
import { colorSlugToColorCode } from '@vkblocks/utils/color-slug-to-color-code';
import { gradientSlugToGradientCode } from '@vkblocks/utils/gradient-slug-to-gradient-code';
import { select } from '@wordpress/data';


export const AdvancedColorGradientControl = (props) => {
	const {
		colorSchema,
		gradientSchema,
		setAttributes,
		attributes,
		enableAlpha = true,
	} = props;
	const hexColorValue = colorSlugToColorCode(attributes[colorSchema]);
	const gradientValue = gradientSlugToGradientCode(
		attributes[gradientSchema]
	);

	const defaultGradients = useSetting('color.gradients.default');
	const themeGradients = useSetting('color.gradients.theme');
	
	return (
		<ColorGradientControl
			gradients={[
				{
					name:__('Theme', 'vk-blocks-pro'),
					gradients:themeGradients
				},
				{
					name:__('Default', 'vk-blocks-pro'),
					gradients:defaultGradients
				}
			]}
			colorValue={hexColorValue}
			gradientValue={gradientValue ?? undefined}
			onColorChange={(value) => {
				// カラーパレットの色名・スラッグ・カラーコードを取得
				const colorSet =
					select('core/block-editor').getSettings().colors;

				// 色コードを colorSet から探して色データを取得
				// カスタムカラーの場合 undefined が返る
				// パレットのあるカラーの場合 オブジェクトで color / name / slug が返る（ console.dir(ColorValue) ）
				const ColorValue = getColorObjectByColorValue(colorSet, value);

				if (ColorValue !== undefined) {
					setAttributes({ [colorSchema]: ColorValue.slug });
				} else {
					setAttributes({ [colorSchema]: value });
				}
			}}
			onGradientChange={(value) => {
				const gradientSet =
					select('core/block-editor').getSettings().gradients;

				const _gradientValue = getGradientSlugByValue(
					gradientSet,
					value
				);

				if (_gradientValue !== undefined) {
					setAttributes({ [gradientSchema]: _gradientValue });
				} else {
					setAttributes({ [gradientSchema]: value });
				}
			}}
			enableAlpha={enableAlpha}
		/>
	);
};
