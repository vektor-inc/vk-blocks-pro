/**
 * PR Block block type
 *
 */
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

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: <Icon />,
	example: {
		heading1: iconName,
		heading2: iconName,
		heading3: iconName,
		content1: title,
		content2: title,
		content3: title,
		url1: url,
		url2: url,
		url3: url,
		urlOpenType1: false,
		urlOpenType2: false,
		urlOpenType3: false,
		icon1: iconUser,
		icon2: iconUser,
		icon3: iconUser,
		color1: baseColor,
		color2: baseColor,
		color3: baseColor,
		bgType1: '0',
		bgType2: '0',
		bgType3: '0',
		insertImage1: '',
		insertImage2: '',
		insertImage3: '',
	},
	edit,
	save,
	deprecated,
};
