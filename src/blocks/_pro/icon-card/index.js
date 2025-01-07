/**
 * Pr Card block type
 *
 */
import { ReactComponent as Icon } from './icon.svg';
import { title, content, iconUser } from '@vkblocks/utils/example-data';

import edit from './edit';
import metadata from './block.json';
import save from './save';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: <Icon />,
	example: {
		attributes: {
			col_xs: 1,
			col_sm: 1,
			col_md: 1,
			col_lg: 1,
			col_xl: 1,
			col_xxl: 1,
			activeControl: '{"title":"center","text":"center"}',
		},
		innerBlocks: [
			{
				name: 'vk-blocks/icon-card-item',
				attributes: {
					col_xs: 1,
					col_sm: 1,
					col_md: 1,
					col_lg: 1,
					col_xl: 1,
					col_xxl: 1,
					activeControl: '{"title":"center","text":"center"}',
					urlOpenType: false,
					color: '#0693e3',
					bgType: '1',
					heading: title,
					content,
					faIcon: iconUser,
				},
			},
		],
	},
	edit,
	save,
};
