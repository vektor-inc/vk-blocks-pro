/**
 * gridcolcard-item-footer block type
 *
 */
import { ReactComponent as Icon } from './icon.svg';
import deprecated from './deprecated/index';
import edit from './edit';
import metadata from './block.json';
import save from './save';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: <Icon />,
	edit,
	save,
	deprecated,
};
