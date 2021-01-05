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
import ServerSideRender from '@wordpress/server-side-render';
import { InspectorControls } from '@wordpress/block-editor';

// Load VK Blocks Utils
import {
	usePostTypes,
	useTaxonomies,
	useTermsGroupbyTaxnomy,
} from '@vkblocks/utils/hooks';
import { flat } from '@vkblocks/utils/multi-array-flaten';
import { fixBrokenUnicode } from '@vkblocks/utils/depModules';

// Load VK Blocks Compornents
import { DisplayItemsControl } from '@vkblocks/components/display-items-control';
import { ColumnLayoutControl } from '@vkblocks/components/column-layout-control';
import { AdvancedCheckboxControl } from '@vkblocks/components/advanced-checkbox-control';

export default function PostListEdit(props) {
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
									label: __('Published Date', 'vk-blocks'),
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
							onChange={(v) => setAttributes({ selfIgnore: v })}
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
}
