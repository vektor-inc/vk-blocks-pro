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
	const { value: termColorInfo, isLoading } = useSelect(
		(select) => {
			return select('vk-blocks/term-color').getTermColorInfo(
				postId,
				taxonomy
			);
		},
		[taxonomy]
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

	const getLabelBySlug = (slug, taxonomies) => {
		const taxonomy = taxonomies.find((tax) => tax.slug === slug);
		return taxonomy ? taxonomy.name : null;
	};

	const selectedTaxonomyName = getLabelBySlug(taxonomy, taxonomies);

	const url = termColorInfo?.term_url ?? '';
	const termName = isLoading ? (
		<Spinner />
	) : (
		termColorInfo?.term_name ?? `(${selectedTaxonomyName})`
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
					href={termColorInfo.term_url}
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
