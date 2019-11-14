/**
 * timeline block type
 *
 */
import {Component} from "./component";
import {schema} from './schema';

const {__} = wp.i18n; // Import __() from wp.i18n
const {registerBlockType} = wp.blocks; // Import registerBlockType() from wp.blocks
const {RangeControl, RadioControl, PanelBody, Button, PanelColor, BaseControl} = wp.components;
const {Fragment} = wp.element;
const {RichText, InspectorControls, MediaUpload, ColorPalette} = wp.editor;
const BlockIcon = (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
<path d="M105.8,101.3V27c0-13.9-11.2-25.1-25.1-25.1S55.6,13.1,55.6,27v74.4c7.5-3.7,16.1-5.8,25.1-5.8
    C89.6,95.5,98.2,97.6,105.8,101.3z"/>
<path d="M80.7,418.4c-8.7,0-17.4-2.1-25.1-5.9v74.5c0,13.9,11.2,25.1,25.1,25.1s25.1-11.2,25.1-25.1v-74.3c-3,1.5-6.2,2.8-9.5,3.7
    C91,417.6,85.8,418.4,80.7,418.4z"/>
<path d="M105.8,310.5V203.1c-2.8,1.4-5.8,2.6-8.9,3.5c-5,1.6-10.4,2.4-16.1,2.4c-8.7,0-17.3-2-25.2-5.9v107.4
    c7.5-3.7,16.1-5.8,25.1-5.8C89.6,304.8,98.2,306.8,105.8,310.5z"/>
<path d="M131.2,335.5c-5.7-11.1-14.7-19.8-25.4-25c-7.6-3.7-16.2-5.8-25.1-5.8c-9,0-17.6,2.1-25.1,5.8c-18.8,9.3-31.7,28.6-31.7,51
    c0,21.1,11.6,40.4,30.3,50.2c0.5,0.2,0.9,0.5,1.4,0.7c7.7,3.8,16.4,5.9,25.1,5.9c5.1,0,10.3-0.7,15.6-2.1c3.3-0.9,6.5-2.2,9.5-3.7
    c14.2-7,25.1-19.8,29.5-35.2c1.5-5.1,2.2-10.4,2.2-15.7C137.5,352.6,135.3,343.6,131.2,335.5z M105.8,378.5
    c-5.5,7.4-14.4,12.2-24.2,12.2c-11,0-20.8-6-26-15c-2.6-4.4-4.1-9.6-4.1-15.2c0-5.5,1.5-10.6,4.1-15.2c5.2-8.9,15-15,26-15
    c9.8,0,18.7,4.8,24.2,12.2c3.7,5,5.9,11.2,5.9,17.9C111.7,367.3,109.5,373.5,105.8,378.5z"/>
<path d="M131.2,126.3c-5.7-11.1-14.7-19.8-25.4-25c-7.6-3.7-16.2-5.8-25.1-5.8c-9,0-17.6,2.1-25.1,5.8c-18.8,9.3-31.7,28.6-31.7,51
    c0,21.4,11.8,40.8,31,50.6c0.2,0.1,0.5,0.2,0.7,0.3c7.9,3.9,16.5,5.9,25.2,5.9c5.6,0,11-0.8,16.1-2.4c3.1-0.9,6.1-2.1,8.9-3.5
    c14.2-6.9,24.9-19.5,29.4-35c1.5-5.1,2.3-10.4,2.3-15.9C137.5,143.2,135.4,134.5,131.2,126.3z M105.8,168.9
    c-5.4,8-14.7,13.3-25,13.3c-10.5,0-19.8-5.4-25.2-13.7c-3.1-4.7-4.9-10.3-4.9-16.5c0-6.1,1.8-11.7,4.9-16.5
    C61,127.5,70.3,122,80.8,122c10.3,0,19.6,5.3,25,13.3c3.2,4.8,5.1,10.5,5.1,16.8S109,164.2,105.8,168.9z"/>
<polygon points="154.6,159.3 230.3,221.8 252.1,171.6 "/>
<g>
    <path d="M395.3,78.6c-98.4,0-178.4,80-178.4,178.4c0,98.4,80,178.4,178.4,178.4s178.4-80,178.4-178.4
        C573.7,158.6,493.6,78.6,395.3,78.6z M395.3,392.9c-75,0-135.9-61-135.9-135.9c0-75,61-135.9,135.9-135.9S531.2,182,531.2,257
        C531.2,332,470.2,392.9,395.3,392.9z"/>
    <path d="M397,159.3c-8.9,0-16.2,7.2-16.2,16.2v73.2l-51.6,51.6c-6.3,6.3-6.3,16.5,0,22.9c6.3,6.3,16.5,6.3,22.9,0l61.1-61.1v-16.6
        v-70C413.1,166.5,405.9,159.3,397,159.3z"/>
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
registerBlockType('vk-blocks/timeline', {
    // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
    title: __('timeline', 'vk-blocks'), // Block title.
    icon: BlockIcon, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
    category: 'vk-blocks-cat', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
    attributes: schema,

    /**
     * The edit function describes the structure of your block in the context of the editor.
     * This represents what the editor will render when the block is used.
     *
     * The "edit" property must be a valid function.
     *
     * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
     */
    edit({attributes, setAttributes, className}) {

        return (
            <Fragment>
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
     * The save function define className }> which the different attributes should be combined
     * into the final markup, which is then serialized by Gutenberg into post_content.
     *
     * The "save" property must be specified and must be a valid function.
     *
     * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
     */
    save({attributes, className}) {
        return <Component attributes={attributes} className={className} for_={"save"}/>;
    },

    //Please comment out, when you need to use deprecated.
    // deprecated:deprecated
});
