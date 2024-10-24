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
	// Spinner, // 使用されていないため削除
} from '@wordpress/components';

export default function CategoryBadgeEdit(props) {
	const { attributes, setAttributes, context } = props;
	const { hasLink, taxonomy, textAlign } = attributes;
	const { postId, postType } = context;

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

	// タクソノミーが未設定の場合、自動でデフォルトを設定
	const autoTaxonomy = taxonomy || (taxonomies.length > 0 ? 'category' : '');

	// termColorを取得（VKTermColor::get_post_single_term_info() の返り値）
	const { value: termColorInfo, isResolving: isLoading } = useSelect(
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
	);

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
						per_page: -1,
						post: postId,
					}
				);
			},
			[autoTaxonomy, postId]
		) || [];

	// const selectedTaxonomyName = autoTaxonomy
	// 	? taxonomies.find((tax) => tax.slug === autoTaxonomy)?.name
	// 	: __('Auto', 'vk-blocks-pro'); // 使用されていないため削除

	const selectedTerm = terms && terms.length > 0 ? terms[0] : null;

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

	// ターム名が未確定の場合は何も表示しない
	const termName = isLoading || !selectedTerm ? null : selectedTerm.name;

	// url が未定義の場合は空文字を代入
	const termUrl = termColorInfo?.term_url || '';

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
							value={autoTaxonomy}
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
