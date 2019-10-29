/**
 * Step block
 *
 */
import {Component} from "./component";
import {schema} from "./schema";
import {DefaultColorPalette} from "../_helper/default-color-palette";
import {FontAwesome} from "../_helper/font-awesome";
import React from "react";

const {__} = wp.i18n; // Import __() from wp.i18n
const {registerBlockType} = wp.blocks; // Import registerBlockType() from wp.blocks
const {
    RangeControl,
    RadioControl,
    PanelBody,
    Button,
    BaseControl,
    SelectControl
} = wp.components;
const {Fragment} = wp.element;
const {InspectorControls, MediaUpload, ColorPalette} = wp.editor;
const BlockIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="576"
        height="512"
        viewBox="0 0 576 512"
    >
    <g>
        <rect x="108.8" y="18.7" width="358.5" height="40"/>
        <rect x="108.8" y="453.3" width="358.5" height="40"/>
        <polygon
            points="171.4,253.2 131.4,253.2 131.4,412.6 290.8,412.6 290.8,372.6 199.7,372.6 404.6,167.7 404.6,258.8 444.6,258.8
444.6,99.4 285.2,99.4 285.2,139.4 376.3,139.4 171.4,344.3 	"
        />
    </g>
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
registerBlockType("vk-blocks/step", {
    // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
    title: __("Step", "vk-blocks"), // Block title.
    icon: BlockIcon, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
    category: "vk-blocks-cat", // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
    attributes: schema,
    supports: {
        anchor: true
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
            iconStyle
        } = attributes;
        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody title={__('Icon setting', 'vk-blocks')}>
                        <RadioControl
                            label={__('Icon Style:', 'vk-blocks')}
                            selected={iconStyle}
                            options={[
                                {label: __('Default', 'vk-blocks'), value: 'default'},
                                {label: __('Outlined', 'vk-blocks'), value: 'outlined'},
                            ]}
                            onChange={(value) => setAttributes({iconStyle: value})}
                        />
                        <FontAwesome
                            attributes={attributes}
                            setAttributes={setAttributes}
                        />
                        <DefaultColorPalette
                            attributes={attributes}
                            setAttributes={setAttributes}
                        />
                    </PanelBody>
                </InspectorControls>
                <Component
                    attributes={attributes}
                    className={className}
                    setAttributes={setAttributes}
                    for_={"edit"}
                />
            </Fragment>
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
    save({attributes, className}) {
        return <Component attributes={attributes} className={className} for_={"save"}/>;
    }
});
