import { __ } from '@wordpress/i18n';
import classnames from 'classnames';
import {
	useBlockProps,
	InspectorControls,
	AlignmentToolbar,
	BlockControls,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import {
	PanelBody,
	ToggleControl,
	SelectControl,
	RangeControl,
	__experimentalUnitControl as UnitControl,
	Spinner,
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

// 表示モードの定数
const DISPLAY_MODES = {
	ALL: 0,
	SINGLE: 1,
	MULTIPLE_MIN: 2,
};

export default function CategoryBadgeEdit(props) {
	const { attributes, setAttributes, context } = props;
	const {
		taxonomy,
		hasLink,
		textAlign,
		maxDisplayCount,
		gap = '0.5em',
	} = attributes;
	const { postId, postType } = context;

	// デフォルト色の定数
	const DEFAULT_BACKGROUND_COLOR = '#999999';
	const DEFAULT_TEXT_COLOR = '#FFFFFF';

	// タクソノミーフィルタリング共通関数
	const getAvailableTaxonomies = (allTaxonomies) => {
		return allTaxonomies
			? allTaxonomies.filter(
					(_taxonomy) =>
						_taxonomy.slug !== 'post_tag' &&
						_taxonomy.hierarchical &&
						_taxonomy.types.includes(postType)
				)
			: [];
	};

	// 実際に投稿に設定されているタクソノミーを取得する共通関数
	const getPostTaxonomyWithTerms = (select, availableTaxonomies) => {
		for (const tax of availableTaxonomies) {
			const terms = select('core').getEntityRecords(
				'taxonomy',
				tax.slug,
				{
					per_page: 100,
					post: postId,
				}
			);
			if (terms && terms.length > 0) {
				return tax.slug;
			}
		}
		return 'category'; // デフォルト
	};

	// termColorを取得（VKTermColor::get_post_single_term_info() の返り値）
	const { value: termColorInfo, isLoading } = useSelect(
		(select) => {
			// 特定のタクソノミーが選択されている場合
			if (taxonomy) {
				return select('vk-blocks/term-color').getTermColorInfo(
					postId,
					taxonomy
				);
			}

			// 自動選択の場合：投稿に実際に設定されているタクソノミーから最初に見つかったものを取得
			const allTaxonomies = select('core').getTaxonomies();
			if (!allTaxonomies) {
				return select('vk-blocks/term-color').getTermColorInfo(
					postId,
					'category'
				);
			}

			const availableTaxonomies = getAvailableTaxonomies(allTaxonomies);
			const targetTaxonomy = getPostTaxonomyWithTerms(
				select,
				availableTaxonomies
			);

			return select('vk-blocks/term-color').getTermColorInfo(
				postId,
				targetTaxonomy
			);
		},
		[postId, taxonomy, postType]
	);

	// 投稿のターム一覧を取得（複数タクソノミー対応）
	const terms = useSelect(
		(select) => {
			if (!postId) {
				return [];
			}

			// 特定のタクソノミーが選択されている場合
			if (taxonomy) {
				return (
					select('core').getEntityRecords('taxonomy', taxonomy, {
						per_page: 100,
						post: postId,
					}) || []
				);
			}

			// 自動選択の場合：投稿に設定されているすべてのタクソノミーからタームを取得
			const allTaxonomies = select('core').getTaxonomies();
			if (!allTaxonomies) {
				return [];
			}

			const availableTaxonomies = getAvailableTaxonomies(allTaxonomies);

			// 各タクソノミーからタームを取得
			let allTerms = [];
			availableTaxonomies.forEach((tax) => {
				const taxonomyTerms =
					select('core').getEntityRecords('taxonomy', tax.slug, {
						per_page: 100,
						post: postId,
					}) || [];
				// タームにタクソノミー情報を追加
				taxonomyTerms.forEach((term) => {
					term.taxonomy_slug = tax.slug;
					term.taxonomy_name = tax.name;
				});
				allTerms = [...allTerms, ...taxonomyTerms];
			});

			return allTerms;
		},
		[postId, taxonomy, postType]
	);

	const taxonomies =
		useSelect(
			(select) => {
				const allTaxonomies = select('core').getTaxonomies();
				return getAvailableTaxonomies(allTaxonomies);
			},
			[postType]
		) || [];

	// 表示モード判定
	const isMultipleDisplay =
		maxDisplayCount === DISPLAY_MODES.ALL ||
		maxDisplayCount >= DISPLAY_MODES.MULTIPLE_MIN;

	// 複数表示時の各タームの色情報を取得
	const [termColors, setTermColors] = useState({});

	useEffect(() => {
		async function fetchColors() {
			const colors = {};
			for (const term of terms) {
				const res = await apiFetch({ path: `/vk-term-color/v1/term-color?term_id=${term.id}` });
				colors[term.id] = res;
			}
			setTermColors(colors);
		}
		if (terms.length) fetchColors();
	}, [terms]);

	// 共通の値を計算
	const hasAnyTerm = terms.length > 0;
	const getLabelBySlug = (slug, taxonomies) =>
		taxonomies.find((tax) => tax.slug === slug)?.name || 'Auto';
	const selectedTaxonomyName = getLabelBySlug(taxonomy, taxonomies);
	const displayName = termColorInfo?.term_name || `(${selectedTaxonomyName})`;
	const displayUrl = termColorInfo?.term_url || '';
	const displayColor = termColorInfo?.color ?? DEFAULT_BACKGROUND_COLOR;
	const displayTextColor = termColorInfo?.text_color ?? DEFAULT_TEXT_COLOR;

	// 共通のブロックプロパティ
	const blockProps = useBlockProps({
		className: classnames('vk_categoryBadge', {
			[`has-text-align-${textAlign}`]: !!textAlign,
		}),
		style: {
			backgroundColor: !isLoading
				? displayColor
				: DEFAULT_BACKGROUND_COLOR,
			color: displayTextColor,
			opacity: hasAnyTerm ? 1 : 0.3,
		},
	});

	// SelectControlのoptions共通化
	const taxonomyOptions = [
		{
			label: __('Auto', 'vk-blocks-pro'),
			value: '',
		},
		...taxonomies.map((tax) => ({
			label: tax.name,
			value: tax.slug,
		})),
	];

	// 共通のコントロール部分
	const renderControls = () => (
		<>
			<BlockControls>
				<AlignmentToolbar
					value={textAlign}
					onChange={(nextAlign) => {
						setAttributes({ textAlign: nextAlign });
					}}
				/>
			</BlockControls>
			<InspectorControls>
				<PanelBody title={__('Setting', 'vk-blocks-pro')}>
					<RangeControl
						label={__('Max Display Count', 'vk-blocks-pro')}
						value={maxDisplayCount}
						onChange={(count) => {
							setAttributes({ maxDisplayCount: count });
						}}
						min={0}
						max={10}
						help={__(
							'Set to 0 for all terms, 1 for single display, 2 or more for multiple display',
							'vk-blocks-pro'
						)}
					/>
					{isMultipleDisplay && (
						<UnitControl
							label={__('Gap between badges', 'vk-blocks-pro')}
							value={gap || '0.5em'}
							onChange={(value) =>
								setAttributes({ gap: value || '0.5em' })
							}
							units={[
								{ value: 'px', label: 'px' },
								{ value: 'em', label: 'em' },
								{ value: 'rem', label: 'rem' },
							]}
						/>
					)}
					<ToggleControl
						label={__('Enable Term Link', 'vk-blocks-pro')}
						checked={hasLink}
						onChange={(checked) =>
							setAttributes({ hasLink: checked })
						}
					/>
					<SelectControl
						label={__('Select Taxonomy', 'vk-blocks-pro')}
						value={taxonomy}
						options={taxonomyOptions}
						onChange={(selectedSlug) => {
							setAttributes({ taxonomy: selectedSlug });
						}}
					/>
				</PanelBody>
			</InspectorControls>
		</>
	);

	// 複数表示の場合
	if (isMultipleDisplay) {
		const displayTerms =
			maxDisplayCount === DISPLAY_MODES.ALL
				? terms
				: terms.slice(0, maxDisplayCount);

		const noTermsDisplay = isLoading ? (
			<Spinner />
		) : (
			<span style={{ opacity: 0.5 }}>{`(${selectedTaxonomyName})`}</span>
		);

		const isMultiple = displayTerms.length > 1;
		const containerClassName = isMultiple
			? 'vk_categoryBadge_multiple'
			: '';
		const containerStyle = isMultiple ? { gap } : {};

		return (
			<>
				{renderControls()}
				<div className={containerClassName} style={containerStyle}>
					{displayTerms.length > 0 ? (
						displayTerms.map((term) => {
							const colorInfo = termColors[term.id] || {};
							return (
								<span
									key={term.id}
									{...blockProps}
									style={{
										...blockProps.style,
										backgroundColor: colorInfo.color || '#999999',
										color: colorInfo.text_color || '#FFFFFF',
									}}
									title={
										term.taxonomy_name
											? `${term.taxonomy_name}: ${term.name}`
											: term.name
									}
								>
									{term.name}
								</span>
							);
						})
					) : (
						<span {...blockProps}>{noTermsDisplay}</span>
					)}
				</div>
			</>
		);
	}

	// 単一表示の場合
	return (
		<>
			{renderControls()}
			{hasLink && displayUrl ? (
				<a
					{...blockProps}
					href={displayUrl}
					onClick={(event) => event.preventDefault()}
				>
					{displayName}
				</a>
			) : (
				<div {...blockProps}>{displayName}</div>
			)}
		</>
	);
}
