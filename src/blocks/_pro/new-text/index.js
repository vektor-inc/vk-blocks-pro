/**
 * Dynamic Text
 *
 */
// import React
//import { ReactComponent as Icon } from './icon.svg';

// import block files
import metadata from './block.json';
import edit from './edit';
const { name } = metadata;
export { metadata, name };

export const settings = {
	edit,
	example: {
		attributes: {
			content: 'New!',
			daysAsNewPost: 5,
		},
	},
};