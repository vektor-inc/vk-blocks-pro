/**
 * pr-card-item block type
 *
 */
import { PRcarditem } from './component';
import { deprecated } from './deprecated';
import { FontAwesome } from '@vkblocks/utils/font-awesome-new';
import { ReactComponent as Icon } from './icon.svg';

import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import {
	PanelBody,
	BaseControl,
	TextControl,
	CheckboxControl,
	RadioControl,
} from '@wordpress/components';
import { InspectorControls, ColorPalette } from '@wordpress/block-editor';

registerBlockType('vk-blocks/icon-card-item', {
	title: __('Icon Card Item', 'vk-blocks'),
	icon: <Icon />,
	category: 'vk-blocks-cat',
	attributes: {
		col_xs: {
			type: 'number',
			default: 1,
		},
		col_sm: {
			type: 'number',
			default: 2,
		},
		col_md: {
			type: 'number',
			default: 3,
		},
		col_lg: {
			type: 'number',
			default: 3,
		},
		col_xl: {
			type: 'number',
			default: 3,
		},
		col_xxl: {
			type: 'number',
			default: 3,
		},
		url: {
			type: 'string',
			default: '',
		},
		activeControl: {
			type: 'string',
			default: '{"title":"center","text":"center"}',
		},
		urlOpenType: {
			type: 'Boolean',
			default: false,
		},
		color: {
			type: 'string',
			default: '#0693e3',
		},
		bgType: {
			type: 'string',
			default: '1',
		},
		heading: {
			type: 'string',
			source: 'html',
			selector: '.vk_icon-card_item_title',
		},
		content: {
			type: 'string',
			source: 'html',
			selector: '.vk_icon_card_item_summary',
		},
		faIcon: {
			type: 'string',
			default: '<i class="fas fa-user"></i>',
		},
		//This attribute is deprecated.
		icon: {
			type: 'string',
			default: 'fas fa-file',
		},
	},
	parent: ['vk-blocks/icon-card'],
	supports: {
		className: true,
	},

	edit(props) {
		const { setAttributes, attributes } = props;
		const { url, urlOpenType, color, bgType } = attributes;

		return (
			<>
				<InspectorControls>
					<PanelBody title={__('PR Block Setting', 'vk-blocks')}>
						<BaseControl
							label={__('Link URL:', 'vk-blocks')}
							id={`vk_iconCardItem-url`}
						>
							<TextControl
								value={url}
								onChange={(value) =>
									setAttributes({ url: value })
								}
							/>
							<CheckboxControl
								label={__('Open link new tab.', 'vk-blocks')}
								checked={urlOpenType}
								onChange={(checked) =>
									setAttributes({ urlOpenType: checked })
								}
							/>
						</BaseControl>
						<BaseControl
							label={__('Icon ( Font Awesome )', 'vk-blocks')}
							id={`vk_iconCardItem-icon`}
						>
							<FontAwesome attributeName={'faIcon'} {...props} />
						</BaseControl>
						<BaseControl>
							<ColorPalette
								value={color}
								onChange={(value) => {
									if (value) {
										setAttributes({ color: value });
									} else {
										setAttributes({ color: '#0693e3' });
										setAttributes({ bgType: '0' });
									}
								}}
							/>
							<RadioControl
								label={__('Icon Background:', 'vk-blocks')}
								selected={bgType}
								options={[
									{
										label: __('Solid color', 'vk-blocks'),
										value: '0',
									},
									{
										label: __('No background', 'vk-blocks'),
										value: '1',
									},
								]}
								onChange={(value) =>
									setAttributes({ bgType: value })
								}
							/>
						</BaseControl>
					</PanelBody>
				</InspectorControls>
				<PRcarditem {...props} for_={'edit'} />
			</>
		);
	},

	save(props) {
		return <PRcarditem {...props} for_={'save'} />;
	},

	deprecated,
});
