/**
 * Button block type
 *
 */
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { ReactComponent as Icon } from './icon.svg';
import { title, iconName, url, iconUser } from '../../utils/example-data';
import { deprecated } from './deprecated';

import { VKBButton } from './component';

import { FontAwesome } from '../../utils/font-awesome-new';

import {
	RadioControl,
	PanelBody,
	BaseControl,
	CheckboxControl,
	TextControl,
	ButtonGroup,
	Button,
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import {
	RichText,
	InspectorControls,
	ColorPalette,
} from '@wordpress/block-editor';

registerBlockType('vk-blocks/button', {
	title: __('Button', 'vk-blocks'),
	icon: <Icon />,
	category: 'vk-blocks-cat',
	attributes: {
		content: {
			type: 'string',
			source: 'html',
			selector: 'span',
		},
		subCaption: {
			type: 'string',
			default: '',
		},
		buttonUrl: {
			type: 'string',
			default: '',
		},
		buttonTarget: {
			type: 'Boolean',
			default: false,
		},
		buttonSize: {
			type: 'string',
			default: 'md',
		},
		buttonType: {
			type: 'string',
			default: '0',
		},
		buttonColor: {
			type: 'string',
			default: 'primary',
		},
		buttonColorCustom: {
			type: 'string',
			default: 'undefined',
		},
		buttonAlign: {
			type: 'string',
			default: 'left',
		},
		fontAwesomeIconBefore: {
			type: 'string',
			default: '',
		},
		fontAwesomeIconAfter: {
			type: 'string',
			default: '',
		},
	},
	supports: {
		anchor: true,
	},
	example: {
		attributes: {
			content: iconName,
			subCaption: title,
			buttonUrl: url,
			buttonTarget: false,
			buttonSize: 'md',
			buttonType: '0',
			buttonColor: 'primary',
			buttonColorCustom: 'undefined',
			buttonAlign: 'left',
			fontAwesomeIconBefore: iconUser,
			fontAwesomeIconAfter: iconUser,
		},
	},
	edit,
	save,
	deprecated,
});
