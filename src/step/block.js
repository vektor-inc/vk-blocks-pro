/**
 * Step block
 *
 */
import {Component} from "./component";
import {schema} from './schema';

const {__} = wp.i18n; // Import __() from wp.i18n
const {registerBlockType} = wp.blocks; // Import registerBlockType() from wp.blocks
const {RangeControl, RadioControl, PanelBody, Button, BaseControl, SelectControl} = wp.components;
const {Fragment} = wp.element;
const {InspectorControls, MediaUpload, ColorPalette} = wp.editor;
const BlockIcon = (
    < svg
xmlns = "http://www.w3.org/2000/svg"
width = "576"
height = "512"
viewBox = "0 0 576 512" >
    < g >
    < path
d = "M288,390.2c74,0,134.2-60.3,134.2-134.2S362,121.8,288,121.8S153.8,182,153.8,256S214,390.2,288,390.2z M288,165.5
c49
.9, 0, 90.5, 40.6, 90.5, 90.5
s - 40.6, 90.5 - 90.5, 90.5
s - 90.5 - 40.6 - 90.5 - 90.5
S238
.1, 165.5, 288, 165.5
z
"/>
< polygon
points = "266.1,333.3 309.9,333.3 309.9,277.9 365.3,277.9 365.3,234.1 309.9,234.1 309.9,178.7 266.1,178.7 266.1,234.1
210.7, 234.1
210.7, 277.9
266.1, 277.9
"/>
< /g>
< path
d = "M529,31H49C22.5,31,1,52.5,1,79v352c0,26.5,21.5,48,48,48h480c26.5,0,48-21.5,48-48V79C577,52.5,555.5,31,529,31z M529,431
H49V79h480V431z
"/>
< /svg>
)
;

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
registerBlockType('vk-blocks/step', {
    // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
    title: __('Step', 'vk-blocks'), // Block title.
    icon: BlockIcon, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
    category: 'vk-blocks-cat-layout', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
    attributes: schema,
    supports: {
        anchor: true,
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
        } = attributes;

        return (
            <Fragment>
                <Component
                    attributes = {attributes}
                    className = {className}
                    for_ = {'edit'}
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
            return (
                <Component
            attributes = {attributes}
            className = {className}
            for_ = {'save'}
            />
        )
    },
});
