/**
 * blog-card block type
 */
import { ReactComponent as Icon } from './icon.svg';

import metadata from './block.json';
import edit from './edit';
import save from './save';
import example from './example';
import variations from './variations';
import transforms from './transforms';
import './hooks';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: <Icon />,
	transforms,
	example,
	edit,
	save,
	variations,
};
