/**
 * spacer block type
 *
 */
import React from "react";
import {schema} from './schema';
import {SpacerComponent} from "./component";
import {deprecated} from "./deprecated/deprecated";

const {__} = wp.i18n; // Import __() from wp.i18n
const {registerBlockType} = wp.blocks; // Import registerBlockType() from wp.blocks
const {RangeControl, PanelBody, BaseControl,SelectControl} = wp.components;
const {Fragment} = wp.element;
const {InspectorControls} = wp.blockEditor && wp.blockEditor.BlockEdit ? wp.blockEditor : wp.editor;
const BlockIcon = (
	<svg xmlns="http://www.w3.org/2000/svg" width="576" height="512" viewBox="0 0 576 512">
	<g>
		<rect x="108.8" y="18.7" width="358.5" height="40"/>
		<rect x="108.8" y="453.3" width="358.5" height="40"/>
		<polygon points="171.4,253.2 131.4,253.2 131.4,412.6 290.8,412.6 290.8,372.6 199.7,372.6 404.6,167.7 404.6,258.8 444.6,258.8
			444.6,99.4 285.2,99.4 285.2,139.4 376.3,139.4 171.4,344.3 	"/>
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
registerBlockType('vk-blocks/spacer', {
    // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
    title: __('Responsive Spacer', 'vk-blocks'), // Block title.
    icon: BlockIcon, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
    category: 'vk-blocks-cat-layout', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
    attributes: schema,
    supports:{
        className: false,
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
    edit(props) {
        const {attributes, setAttributes, className} = props;
        const {
            anchor,
            unit,
            pc,
            tablet,
            mobile,
        } = attributes;

        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody>
                        <SelectControl
                            label={__('Unit Type', 'vk-blocks')}
                            value={unit}
                            onChange={(value) => setAttributes({unit: value})}
                            options={[
                                {
                                    value: 'px',
                                    label: __('px', 'vk-blocks'),
                                },
                                {
                                    value: 'em',
                                    label: __('em', 'vk-blocks'),
                                },
                                {
                                    value: 'rem',
                                    label: __('rem', 'vk-blocks'),
                                },
                                {
                                    value: 'vw',
                                    label: __('vw', 'vk-blocks'),
                                }
                            ]}
                        />
                        <BaseControl label={__('Height for each device.', 'vk-blocks')}>
                            <RangeControl
                                label={__('PC', 'vk-blocks')}
                                value={pc}
                                onChange={(value) => setAttributes({pc: value})}
                                step={0.1}
                            />
                            <RangeControl
                                label={__('Tablet', 'vk-blocks')}
                                value={tablet}
                                onChange={(value) => setAttributes({tablet: value})}
                                step={0.1}
                            />
                            <RangeControl
                                label={__('Mobile', 'vk-blocks')}
                                value={mobile}
                                onChange={(value) => setAttributes({mobile: value})}
                                step={0.1}
                            />
                        </BaseControl>
                    </PanelBody>
                </InspectorControls>
                <SpacerComponent
                    attributes={attributes}
                    className={className}
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
    save({attributes}) {
        return (
            <SpacerComponent attributes={attributes}/>
        );
    },

    //Please comment out, when you need to use deprecated.
    deprecated: deprecated
});
