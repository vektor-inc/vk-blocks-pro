/**
 * Pr-Content block type
 *
 */
import { __ } from '@wordpress/i18n';
import { ReactComponent as Icon } from './icon.svg';
import deprecated from './deprecated';
import edit from './edit';
import metadata from './block.json';
import save from './save';
import {
	iconName,
	iconUser,
	iconPicture,
	title,
	content,
	baseColor,
	url,
} from '@vkblocks/utils/example-data';

const { name } = metadata;

export { metadata, name };

export const settings = {
	title: __('PR Content', 'vk-blocks'),
	icon: <Icon />,
	example: {
		attributes: {
			title,
			titleColor: baseColor,
			content,
			contentColor: baseColor,
			url,
			buttonType: '0',
			buttonColor: 'primary',
			buttonColorCustom: '',
			buttonText: iconName,
			buttonTarget: false,
			Image: iconPicture,
			ImageBorderColor: baseColor,
			layout: 'left',
			fontAwesomeIconBefore: iconUser,
			fontAwesomeIconAfter: iconUser,
		},
	},
	edit,
	save,
	deprecated,
};
