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
    RadioControl
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
}
addFilter('blocks.registerBlockType', 'vk-blocks/list-style', addAttribute);

export const convertColorClass = (color) => {
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

    return colorClass;
};

export const addBlockControl = createHigherOrderComponent((BlockEdit) => {

    let activeColor = '';

    return (props) => {
        // isValidBlockType で指定したブロックが選択されたら表示
        if (isValidBlockType(props.name) && props.isSelected) {
            // すでにオプション選択されていたら
            if (props.attributes.color) {
                activeColor = props.attributes.color;
            }else {
                activeColor = '#fffd6b';
            }
            return (
                <Fragment>
                    <BlockEdit {...props} />
                    <InspectorControls>
                        <PanelBody title={__('List Color', 'vk-blocks')} initialOpen={false}
                                   className="list-color-controle">
                            <ColorPalette
                                value={activeColor}
                                onChange={(newColor) => {
                                    let newClassName = convertColorClass(newColor);

                                    // 高度な設定で入力している場合は追加する
                                    if (props.attributes.className) {
                                        // 付与されているclassを取り出す
                                        let inputClassName = props.attributes.className;
                                        // スペース区切りを配列に
                                        inputClassName = inputClassName.split(' ');
                                        // 選択されていたオプションの値を削除
                                        let filterClassName = inputClassName.filter(function (name) {
                                            return name !== activeColor;
                                        });
                                        // 新しく選択したオプションを追加
                                        filterClassName.push(newColor);
                                        // 配列を文字列に
                                        newClassName = filterClassName.join(' ');
                                    }
                                    // 新しく選択したオプションをactiveColorに
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
