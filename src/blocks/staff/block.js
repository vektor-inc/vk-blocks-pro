/**
 * staff block type
 *
 */
import { NewComponent } from "./component";
import { schema, example } from './schema';
// import { vkbBlockEditor } from "./../../utils/depModules";
import { ReactComponent as Icon } from './icon.svg';
import edit from './edit';
import save from './save';


const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
// const { TextControl, PanelBody, BaseControl, SelectControl } = wp.components;
// const { Fragment } = wp.element;
// const { InspectorControls, ColorPalette } = vkbBlockEditor;

registerBlockType('vk-blocks/staff', {
    title: __('Staff', 'vk-blocks'),
    icon: <Icon/>,
    category: 'vk-blocks-cat',
	attributes: schema,
	example,
	edit,
	save,
});
