/**
 * card-item block type
 *
 */
import { schema } from './schema';
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import deprecated from './deprecated/';
import { ReactComponent as Icon } from './icon.svg';

registerBlockType('vk-blocks/grid-column-item', {
	title: __('Grid Column Item', 'vk-blocks'),
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
	parent: ['vk-blocks/grid-column'],
	supports: {
		className: true,
	},

	edit(props) {
		const { className } = props;
		return (
			<div className={`${className}`}>
				<InnerBlocks />
			</div>
		);
	},
	save() {
		return (
			<div>
				<InnerBlocks.Content />
			</div>
		);
	},
	deprecated,
});
