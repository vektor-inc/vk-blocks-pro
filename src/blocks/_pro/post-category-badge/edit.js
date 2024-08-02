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
	Notice,
} from '@wordpress/components';

export default function CategoryBadgeEdit(props) {
	const { attributes, setAttributes, context } = props;
	const { hasLink, taxonomy, textAlign } = attributes;
	const { postId, postType } = context;

	// termColorを取得（VKTermColor::get_post_single_term_info() の返り値）
	const { termColorInfo, isLoading, hasError } = useSelect(
		(select) => {
			try {
				// ターム情報を取得し、エラーハンドリングを追加
				const termInfo = select('vk-blocks/term-color').getTermColorInfo(
					postId,
					taxonomy
				);
				return {
					termColorInfo: termInfo,
					isLoading: !termInfo,
					hasError: termInfo === undefined,
				};
			} catch {
				// エラーが発生した場合の処理
				return {
					termColorInfo: null,
					isLoading: false,
					hasError: true,
				};
			}
		},
		[taxonomy, postId]
	);

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

	// ブロックのプロパティを設定
	const blockProps = useBlockProps({
		className: classnames('vk_categoryBadge', {
			[`has-text-align-${textAlign}`]: !!textAlign,
		}),
		style: {
			// termColorInfoが取得された場合にスタイルを適用
			backgroundColor: termColorInfo?.color ?? '#999999',
			color: termColorInfo?.text_color ?? '#FFFFFF',
			opacity: termColorInfo?.term_name ? 1 : 0.3,
		},
	});

	const getLabelBySlug = (slug, taxonomies) =>
		taxonomies.find((tax) => tax.slug === slug)?.name || 'Auto';

	const selectedTaxonomyName = getLabelBySlug(taxonomy, taxonomies);

	let termName;
	if (isLoading) {
		// データが読み込まれている間にスピナーを表示
		termName = <Spinner />;
	} else if (hasError) {
		// エラーが発生した場合にエラーメッセージを表示
		termName = (
			<Notice status="error">
				{__('Error: Unable to fetch term data', 'vk-blocks-pro')}
			</Notice>
		);
	} else {
		// データが正常に取得された場合にターム名を表示
		termName = termColorInfo?.term_name || `(${selectedTaxonomyName})`;
	}

	const url = termColorInfo?.term_url || '';

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
			{hasLink && url ? (
				<a
					{...blockProps}
					href={url}
					onClick={(event) => event.preventDefault()}
				>
					{termName}
				</a>
			) : (
				<div {...blockProps}>{termName}</div>
			)}
		</>
	);
}
