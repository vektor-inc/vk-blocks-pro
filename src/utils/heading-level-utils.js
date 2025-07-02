/**
 * 見出しレベル設定に関する共通ユーティリティ関数
 */

/**
 * 最大レベルに基づいて見出しレベル配列を生成する
 *
 * @param {string} maxLevel - 最大レベル（'h2', 'h3', 'h4', 'h5', 'h6'）
 * @return {Array} 見出しレベル配列（例：['h2', 'h3', 'h4']）
 */
export const generateHeadingLevels = (maxLevel) => {
	const levels = ['h2'];
	const levelNumbers = ['h2', 'h3', 'h4', 'h5', 'h6'];
	const maxIndex = levelNumbers.indexOf(maxLevel);

	if (maxIndex !== -1) {
		levels.push(...levelNumbers.slice(1, maxIndex + 1));
	}

	return levels;
};

/**
 * 現在の見出しレベル配列から最大レベルを取得する
 *
 * @param {Array} currentLevels - 現在の見出しレベル配列
 * @return {string} 最大レベル（デフォルト：'h6'）
 */
export const getCurrentMaxLevel = (currentLevels) => {
	if (!currentLevels || currentLevels.length === 0) {
		return 'h6';
	}
	const maxLevel = currentLevels[currentLevels.length - 1];
	return maxLevel || 'h6';
};
