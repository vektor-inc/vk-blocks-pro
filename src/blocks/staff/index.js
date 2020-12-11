/**
 * staff block type
 *
 */

// WordPress  dependencies
import { __ } from '@wordpress/i18n';
import {
	iconPicture,
	profileTitle,
	position,
	profileName,
	profileLifeTime,
	content,
} from '@vkblocks/utils/example-data';

// Internal dependencies
import { ReactComponent as Icon } from './icon.svg';
import edit from './edit';
import save from './save';
import metadata from './block.json';

const { name } = metadata;

export { metadata, name };

export const settings = {
	title: __('Staff', 'vk-blocks'),
	icon: <Icon />,
	example: {
		attributes: {
			vkStaffTextName: profileName,
			vkStaffTextCaption: profileLifeTime,
			vkStaffTextRole: position,
			vkStaffTextProfileTitle: profileTitle,
			vkStaffTextProfileText: content,
			vkStaffPhotoImage: iconPicture,
			vkStaffLayout: 'default',
			vkStaffNameColor: 'inherit',
			vkStaffCaptionColor: 'inherit',
			vkStaffPositionColor: 'inherit',
			vkStaffProfileTitleColor: 'inherit',
			vkStaffProfileTextColor: 'inherit',
			vkStaffPhotoBorder: 'default',
		},
	},
	edit,
	save,
};
