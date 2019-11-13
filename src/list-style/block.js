/**
 * list-style block type
 *
 */
import React from "react";
const {registerFormatType,toggleFormat} = wp.richText;
const {RichTextToolbarButton, RichTextShortcut, InspectorControls, PanelColorSettings, getColorObjectByColorValue} = wp.blockEditor;
const {compose,ifCondition} = wp.compose;
const {withSelect} = wp.data;

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
        console.log(props.selectedBlock);
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
