/**
 * child-page block type
 *
 */
const {__} = wp.i18n;
const {registerBlockType} = wp.blocks;
const {withSelect} = wp.data;
import {schema} from './schema.js';
import {PostList} from '../../_helper/post-list';
const BlockIcon = 'arrow-down';

registerBlockType('vk-blocks/child-page', {
    // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
    title: __('child-page', 'vk-blocks'), // Block title.
    icon: BlockIcon, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
    category: 'vk-blocks-cat', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
    attributes: schema,

    edit: withSelect((select) => {
        return {
            postTypes: select('core').getPostTypes(),
        };
    })((props) => {

        console.log(props);

        return(
            <PostList
                value={props}
            />
        );
    }),

    save() {
        return null;
    },
});
