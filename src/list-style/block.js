/**
 * list-style block type
 *
 */
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
} = wp.blockEditor;

const {createHigherOrderComponent} = wp.compose;

const isValidBlockType = (name) => {
    const validBlockTypes = [
        'core/list',
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
addFilter('blocks.registerBlockType', 'vk-blocks/list-style', addAttribute);

export const convertColorClass = (color) => {
    switch (color) {
        case '#f78da7':
            return 'vk-has-pale-pink-color';

        case '#cf2e2e':
            return 'vk-has-vivid-red-color';

        case '#ff6900':
            return 'vk-has-luminous-vivid-orange-color';

        case '#fcb900':
            return 'vk-has-luminous-vivid-amber-color';

        case '#7bdcb5':
            return 'vk-has-light-green-cyan-color';

        case '#00d084':
            return 'vk-has-vivid-green-cyan-color';

        case '#8ed1fc':
            return 'vk-has-pale-cyan-blue-color';

        case '#0693e3':
            return 'vk-has-vivid-cyan-blue-color';

        case '#9b51e0':
            return 'vk-has-vivid-purple-color';

        case '#eee':
            return 'vk-has-very-light-gray-color';

        case '#abb8c3':
            return 'vk-has-cyan-bluish-gray-color';

        case '#313131':
            return 'vk-has-very-dark-gray-color';
    }
};

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
                        <PanelBody title={__('List Icon Color', 'vk-blocks')} initialOpen={false}
                                   className="list-color-controle">
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

addFilter('editor.BlockEdit', 'vk-blocks/list-style', addBlockControl);


wp.blocks.registerBlockStyle('core/list',
    [
        {
            name: 'vk-default',
            label: __('Default', 'vk-blocks'),
            isDefault:true
        },
        {
            name: 'vk-arrow-mark',
            label: __('Arrow', 'vk-blocks'),
        },
        {
            name: 'vk-triangle-mark',
            label: __('Triangle', 'vk-blocks')
        },
        {
            name: 'vk-check-mark',
            label: __('Check', 'vk-blocks')
        },
        {
            name: 'vk-check-square-mark',
            label: __('Check Square', 'vk-blocks')
        },
        {
            name: 'vk-check-circle-mark',
            label: __('Check Circle', 'vk-blocks')
        },
        {
            name: 'vk-handpoint-mark',
            label: __('Handpoint', 'vk-blocks')
        },
        {
            name: 'vk-pencil-mark',
            label: __('Pencil', 'vk-blocks')
        },
        {
            name: 'vk-smile-mark',
            label: __('Smile', 'vk-blocks')
        },
        {
            name: 'vk-frown-mark',
            label: __('Frown', 'vk-blocks')
        },
        {
            name: 'vk-numbered-circle-mark',
            label: __('Numbered Circle', 'vk-blocks')
        },
        {
            name: 'vk-numbered-square-mark',
            label: __('Numbered Square', 'vk-blocks')
        }
    ]);
