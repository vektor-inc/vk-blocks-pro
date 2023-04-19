/**
 * Alert block type
 *
 */
import { ReactComponent as Icon } from './icon.svg';
import edit from './edit';
import metadata from './block.json';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: <Icon />,
	edit,
};
