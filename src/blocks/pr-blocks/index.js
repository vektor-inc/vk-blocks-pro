/**
 * PR Block block type
 *
 */
import React from 'react';
import { __ } from '@wordpress/i18n'; // Import __() from wp.i18n
import { ReactComponent as Icon } from './icon.svg';
import {
	iconName,
	iconUser,
	title,
	baseColor,
	url,
} from '@vkblocks/utils/example-data';
import metadata from './block.json';
import edit from './edit';
import save from './save';
import { deprecated } from './deprecated/';

function setExample(number) {
	const attributes = {};

	for (let i = 1; i <= number; i++) {
		attributes['heading' + i] = iconName;
		attributes['content' + i] = title;
		attributes['url' + i] = url;
		attributes['urlOpenType' + i] = false;
		attributes['icon' + i] = iconUser;
		attributes['color' + i] = baseColor;
		attributes['bgType' + i] = '0';
		attributes['insertImage' + i] = '';
	}
	return { attributes };
}

const { name } = metadata;

export { metadata, name };

export const settings = {
	title: __('PR Blocks', 'vk-blocks'),
	icon: <Icon />,
	example: setExample(4),
	edit,
	save,
	deprecated,
};
