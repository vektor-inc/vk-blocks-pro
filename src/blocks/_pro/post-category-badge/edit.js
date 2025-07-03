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
	Spinner,
	RangeControl,
	__experimentalUnitControl as UnitControl,
} from '@wordpress/components';

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

	// termColorを取得（VKTermColor::get_post_single_term_info() の返り値）
	const { value: termColorInfo, isLoading } = useSelect(
		(select) => {
			return select('vk-blocks/term-color').getTermColorInfo(
				postId,
				taxonomy
			);
		},
		[taxonomy]
	);

	// 投稿のカテゴリー一覧を取得
	const categories = useSelect(
		(select) => {
			if (!postId) {
				return [];
			}
			return (
				select('core').getEntityRecords('taxonomy', 'category', {
					per_page: 100,
					post: postId,
				}) || []
			);
		},
		[postId]
	);

	// タクソノミー一覧を取得
	const taxonomies =
		useSelect(
			(select) => {
				const allTaxonomies = select('core').getTaxonomies();

				// post_tagとタグタイプのタクソノミーを除外して返す
				return allTaxonomies
					? allTaxonomies.filter(
							(_taxonomy) =>
								_taxonomy.slug !== 'post_tag' &&
								_taxonomy.hierarchical
						)
					: [];
			},
			[postType]
		) || [];

	// 対象のタームが見つからなかったらタクソノミ名を表示
	const blockProps = useBlockProps({
		className: classnames('vk_categoryBadge', {
			[`has-text-align-${textAlign}`]: !!textAlign,
		}),
		style: {
			backgroundColor:
				!isLoading &&
				(termColorInfo?.color ?? DEFAULT_BACKGROUND_COLOR),
			color: termColorInfo?.text_color ?? DEFAULT_TEXT_COLOR,
			opacity: !isLoading && !termColorInfo?.term_name ? 0.3 : 1,
		},
	});

	const getLabelBySlug = (slug, taxonomies) =>
		taxonomies.find((tax) => tax.slug === slug)?.name || 'Auto';

	const selectedTaxonomyName = getLabelBySlug(taxonomy, taxonomies);

	const displayName = termColorInfo?.term_name || `(${selectedTaxonomyName})`;
	const displayUrl = termColorInfo?.term_url || '';
	const displayColor = termColorInfo?.color ?? DEFAULT_BACKGROUND_COLOR;
	const displayTextColor = termColorInfo?.text_color ?? DEFAULT_TEXT_COLOR;

	// 複数表示の場合（maxDisplayCount >= 0）
	if (maxDisplayCount >= 0) {
		const displayCategories =
			maxDisplayCount === 0
				? categories
				: categories.slice(0, maxDisplayCount);

		// カテゴリーが見つからない場合の表示用スタイル
		const noCategoriesBlockProps = useBlockProps({
			className: classnames('vk_categoryBadge', {
				[`has-text-align-${textAlign}`]: !!textAlign,
			}),
			style: {
				backgroundColor: displayColor,
				color: displayTextColor,
				opacity: !isLoading && !termColorInfo?.term_name ? 0.3 : 1,
			},
		});

		// カテゴリーが見つからない場合の表示
		const noCategoriesDisplay = isLoading ? (
			<Spinner />
		) : (
			<span style={{ opacity: 0.5 }}>{`(${selectedTaxonomyName})`}</span>
		);

		return (
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
								'Set to 0 for all categories, 1 for single display, 2 or more for multiple display',
								'vk-blocks-pro'
							)}
						/>
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
						<ToggleControl
							label={__('Enable Term Link', 'vk-blocks-pro')}
							checked={hasLink}
							onChange={(checked) =>
								setAttributes({ hasLink: checked })
							}
						/>
						{taxonomies.length > 1 && (
							<SelectControl
								label={__('Select Taxonomy', 'vk-blocks-pro')}
								value={taxonomy}
								options={[
									{
										label: __('Auto', 'vk-blocks-pro'),
										value: '',
									},
									...taxonomies.map((tax) => ({
										label: tax.name,
										value: tax.slug,
									})),
								]}
								onChange={(selectedSlug) => {
									setAttributes({ taxonomy: selectedSlug });
								}}
							/>
						)}
					</PanelBody>
				</InspectorControls>
				<div
					style={{
						display: 'flex',
						gap,
						flexWrap: 'wrap',
					}}
				>
					{displayCategories.length > 0 ? (
						displayCategories.map((category) => (
							<span
								key={category.id}
								{...blockProps}
								style={{
									...blockProps.style,
								}}
							>
								{category.name}
							</span>
						))
					) : (
						<span {...noCategoriesBlockProps}>
							{noCategoriesDisplay}
						</span>
					)}
				</div>
			</>
		);
	}

	// 単一表示の場合（maxDisplayCount = 0、従来の処理）
	return (
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
							'Set to 0 for all categories, 1 for single display, 2 or more for multiple display',
							'vk-blocks-pro'
						)}
					/>
					<UnitControl
						label={__('バッジ間の間隔', 'vk-blocks-pro')}
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
					<ToggleControl
						label={__('Enable Term Link', 'vk-blocks-pro')}
						checked={hasLink}
						onChange={(checked) =>
							setAttributes({ hasLink: checked })
						}
					/>
					{taxonomies.length > 1 && (
						<SelectControl
							label={__('Select Taxonomy', 'vk-blocks-pro')}
							value={taxonomy}
							options={[
								{
									label: __('Auto', 'vk-blocks-pro'),
									value: '',
								},
								...taxonomies.map((tax) => ({
									label: tax.name,
									value: tax.slug,
								})),
							]}
							onChange={(selectedSlug) => {
								setAttributes({ taxonomy: selectedSlug });
							}}
						/>
					)}
				</PanelBody>
			</InspectorControls>
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
