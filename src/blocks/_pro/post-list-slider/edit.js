/* globals vk_block_post_type_params, MutationObserver */
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
import {
	BlockControls,
	BlockAlignmentToolbar,
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';
// Load VK Blocks Utils
import { useTaxonomies } from '@vkblocks/utils/hooks';
import { fixBrokenUnicode } from '@vkblocks/utils/depModules';
import { isParentReusableBlock } from '@vkblocks/utils/is-parent-reusable-block';
// Load VK Blocks Compornents
import { DisplayItemsControl } from '@vkblocks/components/display-items-control';
import { AdvancedCheckboxControl } from '@vkblocks/components/advanced-checkbox-control';
import { AdvancedToggleControl } from '@vkblocks/components/advanced-toggle-control';
import { AdvancedColorPalette } from '@vkblocks/components/advanced-color-palette';
import { MultiItemSetting } from './multi-item-setting.js';

export default function PostListSliderEdit(props) {
	const { attributes, setAttributes, clientId } = props;
	const {
		layout,
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
		autoPlay,
		autoPlayStop,
		autoPlayDelay,
		pagination,
		width,
		loop,
		effect,
		speed,
		navigationPosition,
		blockId,
	} = attributes;

	// 以前の値を切り替え
	useEffect(() => {
		if (targetPeriod === undefined) {
			setAttributes({ targetPeriod: 'all' });
		}
		if (
			blockId === undefined ||
			isParentReusableBlock(clientId) === false
		) {
			setAttributes({ blockId: clientId });
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

	// termFormTokenFields ////////////////////////////////////////////////////////
	// Tag Filter
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
		}, taxonomies);

	// taxonomiesCheckBox ////////////////////////////////////////////////////////
	// key を BaseControlのlabelに代入。valueの配列をmapでAdvancedCheckboxControlに渡す
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
		}, termsByTaxonomyName);

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

	// リンクを無効にする関数
	const disableLinks = () => {
		const links = document.querySelectorAll(
			'.vk_post_imgOuter a, .vk_post .vk_post_title a, .postListText_title a, .card-intext .card-intext-inner, .postListText_singleTermLabel_inner, .vk_post_btnOuter a'
		);
		links.forEach((link) => {
			link.addEventListener('click', (event) => {
				event.preventDefault();
			});
			link.style.cursor = 'default';
			link.style.boxShadow = 'unset';

			// ホバー効果を無効化
			link.style.color = 'inherit';
			link.style.textDecorationColor = 'inherit';
		});
	};

	useEffect(() => {
		// MutationObserverでDOMの変化を監視
		const observer = new MutationObserver(disableLinks);

		// body全体を監視
		const targetNode = document.querySelector('body');
		observer.observe(targetNode, { childList: true, subtree: true });

		// 初回およびattributesの変更時にリンクを無効化
		disableLinks();

		// クリーンアップ関数
		return () => {
			observer.disconnect(); // 監視を停止
		};
	}, [attributes]);

	useEffect(() => {
		if (layout === 'postListText') {
			setAttributes({ slidesPerGroup: 'one-by-one' });
			setAttributes({ slidesPerViewMobile: 1 });
			setAttributes({ slidesPerViewTablet: 1 });
			setAttributes({ slidesPerViewPC: 1 });
			setAttributes({ centeredSlides: false });
		}
	}, [layout]);

	return (
		<>
			<BlockControls>
				<BlockAlignmentToolbar
					value={width}
					onChange={(nextWidth) =>
						setAttributes({ width: nextWidth })
					}
					controls={['wide', 'full']}
				/>
			</BlockControls>
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
				<PanelBody
					title={__('Display type', 'vk-blocks-pro')}
					initialOpen={false}
				>
					<BaseControl
						label={__('Display type', 'vk-blocks-pro')}
						id={'vk_column-displayType'}
					>
						<SelectControl
							value={layout}
							onChange={(value) =>
								setAttributes({ layout: value })
							}
							options={[
								{
									value: 'card',
									label: __('Card', 'vk-blocks-pro'),
								},
								{
									value: 'card-noborder',
									label: __(
										'Card (No border)',
										'vk-blocks-pro'
									),
								},
								{
									value: 'card-intext',
									label: __('Card (Intext)', 'vk-blocks-pro'),
								},
								{
									value: 'card-horizontal',
									label: __(
										'Card (Horizontal)',
										'vk-blocks-pro'
									),
								},
								{
									value: 'media',
									label: __('Media', 'vk-blocks-pro'),
								},
								{
									value: 'postListText',
									label: __('Text 1 Column', 'vk-blocks-pro'),
								},
							]}
						/>
					</BaseControl>
				</PanelBody>
				<DisplayItemsControl {...props} />
				<PanelBody
					title={__('Slider Settings', 'vk-blocks-pro')}
					initialOpen={false}
				>
					<BaseControl
						label={__('Effect ', 'vk-blocks-pro')}
						id={`vk_slider-effect`}
					>
						<SelectControl
							value={effect}
							onChange={(value) =>
								setAttributes({ effect: value })
							}
							options={[
								{
									label: __('Slide', 'vk-blocks-pro'),
									value: 'slide',
								},
								{
									label: __('Fade', 'vk-blocks-pro'),
									value: 'fade',
								},
							]}
						/>
					</BaseControl>
					<BaseControl
						label={__('Loop ', 'vk-blocks-pro')}
						id={`vk_slider-loop`}
					>
						<AdvancedToggleControl
							initialFixedTable={loop}
							schema={'loop'}
							{...props}
						/>
					</BaseControl>
					<BaseControl
						label={__('AutoPlay', 'vk-blocks-pro')}
						id={`vk_slider-autoPlay`}
					>
						<AdvancedToggleControl
							initialFixedTable={autoPlay}
							schema={'autoPlay'}
							{...props}
						/>
					</BaseControl>
					<BaseControl
						label={__('Stop AutoPlay when swipe', 'vk-blocks-pro')}
						id={`vk_slider-autoPlay`}
					>
						<AdvancedToggleControl
							initialFixedTable={autoPlayStop}
							schema={'autoPlayStop'}
							{...props}
						/>
					</BaseControl>
					<BaseControl
						label={__('Display Time', 'vk-blocks-pro')}
						id={`vk_slider-autoPlay`}
					>
						<TextControl
							type={'number'}
							value={autoPlayDelay}
							onChange={(value) => {
								if (
									Number(value) === NaN ||
									Number(value) < 0
								) {
									setAttributes({
										autoPlayDelay: 0,
									});
								} else {
									setAttributes({
										autoPlayDelay: parseInt(
											Number(value),
											10
										),
									});
								}
							}}
							min={0}
						/>
					</BaseControl>
					<BaseControl
						label={__('Change Speed', 'vk-blocks-pro')}
						id={`vk_slider-changeSpeed`}
					>
						<TextControl
							type={'number'}
							value={speed}
							onChange={(value) => {
								if (
									Number(value) === NaN ||
									Number(value) < 0
								) {
									setAttributes({
										speed: 0,
									});
								} else {
									setAttributes({
										speed: parseInt(Number(value), 10),
									});
								}
							}}
							min={0}
						/>
					</BaseControl>
					<BaseControl
						label={__('Pagination Type', 'vk-blocks-pro')}
						id={`vk_slider-displayPagination`}
					>
						<SelectControl
							value={pagination}
							options={[
								{
									label: __('Hide', 'vk-blocks-pro'),
									value: 'hide',
								},
								{
									label: __('Default', 'vk-blocks-pro'),
									value: 'bullets',
								},
								{
									label: __(
										'Number of slides',
										'vk-blocks-pro'
									),
									value: 'fraction',
								},
							]}
							onChange={(value) =>
								setAttributes({ pagination: value })
							}
						/>
					</BaseControl>
					<BaseControl
						label={__('Navigation Position', 'vk-blocks-pro')}
						id={`vk_slider-navigationPosition`}
					>
						<SelectControl
							value={navigationPosition}
							options={[
								{
									label: __('Hide', 'vk-blocks-pro'),
									value: 'hide',
								},
								{
									label: __('Center', 'vk-blocks-pro'),
									value: 'center',
								},
								{
									label: __(
										'Bottom on Mobile device',
										'vk-blocks-pro'
									),
									value: 'mobile-bottom',
								},
							]}
							onChange={(value) =>
								setAttributes({ navigationPosition: value })
							}
						/>
					</BaseControl>
				</PanelBody>
				<PanelBody
					title={__('Background Color Setting', 'vk-blocks-pro')}
					initialOpen={false}
				>
					<BaseControl
						label={__('Background Color', 'vk-blocks-pro')}
						id={`vk_postList-blockId`}
					>
						<AdvancedColorPalette
							schema={'backGroundColor'}
							{...props}
						/>
					</BaseControl>
				</PanelBody>
				{layout !== 'postListText' && <MultiItemSetting {...props} />}
			</InspectorControls>
			<div {...blockProps}>
				<div className="alert alert-info font-size-14px">
					{__(
						'Please check the actual behavior on the live site.',
						'vk-blocks-pro'
					)}
				</div>
				<ServerSideRender
					block="vk-blocks/post-list-slider"
					attributes={attributes}
					onRendered={disableLinks}
				/>
			</div>
		</>
	);
}