/**
 * Category Badge
 *
 */
// import React
import { ReactComponent as Icon } from './icon.svg';

// import block files
import metadata from './block.json';
import edit from './edit';

const { name } = metadata;
export { metadata, name };
//import variations from './variations';

export const settings = {
	icon: <Icon />,
	edit,
};
