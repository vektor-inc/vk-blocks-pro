/**
 * Fixed Display block
 *
 */
import { ReactComponent as Icon } from './icon.svg';
import metadata from './block.json';
import edit from './edit';
import save from './save';
import deprecated from './deprecated';

import { addFilter } from '@wordpress/hooks';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: <Icon />,
	category: 'vk-blocks-cat',
	edit,
	save,
	deprecated,
};

/**
 * 表示領域に入った時に適用させるフィルター
 *
 * @param {*} el
 * @param {*} type
 */
const addFixedDisplayVisible = (el, type) => {
	// `Fixed Display`ブロックの場合に特定の処理を行う
	if ('vk-blocks/fixed-display' === type.name) {
		// ここに特定のクラスを追加する処理などを記述
	}
	return el;
};

addFilter(
	'blocks.getSaveElement',
	'vk-blocks/fixed-display',
	addFixedDisplayVisible,
	11
);
