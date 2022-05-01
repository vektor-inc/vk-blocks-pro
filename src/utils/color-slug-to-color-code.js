/**
 * カラーの名前からカラーコードを取得する関数
 */
// @wordpress/block-editor から必要なものをインポート
import { getColorObjectByAttributeValues } from '@wordpress/block-editor';

// @wordpress/data から必要なものをインポート
import { select } from '@wordpress/data';

export const colorSlugToColorCode = (color) => {
	let colorCode;
	if (color) {
		// カラーパレットの色名・スラッグ・カラーコードを取得
		const colorSet = select('core/block-editor').getSettings().colors;

		// titleColor の色コードを colorSet から探して色データを取得
		const ColorValue = getColorObjectByAttributeValues(colorSet, color);

		if (ColorValue.color !== undefined) {
			colorCode = ColorValue.color;
		} else {
			colorCode = color;
		}
	}
	return colorCode;
};
