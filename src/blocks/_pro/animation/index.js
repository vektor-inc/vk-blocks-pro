/**
 * Animation block
 *
 */
import { ReactComponent as Icon } from './icon.svg';
import metadata from './block.json';
import edit from './edit';
import save from './save';
import deprecatedHooks from './deprecated/hooks';
import deprecated from './deprecated/save';
import createWrapUnwrapTransforms from '@vkblocks/utils/wrap-unwrap';

import { addFilter } from '@wordpress/hooks';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: <Icon />,
	transforms: createWrapUnwrapTransforms('vk-blocks/animation'),
	edit,
	save,
	deprecated,
};

/**
 * 	表示領域に入ったら、アニメーションエフェクトを適用させるフィルター。
 *  0.49.8で、jSをfooterに出力するよう構造変更。
 *
 * @param {*} el
 * @param {*} type
 * @param {*} attributes
 */
const addAnimationActiveClass = (el, type, attributes) => {
	if ('vk-blocks/animation' === type.name) {
		// 現在実行されている deprecated 内の save 関数の index を取得
		const deprecatedFuncIndex = deprecated.findIndex(
			(item) => item.save === type.save
		);

		// 最新版
		if (-1 === deprecatedFuncIndex) {
			return el;
		}

		// deprecatedFuncIndex が予期せぬ数値の場合も考慮して、エラーハンドリングを強化
		if (
			deprecatedFuncIndex >= 0 &&
			deprecatedFuncIndex < deprecatedHooks.length &&
			deprecatedHooks[deprecatedFuncIndex]
		) {
			return el;
		}

		// 後方互換
		const DeprecatedHook = deprecatedHooks[deprecatedFuncIndex];
		return <DeprecatedHook el={el} attributes={attributes} />;
	}
	// Slider以外のブロック
	return el;
};

addFilter(
	'blocks.getSaveElement',
	'vk-blocks/animation',
	addAnimationActiveClass,
	11
);
