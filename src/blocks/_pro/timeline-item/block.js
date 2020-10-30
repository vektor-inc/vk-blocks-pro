/**
 * timeline-item block type
 *
 */
import {Component} from "./component";
import {schema} from './schema';
import React from "react";
import BlockIcon from "./icon.svg";

const {__} = wp.i18n;
const {registerBlockType} = wp.blocks;
const {PanelBody,BaseControl,SelectControl,TextControl} = wp.components;
const {Fragment} = wp.element;
const {InspectorControls,ColorPalette } = wp.blockEditor && wp.blockEditor.BlockEdit ? wp.blockEditor : wp.editor;


registerBlockType('vk-blocks/timeline-item', {
    title: __('Timeline Item', 'vk-blocks'),
    icon: <BlockIcon />,
    category: 'vk-blocks-cat',
    attributes: schema,
    parent: [ 'vk-blocks/timeline' ],

    edit({attributes, setAttributes, className}) {
        const {
            label,
            color,
            style,
            styleLine
		} = attributes;

        return (
	<Fragment>
		<InspectorControls>
			<PanelBody title={ __('label', 'vk-blocks') }>
				<TextControl
					value={ label }
					onChange={ (value) => setAttributes({label: value}) }
					placeholder={ __('Ex,6:00AM', 'vk-blocks') }
                            />
			</PanelBody>
			<PanelBody title={ __('Color', 'vk-blocks') }>
				<ColorPalette
					value={ color }
					onChange={ (value) => {
									setAttributes({color: value ? value : '#337ab7'})
								} }
                            />
			</PanelBody>
			<PanelBody title={ __('Style', 'vk-blocks') }>
				<BaseControl
					id="style-dot"
					label="Dot Style"
                        >
					<SelectControl
						value={ style }
						onChange={ (value) => setAttributes({style: value}) }
						options={ [
                                    {
                                        value: 'outlined',
                                        label: __('Outlined', 'vk-blocks'),
                                    },
                                    {
                                        value: 'solid',
                                        label: __('Solid', 'vk-blocks'),
                                    },
                                ] }
                            />
				</BaseControl>
				<BaseControl
					id="style-line"
					label="Line Style"
                        >
					<SelectControl
						value={ styleLine }
						onChange={ (value) => setAttributes({styleLine: value}) }
						options={ [
                                    {
                                        value: 'default',
                                        label: __('Default', 'vk-blocks'),
                                    },
                                    {
                                        value: 'none',
                                        label: __('None', 'vk-blocks'),
                                    },
                                ] }
                            />
				</BaseControl>
			</PanelBody>
		</InspectorControls>
		<Component
			attributes={ attributes }
			className={ className }
			setAttributes={ setAttributes }
			for_={ "edit" }
                />
	</Fragment>
        );
    },

    save({attributes, className}) {
        return <Component attributes={ attributes } className={ className } for_={ "save" } />;
    },
});
