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

export default function SingleTermEdit(props) {
	const { attributes, setAttributes, context } = props;
	const { hasLink, taxonomy, textAlign } = attributes;
	const { postId, postType } = context;

	const { value: termColorInfo, isLoading } = useSelect(
		(select) => {
			return select('vk-blocks/term-color').getTermColorInfoByPost(
				postId,
				taxonomy
			);
		},
		[taxonomy]
	);

	const taxonomies =
		useSelect(
			(select) => {
				// postTypeが定義されている場合のみ実行
				if (!postType) {
					return null;
				}
				// 現在の投稿タイプに関連するタクソノミーを取得
				const relatedTaxonomies = select('core').getTaxonomies({
					type: postType,
				});

				// post_tagとタグタイプのタクソノミーを除外して他のタクソノミーのみを返す
				return relatedTaxonomies
					? relatedTaxonomies.filter(
							(_taxonomy) =>
								_taxonomy.slug !== 'post_tag' &&
								_taxonomy.hierarchical
					  )
					: [];
			},
			[postType]
		) || [];

	const blockProps = useBlockProps({
		className: classnames('vk_singleTerm', {
			[`has-text-align-${textAlign}`]: !!textAlign,
		}),
		style: {
			backgroundColor: !isLoading && (termColorInfo?.color ?? '#999999'),
			color: termColorInfo?.text_color ?? '#FFFFFF',
			opacity: !isLoading && !termColorInfo?.term_name ? 0.3 : 1,
		},
	});

	const url = termColorInfo?.term_url ?? '';
	const termName = isLoading ? (
		<Spinner />
	) : (
		termColorInfo?.term_name ?? __('Not Set', 'vk-blocks-pro')
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
						label={__('Add Link to Taxonomy Page', 'vk-blocks-pro')}
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
								{ label: '自動', value: '' },
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
