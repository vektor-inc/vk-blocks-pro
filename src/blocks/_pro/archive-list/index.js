/**
 * archive-list block type
 *
 */
// import React
import { ReactComponent as Icon } from './icon.svg';

// import block files
import metadata from './block.json';
import edit from './edit';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: <Icon />,
	example: {
		attributes: {
			label: '',
			postType: 'post',
			displayType: 'monthly',
			displayDesign: 'list',
			showCount: false,
		},
	},
	edit,
};
