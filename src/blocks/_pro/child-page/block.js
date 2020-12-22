/**
 * child-page block type
 *
 */

import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	BaseControl,
	SelectControl,
	CheckboxControl,
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
// import { withSelect, select } from '@wordpress/data';
import { withSelect } from '@wordpress/data';
import ServerSideRender from '@wordpress/server-side-render';
import { DisplayItemsControl } from '../../../components/display-items-control';
import { ColumnLayoutControl } from '../../../components/column-layout-control';
import { ReactComponent as Icon } from './icon.svg';

registerBlockType('vk-blocks/child-page', {
	title: __('Child page list', 'vk-blocks'),
	icon: <Icon />,
	category: 'vk-blocks-cat',
	attributes: {
		selectId: {
			type: 'number',
			default: -1,
		},
		name: {
			type: 'string',
			default: '',
		},
		layout: {
			type: 'string',
			default: 'card-horizontal',
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
			default: 2,
		},
		col_lg: {
			type: 'number',
			default: 2,
		},
		col_xl: {
			type: 'number',
			default: 2,
		},
		col_xxl: {
			type: 'number',
			default: 2,
		},
		display_image: {
			type: 'boolean',
			default: true,
		},
		display_image_overlay_term: {
			type: 'boolean',
			default: true,
		},
		display_excerpt: {
			type: 'boolean',
			default: true,
		},
		display_date: {
			type: 'boolean',
			default: false,
		},
		display_new: {
			type: 'boolean',
			default: false,
		},
		display_taxonomies: {
			type: 'boolean',
			default: false,
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
		btn_align: {
			type: 'string',
			default: 'text-right',
		},
		numberPosts: {
			type: 'number',
			default: 6,
		},
		isCheckedPostType: {
			type: 'string',
			default: '["post"]',
		},
		coreTerms: {
			type: 'string',
			default: '[]',
		},
		isCheckedTerms: {
			type: 'string',
			default: '{}',
		},
		className: {
			type: 'string',
			default: '',
		},
		selfIgnore: {
			type: 'boolean',
			default: false,
		},
	},

	edit: withSelect((select) => {
		return {
			pages: select('core').getEntityRecords('postType', 'page', {
				_embed: true,
				per_page: -1,
			}),
		};
	})((props) => {
		const { setAttributes, attributes, pages, name } = props;
		const { selectId, selfIgnore } = attributes;
		attributes.name = name;

		// Choice of This Page.
		const options = [{ label: __('Current page', 'vk-blocks'), value: -1 }];

		// Make choice list of pages
		if (pages !== undefined && pages !== null) {
			const l = pages.length;
			const parents = [];
			let i = 0;
			for (i = 0; i < l; i++) {
				if (pages[i].parent !== 0) {
					parents.push(pages[i].parent);
				}
			}
			for (i = 0; i < l; i++) {
				if (parents.includes(pages[i].id)) {
					options.push({
						label: pages[i].title.rendered,
						value: pages[i].id,
					});
				}
			}
		}

		// Remove choice of the page
		/*
		const currentPostId = select("core/editor").getCurrentPostId();
		if(currentPostId){
			options = options.filter(option => option.value !== currentPostId)
		}
		*/

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={__('Display conditions', 'vk-blocks')}
						initialOpen={false}
					>
						<BaseControl
							label={__('Parent', 'vk-blocks')}
							id={`vk_childPage-parent`}
						>
							<SelectControl
								value={selectId}
								onChange={(value) =>
									setAttributes({
										selectId: parseInt(value, 10),
									})
								}
								options={options}
							/>
						</BaseControl>
						<BaseControl
							id={`vk_childPage-ignoreThisPost`}
						>
							<CheckboxControl
								label={__('Ignore this post', 'vk-blocks')}
								checked={selfIgnore}
								onChange={(v) =>
									setAttributes({ selfIgnore: v })
								}
							/>
						</BaseControl>
					</PanelBody>
					<ColumnLayoutControl {...props} />
					<DisplayItemsControl {...props} />
				</InspectorControls>
				<ServerSideRender
					block="vk-blocks/child-page"
					attributes={attributes}
				/>
			</Fragment>
		);
	}),
});
