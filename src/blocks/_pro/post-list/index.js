/**
 * post-list block type
 *
 */
// import React
import { ReactComponent as Icon } from './icon.svg';

// import WordPress Scripts
import { __ } from '@wordpress/i18n';
import {
	RangeControl,
	PanelBody,
	BaseControl,
	SelectControl,
	CheckboxControl,
	TextControl,
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { registerBlockType } from '@wordpress/blocks';


// Load VK Blocks Utils
import {
	usePostTypes,
	useTaxonomies,
	useTermsGroupbyTaxnomy,
} from '@vkblocks/utils/hooks';
import { flat } from '@vkblocks/utils/multi-array-flaten';
import { fixBrokenUnicode } from '@vkblocks/utils/depModules';
import ServerSideRender from '@wordpress/server-side-render';
import { InspectorControls } from '@wordpress/block-editor';


// Load VK Blocks Compornents
import { DisplayItemsControl } from '@vkblocks/components/display-items-control';
import { ColumnLayoutControl } from '@vkblocks/components/column-layout-control';
import { AdvancedCheckboxControl } from '@vkblocks/components/advanced-checkbox-control';

registerBlockType('vk-blocks/post-list', {
	title: __('Post list', 'vk-blocks'),
	icon: <Icon />,
	category: 'vk-blocks-cat',
	attributes: {
		name: {
			type: 'string',
			default: '',
		},
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
		display_excerpt: {
			type: 'boolean',
			default: false,
		},
		display_date: {
			type: 'boolean',
			default: true,
		},
		display_new: {
			type: 'boolean',
			default: true,
		},
		display_taxonomies: {
			type: 'boolean',
			default: false,
		},
		display_btn: {
			type: 'boolean',
			default: false,
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
			default: '[]',
		},
		offset: {
			type: 'number',
			default: 0,
		},
		order: {
			type: 'string',
			default: 'DESC',
		},
		orderby: {
			type: 'string',
			default: 'date',
		},
		selfIgnore: {
			type: 'boolean',
			default: false,
		},
		className: {
			type: 'string',
			default: '',
		},
	},
	example: {
		attributes: {
			layout: 'card',
			col_xs: 1,
			col_sm: 2,
			col_md: 2,
			col_lg: 2,
			col_xl: 2,
			col_xxl: 2,
			display_image: true,
			display_image_overlay_term: true,
			display_excerpt: false,
			display_date: true,
			display_new: true,
			display_taxonomies: false,
			display_btn: true,
			new_date: 7,
			new_text: 'New!!',
			btn_text: 'Read more',
			btn_align: 'text-right',
			numberPosts: 6,
			isCheckedPostType: '["post","page"]',
			order: 'DESC',
			orderby: 'date',
		},
	},
	edit(props) {
		const { attributes, setAttributes, name } = props;

		const {
			numberPosts,
			isCheckedPostType,
			isCheckedTerms,
			offset,
			order,
			orderby,
			selfIgnore,
		} = attributes;
		attributes.name = name;

		const postTypes = usePostTypes();
		const postTypesProps = postTypes.map((postType) => {
			return {
				label: postType.name,
				slug: postType.slug,
			};
		});

		const taxonomies = useTaxonomies();
		const terms = useTermsGroupbyTaxnomy(taxonomies);
		const taxonomiesPropsRaw = Object.keys(terms).map(function (taxonomy) {
			return this[taxonomy].map((term) => {
				return {
					label: term.name,
					slug: term.id,
				};
			});
		}, terms);
		const taxonomiesProps = flat(taxonomiesPropsRaw);

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={__('Display conditions', 'vk-blocks')}
						initialOpen={false}
					>
						<BaseControl
							label={__('Filter by PostTypes', 'vk-blocks')}
							id={`vk_postList-postTypes`}
						>
							<AdvancedCheckboxControl
								schema={'isCheckedPostType'}
								rawData={postTypesProps}
								checkedData={JSON.parse(
									fixBrokenUnicode(isCheckedPostType)
								)}
								{...props}
							/>
						</BaseControl>
						<BaseControl
							label={__('Filter by Taxonomy Terms', 'vk-blocks')}
							id={`vk_postList-terms`}
						>
							<AdvancedCheckboxControl
								schema={'isCheckedTerms'}
								rawData={taxonomiesProps}
								checkedData={JSON.parse(
									fixBrokenUnicode(isCheckedTerms)
								)}
								{...props}
							/>
						</BaseControl>
						<BaseControl
							label={__('Number of Posts', 'vk-blocks')}
							id={`vk_postList-numberPosts`}
						>
							<RangeControl
								value={numberPosts}
								onChange={(value) =>
									setAttributes({ numberPosts: value })
								}
								min="1"
								max="100"
							/>
						</BaseControl>
						<BaseControl
							label={__('Order', 'vk-blocks')}
							id={`vk_postList-order`}
						>
							<SelectControl
								value={order}
								onChange={(v) => setAttributes({ order: v })}
								options={[
									{
										value: 'ASC',
										label: __('ASC', 'vk-blocks'),
									},
									{
										value: 'DESC',
										label: __('DESC', 'vk-blocks'),
									},
								]}
							/>
						</BaseControl>
						<BaseControl
							label={__('Order by', 'vk-blocks')}
							id={`vk_postList-orderBy`}
						>
							<SelectControl
								value={orderby}
								onChange={(v) => setAttributes({ orderby: v })}
								options={[
									{
										value: 'date',
										label: __(
											'Published Date',
											'vk-blocks'
										),
									},
									{
										value: 'modified',
										label: __('Modefied Date', 'vk-blocks'),
									},
									{
										value: 'title',
										label: __('Title', 'vk-blocks'),
									},
									{
										value: 'rand',
										label: __('Random', 'vk-blocks'),
									},
								]}
							/>
						</BaseControl>
						<BaseControl
							label={__('offset', 'vk-blocks')}
							id={`vk_postList-offset`}
						>
							<TextControl
								value={offset}
								onChange={(v) =>
									setAttributes({ offset: parseInt(v, 10) })
								}
								type="number"
								min="0"
							/>
						</BaseControl>
						<BaseControl>
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
					block="vk-blocks/post-list"
					attributes={attributes}
				/>
			</Fragment>
		);
	},

	save() {
		return null;
	},
});
