/**
 * Baloon block type
 *
 */

import {
	iconPicture,
	content,
	iconName,
	baseColor,
} from '../../utils/example-data';
import deprecated from './deprecated/';
import { ReactComponent as Icon } from './icon.svg';
import { __ } from '@wordpress/i18n';
import edit from './edit';
import metadata from './block.json';
import save from './save';

const { name } = metadata;

export { metadata, name };

export const settings = {
	title: __('Ballon', 'vk-blocks'),
	icon: <Icon />,
	example: {
		attributes: {
			balloonName: iconName,
			balloonType: 'type-speech',
			balloonBgColor: baseColor,
			balloonAlign: 'position-left',
			IconImage: iconPicture,
			balloonImageType: 'normal',
		},
		innerBlocks: [
			{
				name: 'core/paragraph',
				attributes: {
					content,
				},
			},
		],
	},
	edit,
	save,
	deprecated,
};
