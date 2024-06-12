/* globals vk_block_post_type_params */
// import WordPress Scripts
import { __, sprintf } from '@wordpress/i18n';
import {
	RangeControl,
	PanelBody,
	BaseControl,
	SelectControl,
	CheckboxControl,
	ButtonGroup,
	Button,
	TextControl,
	FormTokenField,
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import ServerSideRender from '@wordpress/server-side-render';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
// Load VK Blocks Utils
import { useTaxonomies } from '@vkblocks/utils/hooks';
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
		taxQueryRelation,
		isCheckedTerms,
		offset,
		targetPeriod,
		order,
		orderby,
		selfIgnore,
		pagedlock,
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

	const postTypeToTaxonomyMap = {};
	const taxonomies = useTaxonomies();
	const termsByTaxonomyName = vk_block_post_type_params.term_by_taxonomy_name;

	taxonomies.forEach((taxonomy) => {
		taxonomy.types.forEach((postType) => {
			if (!postTypeToTaxonomyMap[postType]) {
				postTypeToTaxonomyMap[postType] = [];
			}
			postTypeToTaxonomyMap[postType].push(taxonomy.slug);
		});
	});

	const saveStateTerms = (termId) => {
		if (!isCheckedTermsData.includes(termId)) {
			isCheckedTermsData.push(termId);
			setIsCheckedTermsData([...isCheckedTermsData]);
		}
	};

	const removeStateTerms = (termId) => {
		const newTermsData = isCheckedTermsData.filter((id) => id !== termId);
		setIsCheckedTermsData(newTermsData);
		setAttributes({
			isCheckedTerms: JSON.stringify(newTermsData),
		});
	};

	const saveStatePostTypes = (slug) => {
		let newPostTypeData = [...isCheckedPostTypeData];
		let newTermsData = [...isCheckedTermsData];
		if (!newPostTypeData.includes(slug)) {
			newPostTypeData.push(slug);
		} else {
			newPostTypeData = newPostTypeData.filter((type) => type !== slug);
			const postTypeTaxonomies = postTypeToTaxonomyMap[slug] || [];
			postTypeTaxonomies.forEach((taxonomy) => {
				const terms = termsByTaxonomyName[taxonomy] || [];
				terms.forEach((term) => {
					newTermsData = newTermsData.filter(
						(id) => id !== term.term_id
					);
				});
			});
		}
		setIsCheckedPostTypeData(newPostTypeData);
		setIsCheckedTermsData(newTermsData);
		setAttributes({
			isCheckedPostType: JSON.stringify(newPostTypeData),
			isCheckedTerms: JSON.stringify(newTermsData),
		});
	};

	let postTypesProps = vk_block_post_type_params.post_type_option;

	// メディアと再利用ブロックを除外
	postTypesProps = postTypesProps.filter(
		(postType) =>
			'attachment' !== postType.slug && 'wp_block' !== postType.slug
	);

	const getTaxonomiesByPostType = (postType) => {
		return taxonomies.filter((taxonomy) => {
			return (
				taxonomy.types.includes(postType) &&
				termsByTaxonomyName[taxonomy.slug]?.length
			);
		});
	};

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

	const selectedPostTypes = isCheckedPostTypeData;
	const filteredTaxonomies = selectedPostTypes.flatMap((postType) =>
		getTaxonomiesByPostType(postType)
	);

	const termFormTokenFields = filteredTaxonomies
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
						__('Filter by %s', 'vk-blocks-pro'),
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
		});

	const taxonomiesCheckBox = filteredTaxonomies
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
						__('Filter by %s', 'vk-blocks-pro'),
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
						removeState={removeStateTerms} // チェック解除時の処理を追加
						{...props}
					/>
				</BaseControl>
			);
		});

	const blockProps = useBlockProps();

	// `offset`が空の場合に0に設定する
	useEffect(() => {
		if (offset === undefined || offset === null || offset === '') {
			setAttributes({ offset: 0 });
		}
	}, [offset]);

	useEffect(() => {
		setAttributes({
			isCheckedPostType: JSON.stringify(isCheckedPostTypeData),
			isCheckedTerms: JSON.stringify(isCheckedTermsData),
		});
	}, [isCheckedPostTypeData, isCheckedTermsData]);

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('Display conditions', 'vk-blocks-pro')}
					initialOpen={false}
				>
					<BaseControl
						label={__('Filter by PostTypes', 'vk-blocks-pro')}
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
					<hr />
					<h4 className={`mt-0 mb-2`}>
						{__('Taxonomy filter condition', 'vk-blocks-pro')}
					</h4>
					<ButtonGroup className={`mb-3`}>
						<Button
							isSmall
							isPrimary={taxQueryRelation === 'OR'}
							isSecondary={taxQueryRelation !== 'OR'}
							onClick={() =>
								setAttributes({ taxQueryRelation: 'OR' })
							}
						>
							{__('OR ( Whichever apply )', 'vk-blocks-pro')}
						</Button>
						<Button
							isSmall
							isPrimary={taxQueryRelation === 'AND'}
							isSecondary={taxQueryRelation !== 'AND'}
							onClick={() =>
								setAttributes({ taxQueryRelation: 'AND' })
							}
						>
							{__('AND ( All apply )', 'vk-blocks-pro')}
						</Button>
					</ButtonGroup>
					{taxonomiesCheckBox}
					{termFormTokenFields}
					<BaseControl
						label={__('Number of Posts', 'vk-blocks-pro')}
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
						label={__('Filter by Date', 'vk-blocks-pro')}
						id={`vk_postList-dateFilter`}
					>
						<SelectControl
							label={__('Period of Time', 'vk-blocks-pro')}
							value={targetPeriod}
							onChange={(value) =>
								setAttributes({ targetPeriod: value })
							}
							options={[
								{
									value: 'all',
									label: __('Whole Period', 'vk-blocks-pro'),
								},
								{
									value: 'from-today',
									label: __('From Today', 'vk-blocks-pro'),
								},
								{
									value: 'from-now',
									label: __('From Now', 'vk-blocks-pro'),
								},
								{
									value: 'from-tomorrow',
									label: __('From Tomorrow', 'vk-blocks-pro'),
								},
							]}
						/>
						<p>
							{__(
								'* If you choose a future period, you will need to customize it so that future posts will be published immediately.',
								'vk-blocks-pro'
							)}
						</p>
					</BaseControl>
					<BaseControl
						label={__('Order', 'vk-blocks-pro')}
						id={`vk_postList-order`}
					>
						<SelectControl
							value={order}
							onChange={(v) => setAttributes({ order: v })}
							options={[
								{
									value: 'ASC',
									label: __('ASC', 'vk-blocks-pro'),
								},
								{
									value: 'DESC',
									label: __('DESC', 'vk-blocks-pro'),
								},
							]}
						/>
					</BaseControl>
					<BaseControl
						label={__('Order by', 'vk-blocks-pro')}
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
										'vk-blocks-pro'
									),
								},
								{
									value: 'modified',
									label: __('Modefied Date', 'vk-blocks-pro'),
								},
								{
									value: 'title',
									label: __('Title', 'vk-blocks-pro'),
								},
								{
									value: 'rand',
									label: __('Random', 'vk-blocks-pro'),
								},
							]}
						/>
					</BaseControl>
					<BaseControl
						label={__('offset', 'vk-blocks-pro')}
						id={`vk_postList-offset`}
					>
						<TextControl
							value={offset}
							onChange={(v) =>
								setAttributes({
									offset: v === '' ? 0 : parseInt(v, 10),
								})
							}
							type="number"
							min="0"
						/>
					</BaseControl>
					<BaseControl>
						<CheckboxControl
							label={__(
								'Display from the first post always',
								'vk-blocks-pro'
							)}
							checked={pagedlock}
							onChange={(v) => setAttributes({ pagedlock: v })}
							help={__(
								'Display from the first post even on pages beyond the second page.',
								'vk-blocks-pro'
							)}
						/>
						<CheckboxControl
							label={__('Ignore this post', 'vk-blocks-pro')}
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
