/**
 * Buton Outer Block
 */

// コアのコンポーネントを読み込み
import { registerBlockType } from '@wordpress/blocks';

// 各種ファイルを読み込み
import metadata from './block.json';
import { ReactComponent as Icon } from './icon.svg';
import edit from './edit';
import save from './save';
import deprecated from './deprecated/';

registerBlockType(metadata.name, {
	...metadata,
	icon: <Icon />,
	edit,
	save,
	deprecated,
});
