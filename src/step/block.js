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
const BlockIcon = 'arrow-down';

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
