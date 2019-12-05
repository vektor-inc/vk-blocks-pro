/**
 * post-list block type
 *
 */
const {__} = wp.i18n;
const {registerBlockType} = wp.blocks;
const {withSelect} = wp.data;
const BlockIcon = (
	<svg xmlns="http://www.w3.org/2000/svg" width="576" height="512" viewBox="0 0 576 512">
	<g>
		<g>
			<path d="M269.4,390.8h196.4c7.1,0,12.8-5.9,12.8-12.8v-45.6c0-7.1-5.9-12.8-12.8-12.8H269.4c-7.1,0-12.8,5.9-12.8,12.8V378
				C256.6,384.9,262.5,390.8,269.4,390.8z"/>
			<path d="M269.4,291.6h196.4c7.1,0,12.8-5.9,12.8-12.8v-45.6c0-7.1-5.9-12.8-12.8-12.8H269.4c-7.1,0-12.8,5.9-12.8,12.8v45.6
				C256.6,285.9,262.5,291.6,269.4,291.6z"/>
			<path d="M269.4,192.5h196.4c7.1,0,12.8-5.9,12.8-12.8V134c0-7.1-5.9-12.8-12.8-12.8H269.4c-7.1,0-12.8,5.9-12.8,12.8v45.6
				C256.6,186.8,262.5,192.5,269.4,192.5z"/>
			<path d="M110.2,390.8H211c7.1,0,12.8-5.9,12.8-12.8v-45.6c0-7.1-5.9-12.8-12.8-12.8H110.2c-7.1,0-12.8,5.9-12.8,12.8V378
				C97.4,384.9,103.3,390.8,110.2,390.8z"/>
			<path d="M110.2,291.6H211c7.1,0,12.8-5.9,12.8-12.8v-45.6c0-7.1-5.9-12.8-12.8-12.8H110.2c-7.1,0-12.8,5.9-12.8,12.8v45.6
				C97.4,285.9,103.3,291.6,110.2,291.6z"/>
			<path d="M110.2,192.5H211c7.1,0,12.8-5.9,12.8-12.8V134c0-7.1-5.9-12.8-12.8-12.8H110.2c-7.1,0-12.8,5.9-12.8,12.8v45.6
				C97.4,186.8,103.3,192.5,110.2,192.5z"/>
		</g>
	</g>
	<path d="M528,32H48C21.5,32,0,53.5,0,80v352c0,26.5,21.5,48,48,48h480c26.5,0,48-21.5,48-48V80C576,53.5,554.5,32,528,32z M528,432
		H48V80h480V432z"/>
	</svg>
);
import {schema} from './schema.js';
import {PostList} from '../../_helper/post-list';

registerBlockType('vk-blocks/post-list', {

    title: __('Post list', 'vk-blocks'),
    icon: BlockIcon,
    category: 'vk-blocks-cat',
    attributes: schema,

    edit: withSelect((select) => {
        return {
            postTypes: select('core').getPostTypes(),
        };
	})((props) => {

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
