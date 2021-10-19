// @wordpress/block-editor から必要なものをインポート
import {
	ColorPalette,
	getColorObjectByColorValue,
} from '@wordpress/block-editor';
import { colorSlugToColorCode } from '@vkblocks/utils/color-slug-to-color-code';

// @wordpress/data から必要なものをインポート
import { select } from '@wordpress/data';

export const AdvancedColorPalette = (props) => {
	const { schema, setAttributes, attributes } = props;
	const hexColor = colorSlugToColorCode(attributes[schema]);

	return (
		<ColorPalette
			value={hexColor}
			onChange={(value) => {
				// カラーパレットの色名・スラッグ・カラーコードを取得
				const colorSet =
					select('core/editor').getEditorSettings().colors;

				// titleColor の色コードを colorSet から探して色データを取得
				const ColorValue = getColorObjectByColorValue(colorSet, value);

				if (ColorValue) {
					setAttributes({ [schema]: ColorValue.slug });
				} else {
					setAttributes({ [schema]: value });
				}
			}}
		/>
	);
};
