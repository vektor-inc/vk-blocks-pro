/**
 * Table block type
 */
import React from "react";
import { schema } from './schema';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
import { vkbBlockEditor } from "./../_helper/depModules";
const { RichText } = vkbBlockEditor;
const BlockIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="576" height="512" viewBox="0 0 576 512">
        <path d="M63.6,432.7h448.9c24.8,0,44.9-20.1,44.9-44.9V125.1c0-24.8-20.1-44.9-44.9-44.9H63.6c-24.8,0-44.9,20.1-44.9,44.9v262.7
		C18.7,412.6,38.8,432.7,63.6,432.7z M63.6,377.9v-37h202v37H63.6z M265.6,275.9h-202V238h202V275.9z M310.4,228h202v57.9h-202V228z
		 M310.4,387.9v-57h202v57H310.4z M512.4,125.1v58h-202v-58H512.4z M265.6,135.1v38h-202v-38H265.6z"/>
    </svg>
);

/**
 * Register: a Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType('vk-blocks/td', {
    // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
    title: __('Td', 'vk-blocks'), // Block title.
    icon: BlockIcon, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
    category: 'vk-blocks-cat', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
    attributes: schema,
    supports: {
        inserter: false,
    },

    /**
     * The edit function describes the structure of your block in the context of the editor.
     * This represents what the editor will render when the block is used.
     *
     * The "edit" property must be a valid function.
     *
     * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
     */
    edit({ attributes, setAttributes }) {
        const {
            content
        } = attributes;

        return (<td><RichText
            tagName="div"
            className={'vk_td_content wp-block-table__cell-content'}
            onChange={(value) => setAttributes({ content: value })}
            value={content}
        // placeholder={__('Please enter content', 'vk-blocks')}
        /></td>);
    },

    /**
     * The save function define className }> which the different attributes should be combined
     * into the final markup, which is then serialized by Gutenberg into post_content.
     *
     * The "save" property must be specified and must be a valid function.
     *
     * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
     */
    save({ attributes }) {
        const {
            content
        } = attributes;
        return (<td><RichText.Content
            tagName="div"
            className={'vk_td_content wp-block-table__cell-content'}
            value={content}
        /></td>);
    },

    //Please comment out, when you need to use deprecated.
    // deprecated:deprecated
});
