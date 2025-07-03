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
} from '@wordpress/components';
import { useEffect } from '@wordpress/element';

export default function CategoryBadgeEdit(props) {
	const { attributes, setAttributes, context } = props;
	const { 
		categoryId, 
		categoryName, 
		taxonomy, 
		hasLink, 
		textAlign,
		maxDisplayCount = 1
	} = attributes;
	const { postId, postType } = context;

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
			if (!postId) return [];
			return select('core').getEntityRecords('taxonomy', 'category', { per_page: 100, post: postId }) || [];
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
			backgroundColor: !isLoading && (termColorInfo?.color ?? '#999999'),
			color: termColorInfo?.text_color ?? '#FFFFFF',
			opacity: !isLoading && !termColorInfo?.term_name ? 0.3 : 1,
		},
	});

	const getLabelBySlug = (slug, taxonomies) =>
		taxonomies.find((tax) => tax.slug === slug)?.name || 'Auto';

	const selectedTaxonomyName = getLabelBySlug(taxonomy, taxonomies);

	// categoryId, categoryName があればそれを表示
	let displayName = categoryName;
	let displayUrl = '';
	let displayColor = '#999999';
	let displayTextColor = '#FFFFFF';

	if (categoryId && categoryName) {
		// 必要ならURLや色も親から渡す or ここで取得
		// 例: displayUrl = `/category/${categoryId}`;
	} else {
		// 従来通り termColorInfo から取得
		displayName = termColorInfo?.term_name || `(${selectedTaxonomyName})`;
		displayUrl = termColorInfo?.term_url || '';
		displayColor = termColorInfo?.color ?? '#999999';
		displayTextColor = termColorInfo?.text_color ?? '#FFFFFF';
	}

	// categoryId未設定時に自動セット
	useEffect(() => {
		if (!categoryId && categories.length > 0) {
			setAttributes({
				categoryId: categories[0].id,
				categoryName: categories[0].name,
			});
		}
	}, [categoryId, categories]);

	// 複数表示の場合（maxDisplayCount >= 0）
	if (maxDisplayCount >= 0) {
		const displayCategories = maxDisplayCount === 0 ? categories : categories.slice(0, maxDisplayCount);
		
		// 単一表示の場合（maxDisplayCount = 1）
		if (maxDisplayCount === 1) {
			const category = displayCategories[0];
			
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
								help={__('Set to 0 for all categories, 1 for single display, 2 or more for multiple display', 'vk-blocks-pro')}
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
					{category ? (
						<span
							{...blockProps}
							style={{
								...blockProps.style
							}}
						>
							{category.name}
						</span>
					) : (
						<span style={{ opacity: 0.5 }}>{__('No categories found', 'vk-blocks-pro')}</span>
					)}
				</>
			);
		}
		
		// 複数表示の場合（maxDisplayCount = 0 または 2以上）
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
							help={__('Set to 0 for all categories, 1 for single display, 2 or more for multiple display', 'vk-blocks-pro')}
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
				<div style={{ display: 'flex', gap: '0.5em', flexWrap: 'wrap' }}>
					{displayCategories.length > 0 ? (
						displayCategories.map((category, index) => (
							<span
								key={category.id}
								{...blockProps}
								style={{
									...blockProps.style
								}}
							>
								{category.name}
							</span>
						))
					) : (
						<span style={{ opacity: 0.5 }}>{__('No categories found', 'vk-blocks-pro')}</span>
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
						help={__('Set to 0 for all categories, 1 for single display, 2 or more for multiple display', 'vk-blocks-pro')}
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
