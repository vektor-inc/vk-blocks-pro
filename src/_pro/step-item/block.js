/**
 * step-item block type
 *
 */
import {Component} from "./component";
import {schema} from './schema';
import {FontAwesome} from "../../_helper/font-awesome";

const {__} = wp.i18n; // Import __() from wp.i18n
const {registerBlockType} = wp.blocks; // Import registerBlockType() from wp.blocks
const {PanelBody,BaseControl,SelectControl,TextControl,RangeControl} = wp.components;
const {Fragment} = wp.element;
const {InspectorControls,ColorPalette } = wp.blockEditor && wp.blockEditor.BlockEdit ? wp.blockEditor : wp.editor;
import {deprecated} from './deprecated';

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
registerBlockType('vk-blocks/step-item', {
    // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
    title: __('Step Item', 'vk-blocks'), // Block title.
    icon: BlockIcon, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
    category: 'vk-blocks-cat', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
    attributes: schema,
    parent: [ 'vk-blocks/step' ],

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
            color,
            style,
            styleLine,
            dotCaption
        } = attributes;

        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody title={__('Step Mark', 'vk-blocks')}>
                        <BaseControl
                            id="dot-fa"
                            help={__('If FontAwesome class entered, it will overrides the number.', 'vk-blocks')}
                        >
                            <FontAwesome
                                attributes={attributes}
                                setAttributes={setAttributes}
                            />
                        </BaseControl>
                        <BaseControl
                            id="dot-caption"
                            label="Caption"
                        >
                            <TextControl
                                value={dotCaption}
                                onChange={(value) => setAttributes({dotCaption: value})}
                                placeholder={__('Ex,6:00AM', 'vk-blocks')}
                            />
                        </BaseControl>

                    </PanelBody>
                    <PanelBody title={__('Color', 'vk-blocks')}>
                            <ColorPalette
                                value={color}
                                onChange={(value) => setAttributes({color: value})}
                            />
                    </PanelBody>
                    <PanelBody title={__('Style', 'vk-blocks')}>
                        <BaseControl
                            id="style-dot"
                            label="Dot Style"
                        >
                            <SelectControl
                                value={style}
                                onChange={(value) => setAttributes({style: value})}
                                options={[
                                    {
                                        value: 'solid',
                                        label: __('Solid', 'vk-blocks'),
                                    },
                                    {
                                        value: 'outlined',
                                        label: __('Outlined', 'vk-blocks'),
                                    },
                                ]}
                            />
                        </BaseControl>
                        <BaseControl
                            id="style-line"
                            label="Line Style"
                        >
                            <SelectControl
                                value={styleLine}
                                onChange={(value) => setAttributes({styleLine: value})}
                                options={[
                                    {
                                        value: 'default',
                                        label: __('Default', 'vk-blocks'),
                                    },
                                    {
                                        value: 'none',
                                        label: __('None', 'vk-blocks'),
                                    },
                                ]}
                            />
                        </BaseControl>
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

    deprecated: deprecated,
});
