/**
 * list-style block type
 *
 */
import React from "react";
const {registerFormatType, toggleFormat, applyFormat, removeFormat, getActiveFormat} = window.wp.richText;
const {RichTextToolbarButton, RichTextShortcut, InspectorControls, PanelColorSettings, getColorObjectByColorValue} = wp.blockEditor;
const {__} = wp.i18n; // Import __() from wp.i18n
const name = 'vk-blocks/list-style';
const {Fragment} = wp.element;
const {addFilter} = wp.hooks;
const BlockIcon = 'arrow';


registerFormatType(name, {
        title: 'list Style',
        tagName: 'style',
        className: null,
        attributes: {
            color: null,
        },
    edit(props) {
        const {value, isActive, onChange} = props;
        const defaultColor = '#fffd6b';

        let activeColor;
        if (isActive) {
            const activeFormat = getActiveFormat(value, name);
            activeColor = activeFormat.attributes.color;
        }

        const setColorIfUndefined = (activeColor) => {
            if (activeColor === undefined) {
                activeColor = defaultColor;
            }
            return activeColor;
        };

        const addColorClass = (color)=>{

            let colorClass;
            switch (color) {
                case '#f78da7':
                    colorClass = 'vk-has-pale-pink-color';
                    break;
                case '#cf2e2e':
                    colorClass = 'vk-has-vivid-red-color';
                    break;
                case '#ff6900':
                    colorClass = 'vk-has-luminous-vivid-orange-color';
                    break;
                case '#fcb900':
                    colorClass = 'vk-has-luminous-vivid-amber-color';
                    break;
                case '#7bdcb5':
                    colorClass = 'vk-has-light-green-cyan-color';
                    break;
                case '#00d084':
                    colorClass = 'vk-has-vivid-green-cyan-color';
                    break;
                case '#8ed1fc':
                    colorClass = 'vk-has-pale-cyan-blue-color';
                    break;
                case '#0693e3':
                    colorClass = 'vk-has-vivid-cyan-blue-color';
                    break;
                case '#9b51e0':
                    colorClass = 'vk-has-vivid-purple-color';
                    break;
                case '#eee':
                    colorClass = 'vk-has-very-light-gray-color';
                    break;
                case '#abb8c3':
                    colorClass = 'vk-has-cyan-bluish-gray-color';
                    break;
                case '#313131':
                    colorClass = 'vk-has-very-dark-gray-color';
                    break;
            }
            addFilter(
                'blocks.getBlockDefaultClassName',
                'my-plugin/set-block-custom-class-name',
                (className, blockName)=>{
                    return blockName === 'core/list' ?
                        colorClass :
                        className;
                }
            );
        };

        return (
            <Fragment>
                <InspectorControls>
                    <PanelColorSettings
                        title={__('List Color', 'vk-blocks')}
                        initialOpen={false}
                        colorSettings={[
                            {
                                color: activeColor,
                                onChange: (color) => {
                                    if (color) {
                                        onChange(applyFormat(value, {
                                            type: name,
                                            attributes: {
                                                color: color,
                                            }
                                        }));
                                        addColorClass(color);
                                        return
                                    }
                                    onChange(removeFormat(value, name))
                                },
                                label: __('List Color', 'vk-blocks')
                            }
                        ]}
                    />
                </InspectorControls>
            </Fragment>
        );
    },
    }
);

addFilter(
    "blocks.registerBlockType",
    "jsforwp-advgb/extending-register-block-type",
    extendWithRegisterBlockType
);

function extendWithRegisterBlockType(settings, name) {
    if ("core/list" === name) {
        settings.supports = lodash.merge( {}, settings.supports, {
            className: true,
        });
    }
    return settings;
}


