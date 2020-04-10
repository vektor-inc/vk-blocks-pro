/**
 * Th block
 */
import React from "react";
import {schema} from './schema';

const {__} = wp.i18n; // Import __() from wp.i18n
const {registerBlockType} = wp.blocks; // Import registerBlockType() from wp.blocks
const {Fragment} = wp.element;
const {InspectorControls, RichText} = wp.blockEditor && wp.blockEditor.BlockEdit ? wp.blockEditor : wp.editor;
const {PanelBody, CheckboxControl} = wp.components;
const BlockIcon = (
	<svg xmlns="http://www.w3.org/2000/svg" width="576" height="512" viewBox="0 0 576 512">
	<path d="M512.4,80.3H63.6c-24.8,0-44.9,20.1-44.9,44.9v262.7c0,24.8,20.1,44.9,44.9,44.9h448.9c24.8,0,44.9-20.1,44.9-44.9V125.1
		C557.3,100.4,537.2,80.3,512.4,80.3z M512.4,135.1v37h-202v-37H512.4z M310.4,237.1h202V275h-202V237.1z M265.6,285h-202v-57.9h202
		V285z M265.6,125.1v57h-202v-57H265.6z M63.6,387.9v-58h202v58H63.6z M310.4,377.9v-38h202v38H310.4z"/>
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
registerBlockType('vk-blocks/th', {
    // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
    title: __('Th', 'vk-blocks'), // Block title.
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
    edit({attributes, setAttributes, className}) {
        const {
            content,
            textOverflow
        } = attributes;

        className = className + ' vk_th_content wp-block-table__cell-content';
        if (textOverflow) {
            className = className + ' vk_table-col-overflow';
        }
        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody title={__('Text Overflow Setting', 'vk-blocks')}>
                        <CheckboxControl
                            label={__('ON', 'vk-blocks')}
                            checked={textOverflow}
                            onChange={(checked) => setAttributes({textOverflow: checked})}
                        />
                    </PanelBody>
                </InspectorControls>

                <th><RichText
                    tagName="div"
                    className={className}
                    onChange={(value) => setAttributes({content: value})}
                    value={content}
                    // placeholder={__('Please enter content', 'vk-blocks')}
                /></th>
            </Fragment>
        );
    },

    /**
     * The save function define className }> which the different attributes should be combined
     * into the final markup, which is then serialized by Gutenberg into post_content.
     *
     * The "save" property must be specified and must be a valid function.
     *
     * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
     */
    save({attributes}) {
        const {
            content,
            textOverflow
        } = attributes;


        let containerClass = 'vk_th_content wp-block-table__cell-content';
        if (textOverflow) {
            containerClass = containerClass + ' vk_table-col-overflow';
        }

        return (<th><RichText.Content
            tagName="div"
            className={containerClass}
            value={content}
        /></th>);
    },

    //Please comment out, when you need to use deprecated.
    // deprecated:deprecated
});
