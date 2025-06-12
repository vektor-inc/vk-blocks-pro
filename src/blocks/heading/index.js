/**
 * heading block type
 *
 */
import { ReactComponent as Icon } from './icon.svg';
import { iconUser, title, baseColor } from '@vkblocks/utils/example-data';

import deprecated from './deprecated/';
import edit from './edit';
import metadata from './block.json';
import save from './save';
import transforms from './transforms.js';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: <Icon />,
	category: 'vk-blocks-cat',
	example: {
		attributes: {
			anchor: '',
			level: 2,
			align: 'center',
			titleStyle: 'default',
			outerMarginBottom: 0,
			title,
			titleColor: baseColor,
			titleSize: 2,
			titleMarginBottom: 1,
			subText: title,
			subTextFlag: 'on',
			subTextColor: baseColor,
			subTextSize: 1.2,
			fontAwesomeIconBefore: iconUser,
			fontAwesomeIconAfter: '',
			fontAwesomeIconColor: baseColor,
			excludeFromToc: false,
		},
	},
	edit,
	save,
	transforms,
	deprecated,
};
