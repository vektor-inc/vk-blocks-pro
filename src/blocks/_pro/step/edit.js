
/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { PanelBody }from '@wordpress/components';
import { Fragment, useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { Component } from "./component";
import { vkbBlockEditor, dispatchEditor } from "../../../utils/depModules";
const { InspectorControls } = vkbBlockEditor;
const { updateBlockAttributes } = dispatchEditor;
import { asyncGetInnerBlocks } from "../../../utils/asyncHooks";

export default function StepEdit({ attributes, setAttributes, className, clientId }) {
    const { firstDotNum } = attributes;

    const currentInnerBlocks = asyncGetInnerBlocks( clientId );

    const resetDotNum = useEffect( () => {
        currentInnerBlocks.forEach( function ( block, index ) {
            updateBlockAttributes( block.clientId, { dotNum: firstDotNum + index });
        })
    }, [ attributes.firstDotNum, currentInnerBlocks.length ] );

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={ __("First Dot Number", "vk-blocks") }>
                    <input
                        type="number"
                        id={ "dot-number" }
                        onChange={ event => {
                            const value = parseInt( event.target.value, 10 );
                            setAttributes({ firstDotNum: value });
                        } }
                        value={ firstDotNum }
                        min="1"
                        step="1"
                    />
                </PanelBody>
            </InspectorControls>
            <Component
                attributes={ attributes }
                className={ className }
                setAttributes={ setAttributes }
                resetDotNum={resetDotNum}
                for_={ "edit" }
            />
        </Fragment>
    );
}
