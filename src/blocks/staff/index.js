/**
 * staff block type
 */

/**
 * scss compile
 */
 import './style.scss';

/**
 * Internal dependencies
 */
import {
	iconPicture,
	profileTitle,
	position,
	profileName,
	profileLifeTime,
	content,
} from '@vkblocks/utils/example-data';
import { ReactComponent as Icon } from './icon.svg';

import edit from './edit';
import save from './save';
import deprecated from './deprecated/index';
import metadata from './block.json';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: <Icon />,
	example: {
		attributes: {
			vk_staff_text_name: profileName,
			vk_staff_text_caption: profileLifeTime,
			vk_staff_text_role: position,
			vk_staff_text_profileTitle: profileTitle,
			vk_staff_text_profileText: content,
			vk_staff_photo_image: iconPicture,
			vk_staff_layout: 'default',
			vk_staff_nameColor: 'inherit',
			vk_staff_captionColor: 'inherit',
			vk_staff_positionColor: 'inherit',
			vk_staff_profileTitleColor: 'inherit',
			vk_staff_profileTextColor: 'inherit',
			vk_staff_photoBorder: 'default',
		},
	},
	edit,
	save,
	deprecated,
};
