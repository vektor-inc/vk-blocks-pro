/**
 * list-style block type
 *
 */
import React from "react";
const {registerFormatType,toggleFormat} = wp.richText;
const {RichTextToolbarButton, RichTextShortcut, InspectorControls, PanelColorSettings, getColorObjectByColorValue} = wp.blockEditor;
const {compose,ifCondition} = wp.compose;
const {withSelect} = wp.data;
const {__} = wp.i18n; // Import __() from wp.i18n

const MyCustomButton = props => {
    return <RichTextToolbarButton
        icon='editor-code'
        title='List Color'
        onClick={ () => {
            props.onChange( toggleFormat(
                props.value,
                { type: 'vk-blocks/list-style' }
            ) );
        } }
        isActive={ props.isActive }
    />
};
const ConditionalButton = compose(
    withSelect( function( select ) {
        return {
            selectedBlock: select( 'core/block-editor' ).getSelectedBlock()
        }
    } ),
    ifCondition( function( props ) {
        return (
            props.selectedBlock &&
            props.selectedBlock.name === 'core/list'
        );
    } )
)( MyCustomButton );

registerFormatType(
    'vk-blocks/list-style', {
        title: 'list Style',
        tagName: 'style',
        className: null,
        edit: ConditionalButton,
    }
);

// function addBackgroundColorStyle( props ) {
//
//     console.log(props);
//     return lodash.assign( props, { style: { backgroundColor: 'red' } } );
// }
//
// wp.hooks.addFilter(
//     'blocks.getSaveContent.extraProps',
//     'vk-blocks/test',
//     addBackgroundColorStyle
// );

const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { PanelBody } = wp.components;

// const withInspectorControls =  createHigherOrderComponent( ( BlockEdit ) => {
//
//     console.log(BlockEdit);
//
//     return ( props ) => {
//         console.log(props);
//         return (
//             <Fragment>
//                 <BlockEdit { ...props } />
//                 <InspectorControls>
//                     <PanelBody>
//                         My custom control
//                     </PanelBody>
//                 </InspectorControls>
//             </Fragment>
//         );
//     };
// }, "withInspectorControl" );
//
// wp.hooks.addFilter( 'editor.BlockEdit', 'my-plugin/with-inspector-controls', withInspectorControls );

wp.hooks.addFilter(
    "blocks.registerBlockType",
    "jsforwp-advgb/extending-register-block-type",
    extendWithRegisterBlockType
);

function extendWithRegisterBlockType(settings, name) {

    if ("core/list" === name) {
        console.log(settings);
    }

    // Check for block type
    if ("core/code" === name) {

        // Change the block title
        settings.title = __("Code Snippet", "jsforwpadvblocks");

        // Change the block description
        settings.description = __(
            "Use for maximum codiness 💃",
            "jsforwpadvblocks"
        );

        // Change block icon
        settings.icon = "admin-tools";

        // Change supports
        settings.supports = lodash.merge( {}, settings.supports, {
            html: true,
            anchor: true
        });

    }

    return settings;

}
