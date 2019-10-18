/**
 * Table block type
 */
import React from "react";
import {Component} from "./component";
import {schema} from './schema';

const {__} = wp.i18n; // Import __() from wp.i18n
const {registerBlockType} = wp.blocks; // Import registerBlockType() from wp.blocks
const BlockIcon = 'arrow-down';
const { select, dispatch } = wp.data;


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
registerBlockType('vk-blocks/tr', {
    // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
    title: __('Tr', 'vk-blocks'), // Block title.
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
    edit({attributes,setAttributes,clientId}) {
        const {
            colNum,
            rowNum,
            innerTag
        } = attributes;

        const rootClientId = select( 'core/editor' ).getBlockRootClientId( clientId );
        let root = select('core/editor').getBlocksByClientId(rootClientId);
        let rootName = root[0].name;
        dispatch('core/editor').updateBlockAttributes(clientId, {innerTag: rootName});

        if(rootName === "vk-blocks/tables"){
            setAttributes({colNum: root[0].attributes.colNum});
        }

        return (<Component
                attributes={attributes}
                for_={'edit'}
            />
        );
    },

    /**
     * The save function defin className }> which the different attributes should be combined
     * into the final markup, which is then serialized by Gutenberg into post_content.
     *
     * The "save" property must be specified and must be a valid function.
     *
     * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
     */
    save({attributes}) {
        return (<Component
                attributes={attributes}
                for_={'save'}/>);
    },

    //Please comment out, when you need to use deprecated.
    // deprecated:deprecated
});
