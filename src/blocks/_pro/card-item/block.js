/**
 * card-item block type
 *
 */
import { Component } from './component';
import { LinkControl } from '../../../components/link-control';
import { deprecated } from './deprecated/index';
import { ReactComponent as Icon } from './icon.svg';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { PanelBody, BaseControl, TextControl } = wp.components;
const { InspectorControls } =
	wp.blockEditor && wp.blockEditor.BlockEdit ? wp.blockEditor : wp.editor;
const { Fragment } = wp.element;

registerBlockType('vk-blocks/card-item', {
	title: __('Card Item', 'vk-blocks'),
	icon: <Icon />,
	category: 'vk-blocks-cat',
	attributes: {
		layout: {
			type: 'string',
			default: 'card',
		},
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
		display_title: {
			type: 'boolean',
			default: true,
		},
		display_excerpt: {
			type: 'boolean',
			default: true,
		},
		display_image: {
			type: 'boolean',
			default: true,
		},
		display_image_overlay_term: {
			type: 'boolean',
			default: true,
		},
		display_date: {
			type: 'boolean',
			default: false,
		},
		display_new: {
			type: 'boolean',
			default: true,
		},
		display_btn: {
			type: 'boolean',
			default: true,
		},
		new_date: {
			type: 'number',
			default: 7,
		},
		new_text: {
			type: 'string',
			default: 'New!!',
		},
		btn_text: {
			type: 'string',
			default: 'Read more',
		},
		title: {
			type: 'string',
			source: 'html',
			selector: 'h5.vk_post_title.card-title',
		},
		excerpt_text: {
			type: 'string',
			source: 'html',
			selector: 'p.vk_post_excerpt.card-text',
		},
		image: {
			type: 'string',
			default: null,
		},
		url: {
			type: 'string',
			default: '',
		},
		activeControl: {
			type: 'string',
			default: '{"title": "left", "text":"left" ,"button":"right"}',
		},
		linkTarget: {
			type: 'string',
			source: 'attribute',
			selector: 'a',
			attribute: 'target',
		},
		rel: {
			type: 'string',
			source: 'attribute',
			selector: 'a',
			attribute: 'rel',
		},
	},
	parent: ['vk-blocks/card'],
	supports: {
		className: true,
	},

	edit(props) {
		const { setAttributes, attributes } = props;
		const { url } = attributes;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={__('URL', 'vk-blocks')}>
						<BaseControl id="sidebar-card-block-url">
							<TextControl
								value={url}
								onChange={(value) =>
									setAttributes({ url: value })
								}
								placeholder={__(
									'https://example.com',
									'vk-blocks'
								)}
							/>
						</BaseControl>
						<LinkControl blockName={'card'} {...props} />
					</PanelBody>
				</InspectorControls>
				<Component {...props} for_={'edit'} />
			</Fragment>
		);
	},

	save(props) {
		return <Component {...props} for_={'save'} />;
	},
	deprecated,
});
