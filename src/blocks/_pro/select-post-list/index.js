/**
 * post-list block type
 *
 */
// import React
import { ReactComponent as Icon } from './icon.svg';

// import block files
import metadata from './block.json';
import edit from './edit';
import save from './save';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: <Icon />,
	edit,
	save,
};
