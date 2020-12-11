/**
 * staff block type
 *
 */

// WordPress  dependencies
import { __ } from '@wordpress/i18n';
// import { registerBlockType } from '@wordpress/blocks';

// Internal dependencies
import { example } from './schema';
import { ReactComponent as Icon } from './icon.svg';
import edit from './edit';
import save from './save';
import metadata from './block.json';

const { name } = metadata;

export { metadata, name };

export const settings = {
	title: __('Staff', 'vk-blocks'),
	icon: <Icon />,
	example,
	edit,
	save,
};

// registerBlockType('vk-blocks/staff', {
// 	...metadata,
//     title: __('Staff', 'vk-blocks'),
//     icon: <Icon/>,
//     category: 'vk-blocks-cat',
// 	// attributes: schema,
// 	example,
// 	edit,
// 	save,
// });
