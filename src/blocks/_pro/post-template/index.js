/**
 * icon block type
 *
 */
import { layout } from '@wordpress/icons';

import edit from './edit';
import metadata from './block.json';
import save from './save';
// import { deprecated } from './deprecated/';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: layout,
	edit,
	save,
	// deprecated,
};
