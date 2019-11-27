/**
 * group-style block type
 *
 */
import {wpEditor} from '../_helper/deprecated-fix.js';
const {assign} = lodash;
const {__} = wp.i18n;
const {Fragment} = wp.element;
const {addFilter} = wp.hooks;
const {
    PanelBody,
} = wp.components;
const {
    InspectorControls,
    ColorPalette
} = wpEditor;

const {createHigherOrderComponent} = wp.compose;
import {convertColorClass} from "../_helper/color-code-to-class.js";

const isValidBlockType = (name) => {
    const validBlockTypes = [
        'core/group',
    ];
    return validBlockTypes.includes(name);
};

export const addAttribute = (settings) => {
    if (isValidBlockType(settings.name)) {

        settings.attributes = assign(settings.attributes, {
            color: {
                type: 'string',
            },
        });
    }
    return settings;
};
addFilter('blocks.registerBlockType', 'vk-blocks/group-style', addAttribute);

export const addBlockControl = createHigherOrderComponent((BlockEdit) => {

    let activeColor = '';

    return (props) => {
        if (isValidBlockType(props.name) && props.isSelected) {

            if (props.attributes.color) {
                activeColor = props.attributes.color;
            }else {
                activeColor = '#fffd6b';
            }

            return (
                <Fragment>
                    <BlockEdit {...props} />
                    <InspectorControls>
                        <PanelBody title={__('Border Color', 'vk-blocks')} initialOpen={false}
                                   className="group-border-color-controle">
                            <ColorPalette
                                value={activeColor}
                                disableCustomColors={true}
                                onChange={(newColor) => {
                                    let newClassName = convertColorClass(newColor);

                                    if (props.attributes.className) {

                                        let inputClassName = props.attributes.className;

                                        inputClassName = inputClassName.split(' ');

                                        let filterClassName = inputClassName.filter(function (name) {
                                            return -1 === name.indexOf("vk-has-");
                                        });

                                        filterClassName.push(newClassName);

                                        newClassName = filterClassName.join(' ');
                                    }

                                    activeColor = newColor;
                                    props.setAttributes({
                                        className: newClassName,
                                        color: newColor
                                    });
                                }}
                            />
                        </PanelBody>
                    </InspectorControls>
                </Fragment>
            );
        }
        return <BlockEdit {...props} />;
    };
}, 'addMyCustomBlockControls');

addFilter('editor.BlockEdit', 'vk-blocks/group-style', addBlockControl);

wp.blocks.registerBlockStyle('core/group',
    [
        {
            name: 'vk-group-solid',
            label: __('Solid', 'vk-blocks')
        },
        {
            name: 'vk-group-dotted',
            label: __('Dotted', 'vk-blocks')
        },
        {
            name: 'vk-group-dashed',
            label: __('Dashed', 'vk-blocks')
        },
        {
            name: 'vk-group-double',
            label: __('Double', 'vk-blocks')
        },
        {
            name: 'vk-group-stitch',
            label: __('Stitch', 'vk-blocks')
        },
        {
            name: 'vk-group-top-bottom-border',
            label: __('top-bottom-border', 'vk-blocks')
        },
        {
            name: 'vk-group-shadow',
            label: __('Shadow', 'vk-blocks')
        }
    ]);
