/*globals vk_block_post_type_params */
// import WordPress Scripts
import { __, sprintf } from '@wordpress/i18n';
import {
	RangeControl,
	PanelBody,
	BaseControl,
	SelectControl,
	CheckboxControl,
	TextControl,
	FormTokenField,
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import ServerSideRender from '@wordpress/server-side-render';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
// Load VK Blocks Utils
import { usePostTypes, useTaxonomies } from '@vkblocks/utils/hooks';
import { fixBrokenUnicode } from '@vkblocks/utils/depModules';

// Load VK Blocks Compornents
import { DisplayItemsControl } from '@vkblocks/components/display-items-control';
import { ColumnLayoutControl } from '@vkblocks/components/column-layout-control';
import { AdvancedCheckboxControl } from '@vkblocks/components/advanced-checkbox-control';

export default function PostListEdit(props) {
	const { attributes, setAttributes, name, clientId } = props;
	const {
		numberPosts,
		isCheckedPostType,
		isCheckedTerms,
		offset,
		targetPeriod,
		order,
		orderby,
		selfIgnore,
	} = attributes;
	attributes.name = name;

	// 以前の値を切り替え
	useEffect(() => {
		if (targetPeriod === undefined) {
			setAttributes({ targetPeriod: 'all' });
		}
	}, [clientId]);

	const [isCheckedTermsData, setIsCheckedTermsData] = useState(
		JSON.parse(fixBrokenUnicode(isCheckedTerms))
	);
	const [isCheckedPostTypeData, setIsCheckedPostTypeData] = useState(
		JSON.parse(fixBrokenUnicode(isCheckedPostType))
	);

	const saveStateTerms = (termId) => {
		isCheckedTermsData.push(termId);
		setIsCheckedTermsData(isCheckedTermsData);
	};

	const saveStatePostTypes = (slug) => {
		isCheckedPostTypeData.push(slug);
		setIsCheckedPostTypeData(isCheckedPostTypeData);
	};

	const postTypes = usePostTypes();
	let postTypesProps = postTypes.map((postType) => {
		return {
			label: postType.name,
			slug: postType.slug,
		};
	});
	// メディアと再利用ブロックを除外
	postTypesProps = postTypesProps.filter(
		(postType) =>
			'attachment' !== postType.slug && 'wp_block' !== postType.slug
	);

	const taxonomies = useTaxonomies();
	const termsByTaxonomyName = vk_block_post_type_params.term_by_taxonomy_name;

	const replaceIsCheckedTermData = (taxonomyRestbase, termIds, newIds) => {
		const removedTermIds = termIds.filter((termId) => {
			let find = false;
			termsByTaxonomyName[taxonomyRestbase].forEach((term) => {
				if (term.term_id === termId) {
					find = true;
				}
			});
			return !find;
		});
		return removedTermIds.concat(newIds);
	};

	const termFormTokenFields = taxonomies
		.filter((taxonomy) => {
			return !taxonomy.hierarchical && termsByTaxonomyName[taxonomy.slug];
		})
		.map((taxonomy) => {
			const termsMapByName = termsByTaxonomyName[taxonomy.slug].reduce(
				(acc, term) => {
					return {
						...acc,
						[term.name]: term,
					};
				},
				{}
			);

			const termsMapById = termsByTaxonomyName[taxonomy.slug].reduce(
				(acc, term) => {
					return {
						...acc,
						[term.term_id]: term,
					};
				},
				{}
			);

			const termNames = termsByTaxonomyName[taxonomy.slug].map(
				(term) => term.name
			);

			return termsByTaxonomyName[taxonomy.slug] &&
				termsByTaxonomyName[taxonomy.slug]?.length > 0 ? (
				<FormTokenField
					key={taxonomy.slug}
					label={sprintf(
						// translators: Filter by %s
						__('Filter by %s', 'vk-blocks'),
						taxonomy.labels.name
					)}
					value={isCheckedTermsData
						.filter((termId) => {
							return termId in termsMapById;
						})
						.map((termId) => {
							return termsMapById[termId].name;
						})}
					suggestions={termNames}
					onChange={(newTerms) => {
						const termIds = newTerms.map((termName) => {
							return termsMapByName[termName].term_id;
						});
						const replacedIsCheckedTermsData =
							replaceIsCheckedTermData(
								taxonomy.slug,
								isCheckedTermsData,
								termIds
							);
						setIsCheckedTermsData(replacedIsCheckedTermsData);
						setAttributes({
							isCheckedTerms: JSON.stringify(
								replacedIsCheckedTermsData
							),
						});
					}}
				></FormTokenField>
			) : null;
		}, taxonomies);

	// key を BaseControlのlabelに代入。valueの配列をmapでAdvancedCheckboxControlに渡す
	const taxonomiesCheckBox = taxonomies
		.filter((taxonomy) => {
			return (
				taxonomy.hierarchical === true &&
				termsByTaxonomyName[taxonomy.slug]?.length
			);
		})
		.map(function (taxonomy, index) {
			const taxonomiesProps = (
				termsByTaxonomyName[taxonomy.slug] || []
			).map((term) => {
				return {
					label: term.name,
					slug: term.term_id,
				};
			});

			return (
				<BaseControl
					label={sprintf(
						// translators: Filter by %s
						__('Filter by %s', 'vk-blocks'),
						taxonomy.labels.name
					)}
					id={`vk_postList-terms`}
					key={index}
				>
					<AdvancedCheckboxControl
						schema={'isCheckedTerms'}
						rawData={taxonomiesProps}
						checkedData={isCheckedTermsData}
						saveState={saveStateTerms}
						{...props}
					/>
				</BaseControl>
			);
		}, termsByTaxonomyName);

	const blockProps = useBlockProps();

	return (
		<>
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
							checkedData={isCheckedPostTypeData}
							saveState={saveStatePostTypes}
							{...props}
						/>
					</BaseControl>
					{taxonomiesCheckBox}
					{termFormTokenFields}
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
						label={__('Filter by Date', 'vk-blocks')}
						id={`vk_postList-dateFilter`}
					>
						<SelectControl
							label={__('Period of Time', 'vk-blocks')}
							value={targetPeriod}
							onChange={(value) =>
								setAttributes({ targetPeriod: value })
							}
							options={[
								{
									value: 'all',
									label: __('Whole Period', 'vk-blocks'),
								},
								{
									value: 'from-today',
									label: __('From Today', 'vk-blocks'),
								},
								{
									value: 'from-now',
									label: __('From Now', 'vk-blocks'),
								},
								{
									value: 'from-tomorrow',
									label: __('From Tomorrow', 'vk-blocks'),
								},
							]}
						/>
						<p>* {__('If you choose a future period, you will need to customize it so that future posts will be published immediately.', 'vk-blocks')}</p>
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
			<div {...blockProps}>
				<ServerSideRender
					block="vk-blocks/post-list"
					attributes={attributes}
				/>
			</div>
		</>
	);
}
