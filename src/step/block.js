/**
 * step block type
 *
 */
import {Component} from "./component";
import {schema} from './schema';

const {__} = wp.i18n; // Import __() from wp.i18n
const {registerBlockType} = wp.blocks; // Import registerBlockType() from wp.blocks
const {PanelBody} = wp.components;
const {Fragment} = wp.element;
const {InspectorControls} = wp.editor;
const {select, dispatch} = wp.data;
const BlockIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
    <path d="M209,54.2c0-4.9-1.8-9.8-5.3-13.7c-0.3-0.3-0.5-0.5-0.8-0.8c-0.1-0.1-0.4-0.4-0.6-0.6c-3.7-3.3-8.1-5-12.7-5.3l0,0
        c-0.3,0-0.5,0-0.8,0c-0.2-0.1-0.3,0-0.3,0h-124C53.2,33.8,44,43,44,54.3s9.1,20.4,20.4,20.4h74.7L37.9,176.1c-8,8-8,20.9-0.1,28.8
        c8.1,8.1,20.9,8.1,28.9,0.1l101.4-101.4v74.7c0,11.3,9.1,20.4,20.4,20.4c11.3,0,20.5-9.2,20.5-20.5V54.2z"/>
    <path d="M26.4,487.7C11.8,487.7,0,475.9,0,461.3l0,0c0-14.6,11.8-26.4,26.4-26.4l0,0h95.5v-99.1c0-7,2.8-13.8,7.7-18.7l0,0
        c4.9-4.9,11.7-7.7,18.7-7.7l0,0H266v-99.1c0-7,2.8-13.8,7.7-18.7l0,0c4.9-4.9,11.7-7.7,18.7-7.7l0,0h117.7V84.7
        c0-7,2.8-13.8,7.7-18.7l0,0c4.9-4.9,11.7-7.7,18.7-7.7l0,0h114.1c14.6,0,26.4,11.8,26.4,26.4l0,0c0,14.6-11.8,26.4-26.4,26.4l0,0
        H463v99.1c0,7-2.8,13.8-7.7,18.7l0,0c-4.9,4.9-11.7,7.7-18.7,7.7l0,0H319v99.1c0,7-2.8,13.8-7.7,18.7l0,0
        c-4.9,4.9-11.7,7.7-18.7,7.7l0,0H174.8v99.1c0,7-2.8,13.8-7.7,18.7l0,0c-4.9,4.9-11.7,7.7-18.7,7.7l0,0L26.4,487.7L26.4,487.7z"/>
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
registerBlockType('vk-blocks/step', {
    // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
    title: __('Step', 'vk-blocks'), // Block title.
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
    edit({attributes, setAttributes, className, clientId}) {
        const {
            firstDotNum
        } = attributes;

        const {getBlocksByClientId} = select("core/block-editor");
        const {updateBlockAttributes} = dispatch('core/block-editor');

        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody title={__('First Dot Number', 'vk-blocks')}>
                        <input
                            type="number"
                            id={"dot-number"}
                            onChange={(event) => {

                                let value = parseInt(event.target.value, 10);
                                setAttributes({
                                    firstDotNum: value,
                                });

                                if (getBlocksByClientId(clientId)) {
                                    let currentBlock = getBlocksByClientId(clientId);
                                    let innerBlocks = currentBlock[0].innerBlocks;

                                    for (let i = 0; i < innerBlocks.length; i++) {

                                        if (innerBlocks[i] !== undefined) {
                                            updateBlockAttributes(innerBlocks[i].clientId, {dotNum: value + i});
                                        }
                                    }
                                }
                            }}
                            value={firstDotNum}
                            min="1"
                            step="1"
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
    save({attributes, className}) {
        return <Component attributes={attributes} className={className} for_={"save"}/>;
    }
});
