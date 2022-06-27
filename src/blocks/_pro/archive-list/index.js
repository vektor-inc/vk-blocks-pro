/**
 * Archive List Block
 *
 */
import { ReactComponent as Icon } from './icon.svg';
import edit from './edit';
import metadata from './block.json';
import save from './save';
//import { deprecated } from './deprecated/';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: <Icon />,
	example: {
		attributes: {
			title: '',
			postType: 'post',
			archiveType: 'm',
			titdisplayDesignle: 'list',
		},
	},
	edit,
	save,
	//	deprecated,
};
