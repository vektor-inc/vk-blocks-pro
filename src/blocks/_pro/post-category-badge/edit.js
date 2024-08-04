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
} from '@wordpress/components';

export default function CategoryBadgeEdit(props) {
	const { attributes, setAttributes, context } = props;
	const { hasLink, taxonomy, textAlign } = attributes;
	const { postId, postType } = context;

	// termColorを取得（VKTermColor::get_post_single_term_info() の返り値）
	const { value: termColorInfo, isResolving: isLoading } =
		useSelect(
			(select) => {
				if (!autoTaxonomy) {
					return { value: {}, isResolving: false };
				}
				return select('vk-blocks/term-color').getTermColorInfo(
					postId,
					autoTaxonomy
				);
			},
			[autoTaxonomy, postId]
		) || {};

	// タクソノミー名取得
	function getTaxonomyName(slug, taxonomies) {
		return taxonomies.find((tax) => tax.slug === slug)?.name || '';
	}

	// 自動タクソノミー選択
	function getAutoTaxonomy(taxonomies, postType) {
		// 投稿タイプに関連するカスタムタクソノミーを優先して選択
		const customTaxonomy = taxonomies.find((tax) =>
			tax.types.includes(postType)
		);
		if (customTaxonomy) {
			return customTaxonomy.slug;
		}

		// カスタムタクソノミーがない場合はカテゴリーを選択
		const defaultTaxonomy = taxonomies.find(
			(tax) => tax.slug === 'category'
		);
		return defaultTaxonomy ? defaultTaxonomy.slug : '';
	}

	// タクソノミー一覧を取得
	const taxonomies =
		useSelect(
			(select) => {
				const allTaxonomies = select('core').getTaxonomies();
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

	// タクソノミーが「Auto」に設定されている場合の処理
	const autoTaxonomy =
		taxonomy === '' ? getAutoTaxonomy(taxonomies, postType) : taxonomy;

	// 投稿に関連付けられたタームを取得
	const terms =
		useSelect(
			(select) => {
				if (!autoTaxonomy) {
					return [];
				}
				return select('core').getEntityRecords(
					'taxonomy',
					autoTaxonomy,
					{
						per_page: -1, // すべてのタームを取得
						post: postId,
					}
				);
			},
			[autoTaxonomy, postId]
		) || [];

	const selectedTerm = terms.length > 0 ? terms[0] : null;

	// ブロック要素の属性やスタイルを設定
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

	const termUrl = termColorInfo?.term_url || '';

	// 対象のタームが見つからなかったらタクソノミ名を表示
	let termName;

	if (isLoading) {
		termName = <Spinner />;
	} else if (selectedTerm) {
		termName = selectedTerm.name;
	} else {
		termName = getTaxonomyName(autoTaxonomy, taxonomies);
	}

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
							value={taxonomy === '' ? '' : taxonomy}
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
			{termName &&
				(hasLink && termUrl ? (
					<a
						{...blockProps}
						href={termUrl}
						onClick={(event) => event.preventDefault()}
					>
						{termName}
					</a>
				) : (
					<div {...blockProps}>{termName}</div>
				))}
		</>
	);
}
