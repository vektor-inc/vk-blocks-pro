/**
 * list-style block type
 *
 */
// const {assign} = lodash;
const {__} = wp.i18n;
// const {Fragment} = wp.element;
// const {addFilter} = wp.hooks;
// const {
//     PanelBody,
// } = wp.components;
// const {
//     RichText
// } = wp.blockEditor;
//
// const {createHigherOrderComponent} = wp.compose;
//
// const isValidBlockType = (name) => {
//     const validBlockTypes = [
//         'core/list',
//     ];
//     return validBlockTypes.includes(name);
// };
//
// export const addAttribute = (settings) => {
//     if (isValidBlockType(settings.name)) {
//
//         settings.attributes = assign(settings.attributes, {
//             color: {
//                 type: 'string',
//             },
//         });
//     }
//     return settings;
// };
// addFilter('blocks.registerBlockType', 'vk-blocks/list-style', addAttribute);
//
// export const convertColorClass = (color) => {
//     switch (color) {
//         case '#f78da7':
//             return 'vk-has-pale-pink-color';
//
//         case '#cf2e2e':
//             return 'vk-has-vivid-red-color';
//
//         case '#ff6900':
//             return 'vk-has-luminous-vivid-orange-color';
//
//         case '#fcb900':
//             return 'vk-has-luminous-vivid-amber-color';
//
//         case '#7bdcb5':
//             return 'vk-has-light-green-cyan-color';
//
//         case '#00d084':
//             return 'vk-has-vivid-green-cyan-color';
//
//         case '#8ed1fc':
//             return 'vk-has-pale-cyan-blue-color';
//
//         case '#0693e3':
//             return 'vk-has-vivid-cyan-blue-color';
//
//         case '#9b51e0':
//             return 'vk-has-vivid-purple-color';
//
//         case '#eee':
//             return 'vk-has-very-light-gray-color';
//
//         case '#abb8c3':
//             return 'vk-has-cyan-bluish-gray-color';
//
//         case '#313131':
//             return 'vk-has-very-dark-gray-color';
//     }
// };
//
// export const addBlockControl = createHigherOrderComponent((BlockListBlock) => {
//
//     let activeColor = '';
//
//     return (props) => {
//         if (isValidBlockType(props.name) && props.isSelected) {
//
//             if (props.attributes.color) {
//                 activeColor = props.attributes.color;
//             } else {
//                 activeColor = '#fffd6b';
//             }
//             return (
//                 <Fragment>
//                     <RichText
//                         tagName="figcaption"
//                         className={ 'vk_balloon_icon_name' }
//                         onChange={ ( value ) => setAttributes( { balloonName: value } ) }
//                         value={ balloonName }
//                         placeholder={__('Icon Name', 'vk-blocks') }
//                     />
//                     <BlockListBlock {...props} className={"block-" + props.clientId}/>;
//                 </Fragment>
//             );
//         }
//         return (
//             <Fragment>
//                 <RichText
//                     tagName="figcaption"
//                     className={ 'vk_balloon_icon_name' }
//                     onChange={ ( value ) => setAttributes( { balloonName: value } ) }
//                     value={ balloonName }
//                     placeholder={__('Icon Name', 'vk-blocks') }
//                 />
//                 <BlockListBlock {...props} className={"block-" + props.clientId}/>;
//             </Fragment>
//         );
//     };
// }, 'addMyCustomBlockControls');
//
// addFilter('editor.BlockListBlock', 'vk-blocks/list-style', addBlockControl);
// addFilter('editor.BlockEdit', 'vk-blocks/list-style', addBlockControl);


wp.blocks.registerBlockStyle('core/group',
    [
        {
            name: 'default',
            label: __('Default', 'vk-blocks'),
            isDefault: true
        },
        {
            name: 'chevron-mark',
            label: __('Chevron', 'vk-blocks'),
        }
    ]);
