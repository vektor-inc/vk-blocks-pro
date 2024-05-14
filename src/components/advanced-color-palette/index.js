// @wordpress/block-editor から必要なものをインポート
import {
	ColorPalette,
	getColorObjectByColorValue,
} from '@wordpress/block-editor';
import { colorSlugToColorCode } from '@vkblocks/utils/color-slug-to-color-code';
// @wordpress/data から必要なものをインポート
import { select } from '@wordpress/data';

export const AdvancedColorPalette = (props) => {
	const { schema, setAttributes, attributes, enableAlpha = true } = props;
	const hexColor = colorSlugToColorCode(attributes[schema]);
	return (
		<ColorPalette
			value={hexColor}
			enableAlpha={enableAlpha}
			onChange={(value) => {
				// カラーパレットの色名・スラッグ・カラーコードを取得
				const colorSet =
					select('core/block-editor').getSettings().colors;

				// 色コードを colorSet から探して色データを取得
				// カスタムカラーの場合 undefined が返る
				// パレットのあるカラーの場合 オブジェクトで color / name / slug が返る（ console.dir(ColorValue) ）
				const ColorValue = getColorObjectByColorValue(colorSet, value);

				if (ColorValue !== undefined) {
					setAttributes({ [schema]: ColorValue.slug });
				} else {
					setAttributes({ [schema]: value });
				}
			}}
		/>
	);
};
