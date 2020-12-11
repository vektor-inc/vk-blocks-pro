/**
 * staff block type
 *
 */

// WordPress  dependencies
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

// Internal dependencies
import { schema, example } from './schema';
import { ReactComponent as Icon } from './icon.svg';
import edit from './edit';
import save from './save';

registerBlockType('vk-blocks/staff', {
    title: __('Staff', 'vk-blocks'),
    icon: <Icon/>,
    category: 'vk-blocks-cat',
	attributes: schema,
	example,
	edit,
	save,
});
