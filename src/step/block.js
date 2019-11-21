/**
 * step block type
 *
 */
import {Component} from "./component";
import {schema} from './schema';

const {__} = wp.i18n; // Import __() from wp.i18n
const {registerBlockType, createBlock} = wp.blocks; // Import registerBlockType() from wp.blocks
const {PanelBody} = wp.components;
const {Fragment} = wp.element;
const {InspectorControls} = wp.editor;
const {select, dispatch} = wp.data;
const BlockIcon = (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
<g>
    <path d="M81.9,270.4V512H143V270.5c-9.8,2.2-19.9,3.4-30.3,3.4C102.3,273.8,92,272.7,81.9,270.4z"/>
</g>
<g>
    <path d="M211.1,83.7C200,62,182.4,45,161.5,34.8c-14.9-7.2-31.7-11.3-49.1-11.3c-17.6,0-34.4,4.1-49.1,11.3
        c-36.7,18.2-62,55.9-62,99.7c0,41.8,23.1,79.7,60.6,98.9c0.4,0.2,1,0.4,1.4,0.6c15.4,7.6,32.3,11.5,49.3,11.5
        c10.9,0,21.5-1.6,31.5-4.7c6.1-1.8,11.9-4.1,17.4-6.8c27.8-13.5,48.7-38.1,57.5-68.4c2.9-10,4.5-20.3,4.5-31.1
        C223.5,116.7,219.4,99.7,211.1,83.7z M127,191.1c0,9.4-7.6,10.8-10.3,10.8c-6.2,0-10.7-4.2-10.7-11.1v-85.1L92.8,117
        c-1.5,1.2-3.6,2-6.3,2c-6.2,0-10-4.2-10-10c0-4,1.2-6.3,3.6-8.5l25.8-22.7c2.9-2.6,6.8-3.1,9.3-3.1c9,0,11.9,5.9,11.9,10.7V191.1z"
        />
</g>
<path d="M524,275H296.4c-13.3,0-24-10.8-24-24v0c0-13.3,10.8-24,24-24H524c13.3,0,24,10.8,24,24v0C548,264.2,537.3,275,524,275z"/>
<path d="M524,361.3H296.4c-13.3,0-24-10.8-24-24v0c0-13.3,10.8-24,24-24H524c13.3,0,24,10.8,24,24v0
    C548,350.6,537.3,361.3,524,361.3z"/>
<path d="M524,447.7H296.4c-13.3,0-24-10.8-24-24v0c0-13.3,10.8-24,24-24H524c13.3,0,24,10.8,24,24v0C548,437,537.3,447.7,524,447.7z
    "/>
<path d="M285.2,176.5h250c7.1,0,12.8-6.4,12.8-13.8v-42.6c0-7.7-5.9-13.8-12.8-13.8h-250c-7.1,0-12.8,6.4-12.8,13.8v42.5
    C272.4,170.3,278.3,176.5,285.2,176.5z"/>
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
        const {updateBlockAttributes, insertBlock} = dispatch('core/block-editor');

        let currentBlock = getBlocksByClientId(clientId);
        let beforeLength;
        let afterLength;

        const addH4Block = (index, innerBlocks) => {
            if (innerBlocks[index].innerBlocks.length === 0) {
                const blockToInsert = createBlock('core/heading', {
                    level: 4,
                });
                insertBlock(blockToInsert, 0, innerBlocks[index].clientId);
            }
        };


        if (currentBlock !== undefined || currentBlock[0].innerBlocks !== undefined) {

            let innerBlocks = currentBlock[0].innerBlocks;
            beforeLength = innerBlocks.length;

            //先頭のinnerBlockのみの時
            if (innerBlocks.length === 1) {
                addH4Block(0, innerBlocks);
            }

            if (beforeLength !== undefined && beforeLength !== 0 && beforeLength !== 1) {

                if (beforeLength !== afterLength) {

                    for (let i = 0; i < innerBlocks.length; i++) {
                        if (innerBlocks[i] !== undefined) {

                            addH4Block(i, innerBlocks);

                            updateBlockAttributes(innerBlocks[i].clientId, {
                                dotNum: firstDotNum + i
                            });
                        }
                    }
                }
                afterLength = beforeLength;
            }
        }


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
