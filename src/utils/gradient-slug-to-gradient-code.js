/**
 * カラーの名前からカラーコードを取得する関数
 */
// @wordpress/block-editor から必要なものをインポート
import { getGradientValueBySlug } from '@wordpress/block-editor';

// @wordpress/data から必要なものをインポート
import { select } from '@wordpress/data';

export const gradientSlugToGradientCode = (color) => {
	let gradientCode;
	if (color) {
		// カラーパレットの色名・スラッグ・カラーコードを取得
		const gradientSet = select('core/block-editor').getSettings().gradients;

		// titleColor の色コードを colorSet から探して色データを取得
		const gradientValue = getGradientValueBySlug(gradientSet, color);

		if (gradientValue !== undefined) {
			gradientCode = gradientValue;
		} else {
			gradientCode = color;
		}
	}
	return gradientCode;
};
